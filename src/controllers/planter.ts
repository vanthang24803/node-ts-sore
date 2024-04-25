import { Request, Response } from "express";
import responseStatus from "../helpers/response";
import { Status } from "../enum/status";

import ProductService from "../services/product";
import OptionService from "../services/option";
import PlanterService from "../services/planter";

const productService = new ProductService();
const optionService = new OptionService();
const planterService = new PlanterService();

export const createPlanter = async (req: Request, res: Response) => {
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

    const { method } = req.query;

    if (method === "create") {
      const { name } = req.body;

      const result = await planterService.create(id, name);

      return res.status(201).json(responseStatus(Status.Success, result));
    }

    return res
      .status(400)
      .json(responseStatus(Status.BadRequest, "Invalid Params"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};

export const findPlanters = async (req: Request, res: Response) => {
  try {
    const { productId, optionId } = req.params;

    const existingProduct = await productService.isProductExist(productId);

    if (!existingProduct) {
      return res.status(404).json(responseStatus(Status.NotFound, "Product"));
    }

    const existingOption = await optionService.isExist(productId, optionId);

    if (!existingOption) {
      return res.status(404).json(responseStatus(Status.NotFound, "Option"));
    }

    const { method, id } = req.query;

    if (method === "all") {
      const result = await planterService.findAll(optionId);

      return res.status(200).json(responseStatus(Status.Success, result));
    }

    if (method === "detail" && id) {
      const result = await planterService.findById(id as string);

      if (result) {
        return res.status(200).json(responseStatus(Status.Success, result));
      }

      return res.status(404).json(responseStatus(Status.NotFound, "Planter"));
    }

    return res
      .status(400)
      .json(responseStatus(Status.BadRequest, "Invalid Params"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};

export const updatePlanter = async (req: Request, res: Response) => {
  try {
    const { productId, optionId } = req.params;

    const existingProduct = await productService.isProductExist(productId);

    if (!existingProduct) {
      return res.status(404).json(responseStatus(Status.NotFound, "Product"));
    }

    const existingOption = await optionService.isExist(productId, optionId);

    if (!existingOption) {
      return res.status(404).json(responseStatus(Status.NotFound, "Option"));
    }

    const { method, id } = req.query;
    if (method === "update" && id) {
      const { name } = req.body;

      const result = await optionService.update(optionId, id as string, name);

      if (result) {
        return res.status(200).json(responseStatus(Status.Success, result));
      }

      return res.status(404).json(responseStatus(Status.NotFound, "Planter"));
    }
    return res
      .status(400)
      .json(responseStatus(Status.BadRequest, "Invalid Params"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};

export const deletePlanter = async (req: Request, res: Response) => {
  try {
    const { productId, optionId } = req.params;

    const existingProduct = await productService.isProductExist(productId);

    if (!existingProduct) {
      return res.status(404).json(responseStatus(Status.NotFound, "Product"));
    }

    const existingOption = await optionService.isExist(productId, optionId);

    if (!existingOption) {
      return res.status(404).json(responseStatus(Status.NotFound, "Option"));
    }

    const { method, id } = req.query;
    if (method === "delete" && id) {
      await planterService.delete(optionId, id as string);

      return res
        .status(200)
        .json(responseStatus(Status.Success, "Plater deleted successfully"));
    }
    return res
      .status(400)
      .json(responseStatus(Status.BadRequest, "Invalid Params"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};
