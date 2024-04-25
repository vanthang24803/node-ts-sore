import "dotenv/config";
import { Request, Response } from "express";
import responseStatus from "../helpers/response";
import { Status } from "../enum/status";
import AuthService from "../services/auth";
import TokenService from "../services/token";
import ProfileService from "../services/profile";

const service = new AuthService();
const tokenService = new TokenService();
const profileService = new ProfileService();

export const register = async (req: Request, res: Response) => {
  try {
    const result = await service.register(req.body);

    return res.status(201).json(responseStatus(Status.Created, result));
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await service.login(req.body);

    if (result.isSuccess) {
      return res.status(200).json(result);
    }

    return res.status(401).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    const result = await tokenService.refreshToken(refreshToken);

    if (result.isSuccess) {
      return res.status(200).json(result);
    }

    return res.status(400).json(result);
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
      const result = await profileService.getProfile(token);

      if (result) {
        return res.status(200).json(result);
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
