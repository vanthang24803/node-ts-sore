import { Request, Response } from "express";
import responseStatus from "../helpers/response";
import { Status } from "../enum/status";
import ProductService from "../services/product";
import OptionService from "../services/option";

export class OptionController {
  private productService: ProductService;
  private optionService: OptionService;

  constructor() {
    this.productService = new ProductService();
    this.optionService = new OptionService();
  }
  public createOption = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const existingProduct = await this.productService.isProductExist(id);

      if (!existingProduct) {
        return res.status(404).json(responseStatus(Status.NotFound, "Product"));
      }

      const result = await this.optionService.create(id, req.body);

      return res.status(200).json(responseStatus(Status.Success, result));
    } catch (error) {
      console.error(error);
      return res.status(500).json(responseStatus(Status.ServerError));
    }
  };

  public updateOption = async (req: Request, res: Response) => {
    try {
      const { productId, id } = req.params;

      const existingProduct = await this.productService.isProductExist(
        productId
      );

      if (!existingProduct) {
        return res.status(404).json(responseStatus(Status.NotFound, "Product"));
      }

      const existingOption = await this.optionService.isExist(productId, id);

      if (!existingOption) {
        return res.status(404).json(responseStatus(Status.NotFound, "Option"));
      }

      const result = await this.optionService.update(productId, id, req.body);

      return res.status(200).json(responseStatus(Status.Success, result));
    } catch (error) {
      console.error(error);
      return res.status(500).json(responseStatus(Status.ServerError));
    }
  };

  public findAllOption = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const existingProduct = await this.productService.isProductExist(id);

      if (!existingProduct) {
        return res.status(404).json(responseStatus(Status.NotFound, "Product"));
      }

      const result = await this.optionService.findAll(id);
      return res.status(200).json(responseStatus(Status.Success, result));
    } catch (error) {
      console.error(error);
      return res.status(500).json(responseStatus(Status.ServerError));
    }
  };

  public findDetailOption = async (req: Request, res: Response) => {
    try {
      const { productId, id } = req.params;

      const existingProduct = await this.productService.isProductExist(
        productId
      );

      if (!existingProduct) {
        return res.status(404).json(responseStatus(Status.NotFound, "Product"));
      }

      const result = await this.optionService.findById(productId, id);

      if (result) {
        return res.status(200).json(responseStatus(Status.Success, result));
      }

      return res.status(404).json(responseStatus(Status.NotFound, "Option"));
    } catch (error) {
      console.error(error);
      return res.status(500).json(responseStatus(Status.ServerError));
    }
  };

  public deleteOption = async (req: Request, res: Response) => {
    try {
      const { productId, id } = req.params;

      const existingProduct = await this.productService.isProductExist(
        productId
      );

      if (!existingProduct) {
        return res.status(404).json(responseStatus(Status.NotFound, "Product"));
      }

      const existingOption = await this.optionService.isExist(productId, id);

      if (!existingOption) {
        return res.status(404).json(responseStatus(Status.NotFound, "Option"));
      }

      await this.optionService.delete(productId, id);

      return res
        .status(200)
        .json(responseStatus(Status.Success, "Option deleted successful"));
    } catch (error) {
      console.error(error);
      return res.status(500).json(responseStatus(Status.ServerError));
    }
  };
}
