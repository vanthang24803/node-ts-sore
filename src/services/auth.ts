import "dotenv/config";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";

import { Login, Register, RegisterResponse } from "../models/auth";
import IAuthService from "../repositories/auth";

import JwtGenerator from "../helpers/jwt-generator";
import TokenService from "./token";

class AuthService implements IAuthService {
  private tokenService: TokenService;
  private secret = process.env.SECRET;
  private refresh = process.env.REFRESH;

  constructor() {
    this.tokenService = new TokenService();
  }

  public async register(data: Register) {
    const { email, password, firstName, lastName } = data;

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashPassword,
      },
    });

    return RegisterResponse.parse(user);
  }

  public async login(data: Login) {
    const { email, password } = data;

    const exitingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!exitingUser) {
      return {
        isSuccess: false,
        message: "Email or password wrong",
      };
    }

    const isSuccess = bcrypt.compareSync(password, exitingUser.password);

    if (!isSuccess) {
      return {
        isSuccess: false,
        message: "Email or password wrong",
      };
    }

    const accessToken = JwtGenerator.generateToken(
      { id: exitingUser.id },
      this.secret!,
      "5m"
    );

    const refreshToken = JwtGenerator.generateToken(
      { id: exitingUser.id },
      this.refresh!,
      "30d"
    );

    const token = await this.tokenService.generateToken(
      refreshToken,
      exitingUser.id
    );

    return { isSuccess: true, accessToken, refreshToken: token };
  }
}

export default AuthService;
