import { Request, Response } from 'express';

import ProductService from '@/services/product';
import MediaService from '@/services/media';
import { Http } from '@/helpers/http';
import { logger } from '@/helpers/logger';

export class MediaController {
  private productService: ProductService;
  private mediaService: MediaService;

  constructor() {
    this.productService = new ProductService();
    this.mediaService = new MediaService();
  }
  public createImages = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const existingProduct =
        await this.productService.isProductExist(productId);

      if (!existingProduct) {
        return Http.NotFound(res, 'Product not found!');
      }

      const { method } = req.query;

      if (method === 'create') {
        const images = req.files as Express.Multer.File[] | undefined;

        const result = await this.mediaService.create(productId, images);

        return Http.Created(res, result);
      }

      return Http.BadRequest(res, 'Invalid Params');
    } catch (error) {
      logger.error(error);
      return Http.ServerError(res);
    }
  };

  public deletedImages = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const existingProduct =
        await this.productService.isProductExist(productId);

      if (!existingProduct) {
        return Http.NotFound(res, 'Product not found!');
      }

      const { method, id } = req.query;

      if (method === 'delete' && id) {
        const result = await this.mediaService.delete(id as string);

        if (result.isSuccess) {
          return Http.Ok(res, result);
        }

        return Http.BadRequest(res, result);
      }

      return Http.BadRequest(res, 'Invalid Params');
    } catch (error) {
      logger.error(error);
      return Http.ServerError(res);
    }
  };

  public findAllImages = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;

      const existingProduct =
        await this.productService.isProductExist(productId);

      if (!existingProduct) {
        return Http.NotFound(res, 'Product not found!');
      }

      const { method } = req.query;

      if (method === 'all') {
        const result = await this.mediaService.findAll(productId);

        return Http.Ok(res, result);
      }

      return Http.BadRequest(res, 'Invalid Params');
    } catch (error) {
      logger.error(error);
      return Http.ServerError(res);
    }
  };
}
