import { Request, Response } from "express";
import CategoryService from "../services/category";
import { Http } from "../helpers/http";

export class CategoryController {
  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  public createAsync = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;

      const result = await this.categoryService.createCategory(name);

      return Http.Created(res, result);
    } catch (error) {
      console.log(error);
      return Http.ServerError(res);
    }
  };

  public findAllAsync = async (req: Request, res: Response) => {
    try {
      const result = await this.categoryService.findAllCategory();
      return Http.Ok(res, result);
    } catch (error) {
      console.log(error);
      return Http.ServerError(res);
    }
  };

  public updateAsync = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const categoryExists = await this.categoryService.isExist(id);

      if (!categoryExists) {
        return Http.NotFound(res, "Category not found!");
      }

      const result = await this.categoryService.updateCategory(id, name);
      return Http.Ok(res, result);
    } catch (error) {
      console.log(error);
      return Http.ServerError(res);
    }
  };

  public deleteAsync = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const categoryExists = await this.categoryService.isExist(id);

      if (!categoryExists) {
        return Http.NotFound(res, "Category not found!");
      }

      await this.categoryService.deleteCategory(id);

      return Http.Ok(res, "Category deleted successfully!");
    } catch (error) {
      console.log(error);
      return Http.ServerError(res);
    }
  };
}
