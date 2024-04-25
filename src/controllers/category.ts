import { Request, Response } from "express";
import responseStatus from "../helpers/response";
import { Status } from "../enum/status";
import CategoryService from "../services/category";

const service = new CategoryService();

export const createAsync = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const result = await service.createCategory(name);

    res.status(200).json(responseStatus(Status.Success, result));
  } catch (error) {
    res.status(500).json(responseStatus(Status.ServerError));
    throw Error;
  }
};

export const findAllAsync = async (req: Request, res: Response) => {
  try {
    const result = await service.findAllCategory();
    res.status(200).json(responseStatus(Status.Success, result));
  } catch (error) {
    res.status(500).json(responseStatus(Status.ServerError));
    throw Error;
  }
};

export const updateAsync = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const categoryExists = await service.isExist(id);

    if (!categoryExists) {
      return res.status(400).json(responseStatus(Status.NotFound, "Category"));
    }

    const result = await service.updateCategory(id, name);
    res.status(200).json(responseStatus(Status.Success, result));
  } catch (error) {
    res.status(500).json(responseStatus(Status.BadRequest));
    throw Error;
  }
};

export const deleteAsync = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const categoryExists = await service.isExist(id);

    if (!categoryExists) {
      return res.status(404).json(responseStatus(Status.NotFound, "Category"));
    }

    await service.deleteCategory(id);

    res
      .status(200)
      .json(responseStatus(Status.Success, "Category deleted successfully"));
  } catch (error) {
    res.status(500).json(responseStatus(Status.ServerError));
    throw Error;
  }
};
