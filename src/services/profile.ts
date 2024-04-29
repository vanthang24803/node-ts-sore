/* eslint-disable @typescript-eslint/no-unused-vars */
import "dotenv/config";
import JwtGenerator from "../helpers/jwt-generator";
import { prisma } from "../lib/prisma";
import IProfileService from "../repositories/profile";

class ProfileService implements IProfileService {
  private readonly secret = process.env.SECRET;

  public async getProfile(token: string) {
    const decoded = JwtGenerator.verifyToken(token, this.secret!);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.data.id,
      },
    });

    const { password, ...response } = user!;

    return response;
  }
}

export default ProfileService;
