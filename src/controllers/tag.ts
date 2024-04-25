import { Request, Response } from "express";
import responseStatus from "../helpers/response";
import { Status } from "../enum/status";

import ProductService from "../services/product";
import TagService from "../services/tag";

const productService = new ProductService();
const tagService = new TagService();

export const createTag = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const existingProduct = await productService.isProductExist(productId);

    if (!existingProduct) {
      return res.status(404).json(responseStatus(Status.NotFound, "Product"));
    }

    const { method } = req.query;

    if (method === "create") {
      const { name } = req.body;

      const result = await tagService.create(productId, name);

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

export const deleteTag = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const existingProduct = await productService.isProductExist(productId);

    if (!existingProduct) {
      return res.status(404).json(responseStatus(Status.NotFound, "Product"));
    }

    const { method, id } = req.query;

    if (method === "delete" && id) {
      const existingTag = await tagService.isExist(productId, id as string);

      if (!existingTag) {
        return res.status(404).json(responseStatus(Status.NotFound, "Tag"));
      }

      await tagService.delete(productId, id as string);

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

export const updateTag = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const existingProduct = await productService.isProductExist(productId);

    if (!existingProduct) {
      return res.status(404).json(responseStatus(Status.NotFound, "Product"));
    }

    const { method, id } = req.query;

    if (method === "update" && id) {
      const existingTag = await tagService.isExist(productId, id as string);

      if (!existingTag) {
        return res.status(404).json(responseStatus(Status.NotFound, "Tag"));
      }

      const { name } = req.body;

      const result = await tagService.update(productId, id as string, name);

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

export const detailTag = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const existingProduct = await productService.isProductExist(productId);

    if (!existingProduct) {
      return res.status(404).json(responseStatus(Status.NotFound, "Product"));
    }

    const { method, id } = req.query;

    if (method === "detail" && id) {
      const result = await tagService.findById(id as string);

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
