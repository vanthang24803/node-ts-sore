import "dotenv/config";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { Http } from "../helpers/http";

const secret = process.env.SECRET;

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  if (!token) {
    return Http.Unauthorized(res);
  }
  try {
    jwt.verify(token, secret!);
    next();
  } catch (error) {
    console.log(error);
    return Http.Forbidden(res);
  }
};
