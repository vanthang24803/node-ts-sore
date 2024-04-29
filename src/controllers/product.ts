import { Request, Response } from "express";
import { Product, UpdateProduct } from "../models/product";
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
      const { limit, page } = req.query;
      const result = await this.services.findAllProductAsync(
        limit as string,
        page as string
      );

      return Http.Ok(res, result);
    } catch (error) {
      console.log(error);
      return Http.ServerError(res);
    }
  };

  public searchProduct = async (req: Request, res: Response) => {
    try {
      const { q } = req.query;

      const result = await this.services.search(q as string);
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
