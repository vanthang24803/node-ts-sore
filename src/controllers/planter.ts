import { Request, Response } from "express";
import responseStatus from "../helpers/response";
import { Status } from "../enum/status";

import ProductService from "../services/product";
import OptionService from "../services/option";
import PlanterService from "../services/planter";

export class PlanterController {
  private productService: ProductService;
  private optionService: OptionService;
  private planterService: PlanterService;

  constructor() {
    this.productService = new ProductService();
    this.optionService = new OptionService();
    this.planterService = new PlanterService();
  }

  public createPlanter = async (req: Request, res: Response) => {
    try {
      const { productId, id } = req.params;

      const existingProduct = await this.productService.isProductExist(
        productId
      );

      if (!existingProduct) {
        return res.status(404).json(responseStatus(Status.NotFound, "Product"));
      }

      const existingOption = await this.optionService.isExist(productId, id);

      if (!existingOption) {
        return res.status(404).json(responseStatus(Status.NotFound, "Option"));
      }

      const { method } = req.query;

      if (method === "create") {
        const { name } = req.body;

        const result = await this.planterService.create(id, name);

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

  public findPlanters = async (req: Request, res: Response) => {
    try {
      const { productId, optionId } = req.params;

      const existingProduct = await this.productService.isProductExist(
        productId
      );

      if (!existingProduct) {
        return res.status(404).json(responseStatus(Status.NotFound, "Product"));
      }

      const existingOption = await this.optionService.isExist(
        productId,
        optionId
      );

      if (!existingOption) {
        return res.status(404).json(responseStatus(Status.NotFound, "Option"));
      }

      const { method, id } = req.query;

      if (method === "all") {
        const result = await this.planterService.findAll(optionId);

        return res.status(200).json(responseStatus(Status.Success, result));
      }

      if (method === "detail" && id) {
        const result = await this.planterService.findById(id as string);

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

  public updatePlanter = async (req: Request, res: Response) => {
    try {
      const { productId, optionId } = req.params;

      const existingProduct = await this.productService.isProductExist(
        productId
      );

      if (!existingProduct) {
        return res.status(404).json(responseStatus(Status.NotFound, "Product"));
      }

      const existingOption = await this.optionService.isExist(
        productId,
        optionId
      );

      if (!existingOption) {
        return res.status(404).json(responseStatus(Status.NotFound, "Option"));
      }

      const { method, id } = req.query;
      if (method === "update" && id) {
        const { name } = req.body;

        const result = await this.optionService.update(
          optionId,
          id as string,
          name
        );

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

  public deletePlanter = async (req: Request, res: Response) => {
    try {
      const { productId, optionId } = req.params;

      const existingProduct = await this.productService.isProductExist(
        productId
      );

      if (!existingProduct) {
        return res.status(404).json(responseStatus(Status.NotFound, "Product"));
      }

      const existingOption = await this.optionService.isExist(
        productId,
        optionId
      );

      if (!existingOption) {
        return res.status(404).json(responseStatus(Status.NotFound, "Option"));
      }

      const { method, id } = req.query;
      if (method === "delete" && id) {
        await this.planterService.delete(optionId, id as string);

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
}
