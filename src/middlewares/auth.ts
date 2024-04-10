import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import "dotenv/config";

const secret = process.env.SECRET;

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  try {
    jwt.verify(token, secret!);
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      message: "Forbidden",
    });
  }
};
