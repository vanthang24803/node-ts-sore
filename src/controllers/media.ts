import { Request, Response } from "express";
import responseStatus from "../helpers/response";
import { Status } from "../enum/status";
import ProductService from "../services/product";
import MediaService from "../services/media";

const productService = new ProductService();
const mediaService = new MediaService();

export const createImages = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const existingProduct = await productService.isProductExist(productId);

    if (!existingProduct) {
      return res.status(404).json(responseStatus(Status.NotFound, "Product"));
    }

    const { method } = req.query;

    if (method === "create") {
      const images = req.files as Express.Multer.File[] | undefined;

      const result = await mediaService.create(productId, images);

      return res.status(200).json(result);
    }

    return res
      .status(400)
      .json(responseStatus(Status.BadRequest, "Invalid Params"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};

export const deletedImages = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const existingProduct = await productService.isProductExist(productId);

    if (!existingProduct) {
      return res.status(404).json(responseStatus(Status.NotFound, "Product"));
    }

    const { method, id } = req.query;

    if (method === "delete" && id) {
      const result = await mediaService.delete(id as string);

      if (result.isSuccess) {
        return res.status(200).json(result);
      }

      return res.status(400).json(result);
    }

    return res
      .status(400)
      .json(responseStatus(Status.BadRequest, "Invalid Params"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};

export const findAllImages = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const existingProduct = await productService.isProductExist(productId);

    if (!existingProduct) {
      return res.status(404).json(responseStatus(Status.NotFound, "Product"));
    }

    const { method } = req.query;

    if (method === "all") {
      const result = await mediaService.findAll(productId);

      return res.status(200).json(responseStatus(Status.Success, result));
    }

    return res
      .status(400)
      .json(responseStatus(Status.BadRequest, "Invalid Params"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};
