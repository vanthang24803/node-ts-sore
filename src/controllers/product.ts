import { Request, Response } from "express";
import responseStatus from "../helpers/response";
import { Status } from "../enum/status";
import { Product, UpdateProduct } from "../models/product";
import { prisma } from "../lib/prisma";
import ProductService from "../services/product";
import CategoryService from "../services/category";

export class ProductController {
  private services:ProductService;
  private categoryService:CategoryService;

  constructor(){
    this.services = new ProductService();
    this.categoryService = new CategoryService();
  }
  
  public createProduct = async (req: Request, res: Response) => {
    try {
      const data: Product = req.body;
      const images = req.files as Express.Multer.File[] | undefined;
  
      const exitingCategory = await this.categoryService.isExist(data.categoryId);
  
      if (!exitingCategory) {
        return res.status(404).json(responseStatus(Status.NotFound, "Category"));
      }
  
      const result = await this.services.createProductAsync(images, data);
  
      return res.status(200).json(responseStatus(Status.Success, result));
    } catch (error) {
      console.log(error);
      return res.status(500).json(responseStatus(Status.BadRequest));
    }
  };
  
  public findAllProduct = async (req: Request, res: Response) => {
    try {
      const { name, category } = req.query;
  
      if (!name && !category) {
        const result = await this.services.findAllProductAsync();
  
        return res.status(200).json(responseStatus(Status.Success, result));
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
        return res.status(404).json(responseStatus(Status.NotFound, "Product"));
      }
  
      return res.status(200).json(responseStatus(Status.Success, result));
    } catch (error) {
      console.log(error);
      return res.status(500).json(responseStatus(Status.BadRequest));
    }
  };
  
  public findDetailProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      const result = await this.services.findDetailProductAsync(id);
  
      if (result) {
        return res.status(200).json(responseStatus(Status.Success, result));
      }
  
      return res.status(404).json(responseStatus(Status.NotFound, "Product"));
    } catch (error) {
      console.log(error);
      return res.status(500).json(responseStatus(Status.BadRequest));
    }
  };
  
  public updateProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const body: UpdateProduct = req.body;
  
      const exitingProduct = await this.services.isProductExist(id);
  
      if (!exitingProduct) {
        return res.status(404).json(responseStatus(Status.NotFound, "Product"));
      }
  
      const result = await this.services.updateProductAsync(id, body);
  
      return res.status(200).json(responseStatus(Status.Success, result));
    } catch (error) {
      console.log(error);
      return res.status(500).json(responseStatus(Status.BadRequest));
    }
  };
  
  public deleteProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      const exitingProduct = await this.services.isProductExist(id);
  
      if (!exitingProduct) {
        return res.status(404).json(responseStatus(Status.NotFound, "Product"));
      }
  
      await this.services.deleteProductAsync(id);
  
      return res
        .status(200)
        .json(responseStatus(Status.Success, "Product deleted success"));
    } catch (error) {
      console.log(error);
      return res.status(500).json(responseStatus(Status.BadRequest));
    }
  };


}



