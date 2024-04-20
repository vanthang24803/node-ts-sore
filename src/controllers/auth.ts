import { Request, Response } from "express";
import responseStatus from "../helpers/response";
import { Status } from "../enum/status";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import { RegisterResponse } from "../models/auth";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";

const secret = process.env.SECRET;
const refresh = process.env.REFRESH;

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashPassword,
      },
    });

    return res
      .status(201)
      .json(responseStatus(Status.Created, RegisterResponse.parse(user)));
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const exitingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!exitingUser) {
      return res.status(404).json(responseStatus(Status.NotFound, "Email"));
    }

    const isSuccess = bcrypt.compareSync(password, exitingUser.password);

    if (!isSuccess) {
      return res
        .status(401)
        .json(responseStatus(Status.BadRequest, "Email or password wrong"));
    }

    const accessToken = jwt.sign({ id: exitingUser.id }, secret!, {
      expiresIn: "5m",
    });

    const refreshToken = jwt.sign({ id: exitingUser.id }, refresh!, {
      expiresIn: "30d",
    });

    const exitingToken = await prisma.token.findFirst({
      where: {
        name: "refreshToken",
        userId: exitingUser.id,
      },
    });

    // Không tồn tại Token trong DB
    if (!exitingToken) {
      await prisma.token.create({
        data: {
          name: "refreshToken",
          value: refreshToken,
          expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          userId: exitingUser.id,
        },
      });

      return res.status(200).json({
        access: accessToken,
        refresh: refreshToken,
      });
    }

    // Có Token trong DB nhưng hết hạn

    if (exitingToken && exitingToken.expiryDate.getTime() < Date.now()) {
      await prisma.token.delete({
        where: {
          id: exitingToken.id,
        },
      });

      await prisma.token.create({
        data: {
          name: "refreshToken",
          value: refreshToken,
          expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          userId: exitingUser.id,
        },
      });

      return res.status(200).json({
        accessToken,
        refreshToken,
      });
    }

    //  Có Token trong Db còn hạn
    return res.status(200).json({
      accessToken,
      refreshToken: exitingToken.value,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    const exitingToken = await prisma.token.findFirst({
      where: {
        value: refreshToken,
      },
    });

    if (!exitingToken || exitingToken.expiryDate.getTime() < Date.now()) {
      return res
        .status(403)
        .json(responseStatus(Status.BadRequest, "Forbidden"));
    }

    const exitingUser = await prisma.user.findFirst({
      where: {
        id: exitingToken?.userId,
      },
    });

    const user = {
      id: exitingUser?.id,
      name: `${exitingUser?.firstName} ${exitingUser?.lastName}`,
      role: exitingUser?.role,
    };

    try {
      jwt.verify(refreshToken, refresh!);
      const accessToken = jwt.sign(user, secret!, { expiresIn: "5m" });

      return res.status(200).json({
        accessToken,
        refreshToken,
      });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};

export const profile = async (req: Request, res: Response) => {
  try {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    try {
      const decoded = jwt.verify(token, secret!) as JwtPayload;

      const user = await prisma.user.findUnique({
        where: {
          id: decoded?.id,
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...response } = user!;

      if (user) {
        return res.status(200).json(response);
      }

      return res.send(401).json({ message: "Unauthorized" });
    } catch (error) {
      console.log(error);
      return res.status(403).json({
        message: "Forbidden",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};
