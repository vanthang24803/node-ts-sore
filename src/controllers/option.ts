import { Request, Response } from "express";
import responseStatus from "../helpers/response";
import { Status } from "../enum/status";
import ProductService from "../services/product";
import OptionService from "../services/option";

const productService = new ProductService();
const optionService = new OptionService();

export const createOption = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingProduct = await productService.isProductExist(id);

    if (!existingProduct) {
      return res.status(404).json(responseStatus(Status.NotFound, "Product"));
    }

    const result = await optionService.create(id, req.body);

    return res.status(200).json(responseStatus(Status.Success, result));
  } catch (error) {
    console.error(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};

export const updateOption = async (req: Request, res: Response) => {
  try {
    const { productId, id } = req.params;

    const existingProduct = await productService.isProductExist(productId);

    if (!existingProduct) {
      return res.status(404).json(responseStatus(Status.NotFound, "Product"));
    }

    const existingOption = await optionService.isExist(productId, id);

    if (!existingOption) {
      return res.status(404).json(responseStatus(Status.NotFound, "Option"));
    }

    const result = await optionService.update(productId, id, req.body);

    return res.status(200).json(responseStatus(Status.Success, result));
  } catch (error) {
    console.error(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};

export const findAllOption = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingProduct = await productService.isProductExist(id);

    if (!existingProduct) {
      return res.status(404).json(responseStatus(Status.NotFound, "Product"));
    }

    const result = await optionService.findAll(id);
    return res.status(200).json(responseStatus(Status.Success, result));
  } catch (error) {
    console.error(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};

export const findDetailOption = async (req: Request, res: Response) => {
  try {
    const { productId, id } = req.params;

    const existingProduct = await productService.isProductExist(productId);

    if (!existingProduct) {
      return res.status(404).json(responseStatus(Status.NotFound, "Product"));
    }

    const result = await optionService.findById(productId, id);

    if (result) {
      return res.status(200).json(responseStatus(Status.Success, result));
    }

    return res.status(404).json(responseStatus(Status.NotFound, "Option"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};

export const deleteOption = async (req: Request, res: Response) => {
  try {
    const { productId, id } = req.params;

    const existingProduct = await productService.isProductExist(productId);

    if (!existingProduct) {
      return res.status(404).json(responseStatus(Status.NotFound, "Product"));
    }

    const existingOption = await optionService.isExist(productId, id);

    if (!existingOption) {
      return res.status(404).json(responseStatus(Status.NotFound, "Option"));
    }

    await optionService.delete(productId, id);

    return res
      .status(200)
      .json(responseStatus(Status.Success, "Option deleted successful"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};
