import { Request, Response } from "express";

import ProductService from "../services/product";
import OptionService from "../services/option";
import PlanterService from "../services/planter";
import ColorService from "../services/color";
import { Http } from "../helpers/http";

export class ColorController {
  private productService: ProductService;
  private optionService: OptionService;
  private planterService: PlanterService;
  private colorService: ColorService;

  constructor() {
    this.productService = new ProductService();
    this.optionService = new OptionService();
    this.planterService = new PlanterService();
    this.colorService = new ColorService();
  }

  public createColor = async (req: Request, res: Response) => {
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
        return Http.BadRequest(res, "Option not found!");
      }

      const { method, planterId } = req.query;

      if (method === "create" && planterId) {
        const existingPlanter = await this.planterService.isExist(
          optionId,
          planterId as string
        );

        if (!existingPlanter) {
          return Http.BadRequest(res, "Planter not found!");
        }

        const result = await this.colorService.create(
          planterId as string,
          req.body
        );

        return Http.Created(res, result);
      }

      return Http.BadRequest(res, "Invalid Params");
    } catch (error) {
      console.error(error);
      return Http.ServerError(res);
    }
  };

  public findColor = async (req: Request, res: Response) => {
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
        return Http.BadRequest(res, "Option not found!");
      }

      const { method, planterId, id } = req.query;

      if (method === "all" && planterId) {
        const existingPlanter = await this.planterService.isExist(
          optionId,
          planterId as string
        );

        if (!existingPlanter) {
          return Http.BadRequest(res, "Planter not found!");
        }

        const result = await this.colorService.findAll(planterId as string);

        return Http.Ok(res, result);
      }

      if (method === "detail" && planterId && id) {
        const existingPlanter = await this.planterService.isExist(
          optionId,
          planterId as string
        );

        if (!existingPlanter) {
          return Http.BadRequest(res, "Planter not found!");
        }

        const result = await this.colorService.findById(
          planterId as string,
          id as string
        );

        if (result) {
          return Http.Ok(res, result);
        }

        return Http.NotFound(res, "Color not found!");
      }

      return Http.BadRequest(res, "Invalid Params");
    } catch (error) {
      console.error(error);
      return Http.ServerError(res);
    }
  };

  public updateColor = async (req: Request, res: Response) => {
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
        return Http.BadRequest(res, "Option not found!");
      }

      const { method, planterId, id } = req.query;

      if (method === "update" && planterId && id) {
        const existingPlanter = await this.planterService.isExist(
          optionId,
          planterId as string
        );

        if (!existingPlanter) {
          return Http.BadRequest(res, "Planter not found!");
        }

        const result = await this.colorService.update(
          planterId as string,
          id as string,
          req.body
        );

        if (result) {
          return Http.Ok(res, result);
        }

        return Http.NotFound(res, "Color not found!");
      }

      return Http.BadRequest(res, "Invalid Params");
    } catch (error) {
      console.error(error);
      return Http.ServerError(res);
    }
  };

  public deleteColor = async (req: Request, res: Response) => {
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
        return Http.BadRequest(res, "Option not found!");
      }

      const { method, planterId, id } = req.query;

      if (method === "delete" && planterId && id) {
        const existingPlanter = await this.planterService.isExist(
          optionId,
          planterId as string
        );

        if (!existingPlanter) {
          return Http.BadRequest(res, "Planter not found!");
        }

        await this.colorService.delete(planterId as string, id as string);
        return Http.Ok(res, "Color deleted successfully!");
      }

      return Http.BadRequest(res, "Invalid Params");
    } catch (error) {
      console.error(error);
      return Http.ServerError(res);
    }
  };
}
