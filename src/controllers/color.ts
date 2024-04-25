import { Request, Response } from "express";
import responseStatus from "../helpers/response";
import { Status } from "../enum/status";

import ProductService from "../services/product";
import OptionService from "../services/option";
import PlanterService from "../services/planter";
import ColorService from "../services/color";

const productService = new ProductService();
const optionService = new OptionService();
const planterService = new PlanterService();
const colorService = new ColorService();

export const createColor = async (req: Request, res: Response) => {
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

    const { method, planterId } = req.query;

    if (method === "create" && planterId) {
      const existingPlanter = await planterService.isExist(
        optionId,
        planterId as string
      );

      if (!existingPlanter) {
        return res.status(404).json(responseStatus(Status.NotFound, "Planter"));
      }

      const result = await colorService.create(planterId as string, req.body);

      return res.status(201).json(responseStatus(Status.Created, result));
    }

    return res
      .status(400)
      .json(responseStatus(Status.BadRequest, "Invalid Params"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};

export const findColor = async (req: Request, res: Response) => {
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

    const { method, planterId, id } = req.query;

    if (method === "all" && planterId) {
      const existingPlanter = await planterService.isExist(
        optionId,
        planterId as string
      );

      if (!existingPlanter) {
        return res.status(404).json(responseStatus(Status.NotFound, "Planter"));
      }

      const result = await colorService.findAll(planterId as string);

      return res.status(200).json(responseStatus(Status.Success, result));
    }

    if (method === "detail" && planterId && id) {
      const existingPlanter = await planterService.isExist(
        optionId,
        planterId as string
      );

      if (!existingPlanter) {
        return res.status(404).json(responseStatus(Status.NotFound, "Planter"));
      }

      const result = await colorService.findById(
        planterId as string,
        id as string
      );

      if (result) {
        return res.status(200).json(responseStatus(Status.Success, result));
      }

      return res.status(404).json(responseStatus(Status.NotFound, "Color"));
    }

    return res
      .status(400)
      .json(responseStatus(Status.BadRequest, "Invalid Params"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};

export const updateColor = async (req: Request, res: Response) => {
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

    const { method, planterId, id } = req.query;

    if (method === "update" && planterId && id) {
      const existingPlanter = await planterService.isExist(
        optionId,
        planterId as string
      );

      if (!existingPlanter) {
        return res.status(404).json(responseStatus(Status.NotFound, "Planter"));
      }

      const result = await colorService.update(
        planterId as string,
        id as string,
        req.body
      );

      if (result) {
        return res.status(200).json(responseStatus(Status.Success, result));
      }

      return res.status(404).json(responseStatus(Status.NotFound, "Color"));
    }

    return res
      .status(400)
      .json(responseStatus(Status.BadRequest, "Invalid Params"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};

export const deleteColor = async (req: Request, res: Response) => {
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

    const { method, planterId, id } = req.query;

    if (method === "delete" && planterId && id) {
      const existingPlanter = await planterService.isExist(
        optionId,
        planterId as string
      );

      if (!existingPlanter) {
        return res.status(404).json(responseStatus(Status.NotFound, "Planter"));
      }

      await colorService.delete(planterId as string, id as string);
      return res
        .status(200)
        .json(responseStatus(Status.Success, "Color deleted success"));
    }

    return res
      .status(400)
      .json(responseStatus(Status.BadRequest, "Invalid Params"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};
