import { Request, Response } from "express";
import responseStatus from "../helpers/response";
import { Status } from "../enum/status";
import CategoryService from "../services/category";

export class CategoryController {
  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  public createAsync = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;

      const result = await this.categoryService.createCategory(name);

      res.status(200).json(responseStatus(Status.Success, result));
    } catch (error) {
      res.status(500).json(responseStatus(Status.ServerError));
      throw error;
    }
  };

  public findAllAsync = async (req: Request, res: Response) => {
    try {
      const result = await this.categoryService.findAllCategory();
      res.status(200).json(responseStatus(Status.Success, result));
    } catch (error) {
      res.status(500).json(responseStatus(Status.ServerError));
      throw error;
    }
  };

  public updateAsync = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const categoryExists = await this.categoryService.isExist(id);

      if (!categoryExists) {
        return res.status(400).json(responseStatus(Status.NotFound, "Category"));
      }

      const result = await this.categoryService.updateCategory(id, name);
      res.status(200).json(responseStatus(Status.Success, result));
    } catch (error) {
      res.status(500).json(responseStatus(Status.BadRequest));
      throw error;
    }
  };

  public deleteAsync = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const categoryExists = await this.categoryService.isExist(id);

      if (!categoryExists) {
        return res.status(404).json(responseStatus(Status.NotFound, "Category"));
      }

      await this.categoryService.deleteCategory(id);

      res
        .status(200)
        .json(responseStatus(Status.Success, "Category deleted successfully"));
    } catch (error) {
      res.status(500).json(responseStatus(Status.ServerError));
      throw error;
    }
  };
}