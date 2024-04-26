import { Request, Response } from "express";
import responseStatus from "../helpers/response";
import BillboardService from "../services/billboard";
import CategoryService from "../services/category";
import { Billboard } from "../models/billboard";
import { Status } from "../enum/status";

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

      const isCategoryExist = await this.categoryService.isExist(body.categoryId);

      if (!isCategoryExist) {
        return res.status(404).json(responseStatus(Status.NotFound, "Category"));
      }

      const result = await this.billboardService.createBillboardAsync(images, body);

      return res.status(200).json(responseStatus(Status.Success, result));
    } catch (error) {
      res.status(500).json(responseStatus(Status.ServerError));
      throw error;
    }
  };

  public findAllBillboard = async (req: Request, res: Response) => {
    try {
      const result = await this.billboardService.findAllBillboardAsync();

      res.status(200).json(responseStatus(Status.Success, result));
    } catch (error) {
      res.status(500).json(responseStatus(Status.ServerError));
      throw error;
    }
  };

  public updateBillboard = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const body: Billboard = req.body;
      const isBillboardExist = await this.billboardService.isBillboardExistAsync(id);

      if (!isBillboardExist) {
        return res.status(404).json(responseStatus(Status.NotFound, "Billboard"));
      }

      const result = await this.billboardService.updateBillboardAsync(id, body);

      res.status(200).json(responseStatus(Status.Success, result));
    } catch (error) {
      res.status(500).json(responseStatus(Status.ServerError));
      throw error;
    }
  };

  public findBillboardDetail = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const isBillboardExist = await this.billboardService.isBillboardExistAsync(id);

      if (!isBillboardExist) {
        return res.status(404).json(responseStatus(Status.NotFound, "Billboard"));
      }

      const result = await this.billboardService.findBillboardDetailAsync(id);

      if (result) {
        res.status(200).json(responseStatus(Status.Success, result));
      }
    } catch (error) {
      res.status(500).json(responseStatus(Status.ServerError));
      throw error;
    }
  };

  public deleteBillboard = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const isBillboardExist = await this.billboardService.isBillboardExistAsync(id);

      if (!isBillboardExist) {
        return res.status(404).json(responseStatus(Status.NotFound, "Billboard"));
      }

      await this.billboardService.deleteBillboardAsync(id);

      res
        .status(200)
        .json(responseStatus(Status.Success, "Billboard deleted successfully!"));
    } catch (error) {
      res.status(500).json(responseStatus(Status.ServerError));
      throw error;
    }
  };
}