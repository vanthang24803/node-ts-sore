import "dotenv/config";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";

import { Login, Register, RegisterResponse } from "../models/auth";
import IAuthService from "../repositories/auth";

import JwtGenerator from "../helpers/jwt-generator";
import TokenService from "./token";

const secret = process.env.SECRET;
const refresh = process.env.REFRESH;

const jwtGenerator = new JwtGenerator();
const tokenService = new TokenService();

class AuthService implements IAuthService {
  async register(data: Register) {
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

  async login(data: Login) {
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

    const accessToken = jwtGenerator.generateToken(
      { id: exitingUser.id },
      secret!,
      "5m"
    );

    const refreshToken = jwtGenerator.generateToken(
      { id: exitingUser.id },
      refresh!,
      "30d"
    );

    const token = await tokenService.generateToken(
      refreshToken,
      exitingUser.id
    );

    return { isSuccess: true, accessToken, refreshToken: token };
  }
}

export default AuthService;
