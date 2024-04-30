import { Request, Response } from "express";
import AuthService from "../services/auth";
import TokenService from "../services/token";
import ProfileService from "../services/profile";
import { Http } from "../helpers/http";
import { logger } from "../helpers/logger";

export class AuthController {
  private authService: AuthService;
  private tokenService: TokenService;
  private profileService: ProfileService;

  constructor() {
    this.authService = new AuthService();
    this.tokenService = new TokenService();
    this.profileService = new ProfileService();
  }

  public register = async (req: Request, res: Response) => {
    try {
      const result = await this.authService.register(req.body);

      return Http.Created(res, result);
    } catch (error) {
      logger.error(error);
      return Http.ServerError(res);
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const result = await this.authService.login(req.body);

      if (result.isSuccess) {
        return Http.Ok(res, result);
      }

      return Http.Unauthorized(res);
    } catch (error) {
      logger.error(error);
      return Http.ServerError(res);
    }
  };

  public refreshToken = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;

      const result = await this.tokenService.refreshToken(refreshToken);

      if (result.isSuccess) {
        return Http.Ok(res, result);
      }

      return Http.Unauthorized(res);
    } catch (error) {
      logger.error(error);
      return Http.ServerError(res);
    }
  };

  public profile = async (req: Request, res: Response) => {
    try {
      const header = req.headers["authorization"];
      const token = header && header.split(" ")[1];

      if (!token) {
        return Http.Unauthorized(res);
      }
      try {
        const result = await this.profileService.getProfile(token);

        if (result) {
          return Http.Ok(res, result);
        }

        return Http.Unauthorized(res);
      } catch (error) {
        logger.error(error);
        return Http.Forbidden(res);
      }
    } catch (error) {
      logger.error(error);
      return Http.ServerError(res);
    }
  };
}
