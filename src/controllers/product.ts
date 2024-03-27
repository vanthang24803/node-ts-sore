import { Request, Response } from "express";
import responseStatus from "../helpers/response";
import { Status } from "../enum/status";
import { isExist } from "../services/category";
import { Product, UpdateProduct } from "../models/product";
import {
  createProductAsync,
  deleteProductAsync,
  findAllProductAsync,
  findDetailProductAsync,
  isProductExist,
  updateProductAsync,
} from "../services/product";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const data: Product = req.body;
    const images = req.files as Express.Multer.File[] | undefined;

    const exitingCategory = await isExist(data.categoryId);

    if (!exitingCategory) {
      return res.status(404).json(responseStatus(Status.NotFound, "Category"));
    }

    const result = await createProductAsync(images, data);

    res.status(200).json(responseStatus(Status.Success, result));
  } catch (error) {
    res.status(500).json(responseStatus(Status.BadRequest));
    throw error;
  }
};

export const findAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await findAllProductAsync();
    res.status(200).json(responseStatus(Status.Success, result));
  } catch (error) {
    res.status(500).json(responseStatus(Status.BadRequest));
    throw error;
  }
};

export const findDetailProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await findDetailProductAsync(id);

    if (result) {
      res.status(200).json(responseStatus(Status.Success, result));
    }

    return res.status(404).json(responseStatus(Status.NotFound, "Product"));
  } catch (error) {
    res.status(500).json(responseStatus(Status.BadRequest));
    throw error;
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body: UpdateProduct = req.body;

    const exitingProduct = await isProductExist(id);

    if (!exitingProduct) {
      return res.status(404).json(responseStatus(Status.NotFound, "Product"));
    }

    const result = await updateProductAsync(id, body);

    res.status(200).json(responseStatus(Status.Success, result));
  } catch (error) {
    res.status(500).json(responseStatus(Status.BadRequest));
    throw error;
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const exitingProduct = await isProductExist(id);

    if (!exitingProduct) {
      return res.status(404).json(responseStatus(Status.NotFound, "Product"));
    }

    await deleteProductAsync(id);

    res
      .status(200)
      .json(responseStatus(Status.Success, "Product deleted success"));
  } catch (error) {
    res.status(500).json(responseStatus(Status.BadRequest));
    throw error;
  }
};
