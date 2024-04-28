import { Request, Response } from "express";
import { Product, UpdateProduct } from "../models/product";
import { prisma } from "../lib/prisma";
import ProductService from "../services/product";
import CategoryService from "../services/category";
import { Http } from "../helpers/http";

export class ProductController {
  private services: ProductService;
  private categoryService: CategoryService;

  constructor() {
    this.services = new ProductService();
    this.categoryService = new CategoryService();
  }

  public createProduct = async (req: Request, res: Response) => {
    try {
      const data: Product = req.body;
      const images = req.files as Express.Multer.File[] | undefined;

      const exitingCategory = await this.categoryService.isExist(
        data.categoryId
      );

      if (!exitingCategory) {
        return Http.NotFound(res, "Category not found");
      }

      const result = await this.services.createProductAsync(images, data);

      return Http.Created(res, result);
    } catch (error) {
      console.log(error);
      return Http.ServerError(res);
    }
  };

  public findAllProduct = async (req: Request, res: Response) => {
    try {
      const { name, category } = req.query;

      if (!name && !category) {
        const result = await this.services.findAllProductAsync();

        return Http.Ok(res, result);
      }

      const result = await prisma.product.findMany({
        where: {
          name: {
            contains: name as string,
            mode: "insensitive",
          },
          categories: {
            every: {
              category: {
                name: {
                  equals: category as string,
                  mode: "insensitive",
                },
              },
            },
          },
        },
        include: {
          options: {
            select: {
              id: true,
              name: true,
              sale: true,
              price: true,
              size: true,
              createAt: true,
              updateAt: true,
            },
          },
          tag: true,
        },
      });

      if (result.length === 0) {
        return Http.NotFound(res, "Product not found");
      }

      return Http.Ok(res, result);
    } catch (error) {
      console.log(error);
      return Http.ServerError(res);
    }
  };

  public findDetailProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const result = await this.services.findDetailProductAsync(id);

      if (result) {
        return Http.Ok(res, result);
      }

      return Http.NotFound(res, "Product not found");
    } catch (error) {
      console.log(error);
      return Http.ServerError(res);
    }
  };

  public updateProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const body: UpdateProduct = req.body;

      const exitingProduct = await this.services.isProductExist(id);

      if (!exitingProduct) {
        return Http.NotFound(res, "Product not found!");
      }

      const result = await this.services.updateProductAsync(id, body);

      return Http.Ok(res, result);
    } catch (error) {
      console.log(error);
      return Http.ServerError(res);
    }
  };

  public deleteProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const exitingProduct = await this.services.isProductExist(id);

      if (!exitingProduct) {
        return Http.NotFound(res, "Product not found!");
      }

      await this.services.deleteProductAsync(id);

      return Http.Ok(res, "Product deleted successfully!");
    } catch (error) {
      console.log(error);
      return Http.ServerError(res);
    }
  };
}
