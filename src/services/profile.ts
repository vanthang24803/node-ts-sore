/* eslint-disable @typescript-eslint/no-unused-vars */
import "dotenv/config";
import JwtGenerator from "../helpers/jwt-generator";
import { prisma } from "../lib/prisma";
import IProfileService from "../repositories/profile";

class ProfileService implements IProfileService {
  private jwtGenerator: JwtGenerator;
  private readonly secret = process.env.SECRET;

  constructor() {
    this.jwtGenerator = new JwtGenerator();
  }

  public async getProfile(token: string) {
    const decoded = this.jwtGenerator.verifyToken(token, this.secret!);

    const user = await prisma.user.findFirst({
      where: {
        id: decoded?.id,
      },
    });

    const { password, ...response } = user!;

    return response;
  }
}

export default ProfileService;
