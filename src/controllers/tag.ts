import { Request, Response } from "express";

import ProductService from "../services/product";
import TagService from "../services/tag";

import { Http } from "../helpers/http";

export class TagController {
  private productService: ProductService;
  private tagService: TagService;

  constructor() {
    this.productService = new ProductService();
    this.tagService = new TagService();
  }

  public createTag = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const existingProduct = await this.productService.isProductExist(
        productId
      );

      if (!existingProduct) {
        return Http.NotFound(res, "Product not found!");
      }

      const { method } = req.query;

      if (method === "create") {
        const { name } = req.body;

        const result = await this.tagService.create(productId, name);

        return Http.Created(res, result);
      }

      return Http.BadRequest(res, "Invalid Params");
    } catch (error) {
      console.log(error);
      return Http.ServerError(res);
    }
  };

  public deleteTag = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const existingProduct = await this.productService.isProductExist(
        productId
      );

      if (!existingProduct) {
        return Http.NotFound(res, "Product not found!");
      }

      const { method, id } = req.query;

      if (method === "delete" && id) {
        const existingTag = await this.tagService.isExist(
          productId,
          id as string
        );

        if (!existingTag) {
          return Http.NotFound(res, "Tag not found!");
        }

        await this.tagService.delete(productId, id as string);

        return Http.Ok(res, "Tag deleted successfully!");
      }

      return Http.BadRequest(res, "Invalid Params");
    } catch (error) {
      console.log(error);
      return Http.ServerError(res);
    }
  };

  public updateTag = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const existingProduct = await this.productService.isProductExist(
        productId
      );

      if (!existingProduct) {
        return Http.NotFound(res, "Product not found!");
      }

      const { method, id } = req.query;

      if (method === "update" && id) {
        const existingTag = await this.tagService.isExist(
          productId,
          id as string
        );

        if (!existingTag) {
          return Http.NotFound(res, "Tag not found!");
        }

        const { name } = req.body;

        const result = await this.tagService.update(
          productId,
          id as string,
          name
        );

        return Http.Ok(res, result);
      }

      return Http.BadRequest(res, "Invalid Params");
    } catch (error) {
      console.log(error);
      return Http.ServerError(res);
    }
  };

  public detailTag = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const existingProduct = await this.productService.isProductExist(
        productId
      );

      if (!existingProduct) {
        return Http.NotFound(res, "Product not found!");
      }

      const { method, id } = req.query;

      if (method === "detail" && id) {
        const result = await this.tagService.findById(id as string);

        if (!result) {
          return Http.NotFound(res, "Tag not found!");
        }

        return Http.Ok(res, result);
      }

      return Http.BadRequest(res, "Invalid Params");
    } catch (error) {
      console.log(error);
      return Http.ServerError(res);
    }
  };
}
