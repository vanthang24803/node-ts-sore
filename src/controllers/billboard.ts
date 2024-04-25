import { Request, Response } from "express";
import responseStatus from "../helpers/response";
import BillboardService from "../services/billboard";
import CategoryService from "../services/category";
import { Billboard } from "../models/billboard";
import { Status } from "../enum/status";

const service = new BillboardService();
const categoryService = new CategoryService();

export const createBillboard = async (req: Request, res: Response) => {
  try {
    const images = req.files as Express.Multer.File[] | undefined;

    const body: Billboard = req.body;

    const isCategoryExist = await categoryService.isExist(body.categoryId);

    if (!isCategoryExist) {
      return res.status(404).json(responseStatus(Status.NotFound, "Category"));
    }

    const result = await service.createBillboardAsync(images, body);

    return res.status(200).json(responseStatus(Status.Success, result));
  } catch (error) {
    res.status(500).json(responseStatus(Status.ServerError));
    throw error;
  }
};

export const findAllBillboard = async (req: Request, res: Response) => {
  try {
    const result = await service.findAllBillboardAsync();

    res.status(200).json(responseStatus(Status.Success, result));
  } catch (error) {
    res.status(500).json(responseStatus(Status.ServerError));
    throw error;
  }
};

export const updateBillboard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body: Billboard = req.body;
    const isBillboardExist = await service.isBillboardExistAsync(id);

    if (!isBillboardExist) {
      return res.status(404).json(responseStatus(Status.NotFound, "Billboard"));
    }

    const result = await service.updateBillboardAsync(id, body);

    res.status(200).json(responseStatus(Status.Success, result));
  } catch (error) {
    res.status(500).json(responseStatus(Status.ServerError));
    throw error;
  }
};

export const findBillboardDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const isBillboardExist = await service.isBillboardExistAsync(id);

    if (!isBillboardExist) {
      return res.status(404).json(responseStatus(Status.NotFound, "Billboard"));
    }

    const result = await service.findBillboardDetailAsync(id);

    if (result) {
      res.status(200).json(responseStatus(Status.Success, result));
    }
  } catch (error) {
    res.status(500).json(responseStatus(Status.ServerError));
    throw error;
  }
};

export const deleteBillboard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const isBillboardExist = await service.isBillboardExistAsync(id);

    if (!isBillboardExist) {
      return res.status(404).json(responseStatus(Status.NotFound, "Billboard"));
    }

    await service.deleteBillboardAsync(id);

    res
      .status(200)
      .json(responseStatus(Status.Success, "Billboard deleted successfully!"));
  } catch (error) {
    res.status(500).json(responseStatus(Status.ServerError));
    throw error;
  }
};
