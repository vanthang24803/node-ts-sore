import { Request, Response } from "express";

import BillboardService from "../services/billboard";
import CategoryService from "../services/category";

import { Billboard } from "../models/billboard";

import { Http } from "../helpers/http";
import { logger } from "../helpers/logger";

export class BillboardController {
  private billboardService: BillboardService;
  private categoryService: CategoryService;

  constructor() {
    this.billboardService = new BillboardService();
    this.categoryService = new CategoryService();
  }

  public createBillboard = async (req: Request, res: Response) => {
    try {
      const images = req.files as Express.Multer.File[] | undefined;
      const body: Billboard = req.body;

      const isCategoryExist = await this.categoryService.isExist(
        body.categoryId
      );

      if (!isCategoryExist) {
        return Http.NotFound(res, "Billboard notfound!");
      }

      const result = await this.billboardService.createBillboardAsync(
        images,
        body
      );

      return Http.Created(res, result);
    } catch (error) {
      logger.error(error);
      return Http.ServerError(res);
    }
  };

  public findAllBillboard = async (req: Request, res: Response) => {
    try {
      const result = await this.billboardService.findAllBillboardAsync();

      return Http.Ok(res, result);
    } catch (error) {
      logger.error(error);
      return Http.ServerError(res);
    }
  };

  public updateBillboard = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const body: Billboard = req.body;
      const isBillboardExist =
        await this.billboardService.isBillboardExistAsync(id);

      if (!isBillboardExist) {
        return Http.NotFound(res, "Billboard notfound!");
      }

      const result = await this.billboardService.updateBillboardAsync(id, body);

      return Http.Ok(res, result);
    } catch (error) {
      logger.error(error);
      return Http.ServerError(res);
    }
  };

  public findBillboardDetail = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const isBillboardExist =
        await this.billboardService.isBillboardExistAsync(id);

      if (!isBillboardExist) {
        return Http.NotFound(res, "Billboard notfound!");
      }

      const result = await this.billboardService.findBillboardDetailAsync(id);

      if (result) {
        return Http.Ok(res, result);
      }
    } catch (error) {
      logger.error(error);
      return Http.ServerError(res);
    }
  };

  public deleteBillboard = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const isBillboardExist =
        await this.billboardService.isBillboardExistAsync(id);

      if (!isBillboardExist) {
        return Http.NotFound(res, "Billboard notfound!");
      }

      await this.billboardService.deleteBillboardAsync(id);

      return Http.Ok(res, "Billboard deleted successfully");
    } catch (error) {
      logger.error(error);
      return Http.ServerError(res);
    }
  };
}
