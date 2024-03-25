import { Request, Response } from "express";
import responseStatus from "../helpers/response";
import {
  createCategory,
  deleteCategory,
  findAllCategory,
  isExist,
  updateCategory,
} from "../services/category";

export const createAsync = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const result = await createCategory(name);

    res.status(200).json(responseStatus(200, result));
  } catch (error) {
    res.status(500).json(responseStatus(500));
    throw Error;
  }
};

export const findAllAsync = async (req: Request, res: Response) => {
  try {
    const result = await findAllCategory();
    res.status(200).json(responseStatus(200, result));
  } catch (error) {
    res.status(500).json(responseStatus(500));
    throw Error;
  }
};

export const updateAsync = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const categoryExists = await isExist(id);

    if (!categoryExists) {
      return res.status(400).json(responseStatus(400, "Category"));
    }

    const result = await updateCategory(id, name);
    res.status(200).json(responseStatus(200, result));
  } catch (error) {
    res.status(500).json(responseStatus(500));
    throw Error;
  }
};

export const deleteAsync = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const categoryExists = await isExist(id);

    if (!categoryExists) {
      return res.status(400).json(responseStatus(400, "Category"));
    }

    await deleteCategory(id);

    res.status(200).json(responseStatus(200, "Category deleted successfully"));
  } catch (error) {
    res.status(500).json(responseStatus(500));
    throw Error;
  }
};
