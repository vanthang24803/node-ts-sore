import * as z from "zod";
import { Request, Response, NextFunction } from "express";

const validateMiddleware =
  <T>(schema: z.ZodSchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      res.status(400).send(error);
    }
  };

export default validateMiddleware;
