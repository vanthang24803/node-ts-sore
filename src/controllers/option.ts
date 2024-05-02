import { Request, Response } from 'express';

import ProductService from '@/services/product';
import OptionService from '@/services/option';
import { Http } from '@/helpers/http';
import { logger } from '@/helpers/logger';

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
        return Http.NotFound(res, 'Product not found!');
      }

      const result = await this.optionService.create(id, req.body);

      return Http.Created(res, result);
    } catch (error) {
      logger.error(error);
      return Http.ServerError(res);
    }
  };

  public updateOption = async (req: Request, res: Response) => {
    try {
      const { productId, id } = req.params;

      const existingProduct =
        await this.productService.isProductExist(productId);

      if (!existingProduct) {
        return Http.NotFound(res, 'Product not found!');
      }

      const existingOption = await this.optionService.isExist(productId, id);

      if (!existingOption) {
        return Http.BadRequest(res, 'Option not found!');
      }

      const result = await this.optionService.update(productId, id, req.body);

      return Http.Ok(res, result);
    } catch (error) {
      logger.error(error);
      return Http.ServerError(res);
    }
  };

  public findAllOption = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const existingProduct = await this.productService.isProductExist(id);

      if (!existingProduct) {
        return Http.NotFound(res, 'Product not found!');
      }

      const result = await this.optionService.findAll(id);
      return Http.Ok(res, result);
    } catch (error) {
      logger.error(error);
      return Http.ServerError(res);
    }
  };

  public findDetailOption = async (req: Request, res: Response) => {
    try {
      const { productId, id } = req.params;

      const existingProduct =
        await this.productService.isProductExist(productId);

      if (!existingProduct) {
        return Http.NotFound(res, 'Product not found!');
      }

      const result = await this.optionService.findById(productId, id);

      if (result) {
        return Http.Ok(res, result);
      }

      return Http.BadRequest(res, 'Option not found!');
    } catch (error) {
      logger.error(error);
      return Http.ServerError(res);
    }
  };

  public deleteOption = async (req: Request, res: Response) => {
    try {
      const { productId, id } = req.params;

      const existingProduct =
        await this.productService.isProductExist(productId);

      if (!existingProduct) {
        return Http.NotFound(res, 'Product not found!');
      }

      const existingOption = await this.optionService.isExist(productId, id);

      if (!existingOption) {
        return Http.BadRequest(res, 'Option not found!');
      }

      await this.optionService.delete(productId, id);

      return Http.Ok(res, 'Option deleted successfully!');
    } catch (error) {
      logger.error(error);
      return Http.ServerError(res);
    }
  };
}
