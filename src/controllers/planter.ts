import { Request, Response } from "express";

import ProductService from "../services/product";
import OptionService from "../services/option";
import PlanterService from "../services/planter";
import { Http } from "../helpers/http";

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
        return Http.NotFound(res, "Product not found!");
      }

      const existingOption = await this.optionService.isExist(productId, id);

      if (!existingOption) {
        return Http.NotFound(res, "Option not found!");
      }

      const { method } = req.query;

      if (method === "create") {
        const { name } = req.body;

        const result = await this.planterService.create(id, name);

        return Http.Created(res, result);
      }

      return Http.BadRequest(res, "Invalid Params");
    } catch (error) {
      console.error(error);
      return Http.ServerError(res);
    }
  };

  public findPlanters = async (req: Request, res: Response) => {
    try {
      const { productId, optionId } = req.params;

      const existingProduct = await this.productService.isProductExist(
        productId
      );

      if (!existingProduct) {
        return Http.NotFound(res, "Product not found!");
      }

      const existingOption = await this.optionService.isExist(
        productId,
        optionId
      );

      if (!existingOption) {
        return Http.NotFound(res, "Option not found!");
      }

      const { method, id } = req.query;

      if (method === "all") {
        const result = await this.planterService.findAll(optionId);

        return Http.Ok(res, result);
      }

      if (method === "detail" && id) {
        const result = await this.planterService.findById(id as string);

        if (result) {
          return Http.Ok(res, result);
        }

        return Http.NotFound(res, "Planter not found!");
      }

      return Http.BadRequest(res, "Invalid Params");
    } catch (error) {
      console.error(error);
      return Http.ServerError(res);
    }
  };

  public updatePlanter = async (req: Request, res: Response) => {
    try {
      const { productId, optionId } = req.params;

      const existingProduct = await this.productService.isProductExist(
        productId
      );

      if (!existingProduct) {
        return Http.NotFound(res, "Product not found!");
      }

      const existingOption = await this.optionService.isExist(
        productId,
        optionId
      );

      if (!existingOption) {
        return Http.NotFound(res, "Option not found!");
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
          return Http.Ok(res, result);
        }

        return Http.NotFound(res, "Planter not found!");
      }
      return Http.BadRequest(res, "Invalid Params");
    } catch (error) {
      console.error(error);
      return Http.ServerError(res);
    }
  };

  public deletePlanter = async (req: Request, res: Response) => {
    try {
      const { productId, optionId } = req.params;

      const existingProduct = await this.productService.isProductExist(
        productId
      );

      if (!existingProduct) {
        return Http.NotFound(res, "Product not found!");
      }

      const existingOption = await this.optionService.isExist(
        productId,
        optionId
      );

      if (!existingOption) {
        return Http.NotFound(res, "Option not found!");
      }

      const { method, id } = req.query;
      if (method === "delete" && id) {
        await this.planterService.delete(optionId, id as string);

        return Http.Ok(res, "Planter deleted successfully!");
      }
      return Http.BadRequest(res, "Invalid Params");
    } catch (error) {
      console.error(error);
      return Http.ServerError(res);
    }
  };
}
