import { Request, Response } from "express";
import responseStatus from "../helpers/response";
import { Status } from "../enum/status";

import ProductService from "../services/product";
import TagService from "../services/tag";

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
        return res.status(404).json(responseStatus(Status.NotFound, "Product"));
      }

      const { method } = req.query;

      if (method === "create") {
        const { name } = req.body;

        const result = await this.tagService.create(productId, name);

        return res.status(200).json(responseStatus(Status.Success, result));
      }

      return res
        .status(400)
        .json(responseStatus(Status.BadRequest, "Invalid Params"));
    } catch (error) {
      console.log(error);
      return res.status(500).json(responseStatus(Status.BadRequest));
    }
  };

  public deleteTag = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const existingProduct = await this.productService.isProductExist(
        productId
      );

      if (!existingProduct) {
        return res.status(404).json(responseStatus(Status.NotFound, "Product"));
      }

      const { method, id } = req.query;

      if (method === "delete" && id) {
        const existingTag = await this.tagService.isExist(
          productId,
          id as string
        );

        if (!existingTag) {
          return res.status(404).json(responseStatus(Status.NotFound, "Tag"));
        }

        await this.tagService.delete(productId, id as string);

        return res
          .status(200)
          .json(responseStatus(Status.Success, "Tag deleted successfully"));
      }

      return res
        .status(400)
        .json(responseStatus(Status.BadRequest, "Invalid Params"));
    } catch (error) {
      console.log(error);
      return res.status(500).json(responseStatus(Status.BadRequest));
    }
  };

  public updateTag = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const existingProduct = await this.productService.isProductExist(
        productId
      );

      if (!existingProduct) {
        return res.status(404).json(responseStatus(Status.NotFound, "Product"));
      }

      const { method, id } = req.query;

      if (method === "update" && id) {
        const existingTag = await this.tagService.isExist(
          productId,
          id as string
        );

        if (!existingTag) {
          return res.status(404).json(responseStatus(Status.NotFound, "Tag"));
        }

        const { name } = req.body;

        const result = await this.tagService.update(
          productId,
          id as string,
          name
        );

        return res.status(200).json(responseStatus(Status.Success, result));
      }

      return res
        .status(400)
        .json(responseStatus(Status.BadRequest, "Invalid Params"));
    } catch (error) {
      console.log(error);
      return res.status(500).json(responseStatus(Status.BadRequest));
    }
  };

  public detailTag = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const existingProduct = await this.productService.isProductExist(
        productId
      );

      if (!existingProduct) {
        return res.status(404).json(responseStatus(Status.NotFound, "Product"));
      }

      const { method, id } = req.query;

      if (method === "detail" && id) {
        const result = await this.tagService.findById(id as string);

        if (!result) {
          return res.status(404).json(responseStatus(Status.NotFound, "Tag"));
        }

        return res.status(200).json(responseStatus(Status.Success, result));
      }

      return res
        .status(400)
        .json(responseStatus(Status.BadRequest, "Invalid Params"));
    } catch (error) {
      console.log(error);
      return res.status(500).json(responseStatus(Status.BadRequest));
    }
  };
}
