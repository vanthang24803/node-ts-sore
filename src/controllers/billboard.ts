import { Request, Response } from "express";
import responseStatus from "../helpers/response";
import {
  createBillboardAsync,
  deleteBillboardAsync,
  findAllBillboardAsync,
  findBillboardDetailAsync,
  isBillboardExistAsync,
  updateBillboardAsync,
} from "../services/billboard";
import { Billboard } from "../models/billboard";
import { Status } from "../enum/status";
import { isExist } from "../services/category";

export const createBillboard = async (req: Request, res: Response) => {
  try {
    const images = req.files as Express.Multer.File[] | undefined;

    const body: Billboard = req.body;

    const isCategoryExist = await isExist(body.categoryId);

    if (!isCategoryExist) {
      return res.status(404).json(responseStatus(Status.NotFound, "Category"));
    }

    const result = await createBillboardAsync(images, body);

    return res.status(200).json(responseStatus(Status.Success, result));
  } catch (error) {
    res.status(500).json(responseStatus(Status.ServerError));
    throw error;
  }
};

export const findAllBillboard = async (req: Request, res: Response) => {
  try {
    const result = await findAllBillboardAsync();

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
    const isBillboardExist = await isBillboardExistAsync(id);

    if (!isBillboardExist) {
      return res.status(404).json(responseStatus(Status.NotFound, "Billboard"));
    }

    const result = await updateBillboardAsync(id, body);

    res.status(200).json(responseStatus(Status.Success, result));
  } catch (error) {
    res.status(500).json(responseStatus(Status.ServerError));
    throw error;
  }
};

export const findBillboardDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const isBillboardExist = await isBillboardExistAsync(id);

    if (!isBillboardExist) {
      return res.status(404).json(responseStatus(Status.NotFound, "Billboard"));
    }

    const result = await findBillboardDetailAsync(id);

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

    const isBillboardExist = await isBillboardExistAsync(id);

    if (!isBillboardExist) {
      return res.status(404).json(responseStatus(Status.NotFound, "Billboard"));
    }

    await deleteBillboardAsync(id);

    res
      .status(200)
      .json(responseStatus(Status.Success, "Billboard deleted successfully!"));
  } catch (error) {
    res.status(500).json(responseStatus(Status.ServerError));
    throw error;
  }
};
