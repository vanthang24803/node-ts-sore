/* eslint-disable @typescript-eslint/no-unused-vars */
import "dotenv/config";
import JwtGenerator from "../helpers/jwt-generator";
import { prisma } from "../lib/prisma";
import IProfileService from "../repositories/profile";

const secret = process.env.SECRET;
const jwtGenerator = new JwtGenerator();

class ProfileService implements IProfileService {
  async getProfile(token: string) {
    const decoded = jwtGenerator.verifyToken(token, secret!);

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
