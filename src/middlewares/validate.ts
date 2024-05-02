import * as z from 'zod';
import { Request, Response, NextFunction } from 'express';
import { Http } from '@/helpers/http';

const validateMiddleware =
  <T>(schema: z.ZodSchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      return Http.BadRequest(res, error);
    }
  };

export default validateMiddleware;
