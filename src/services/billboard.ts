import { prisma } from "../lib/prisma";
import { Billboard } from "../models/billboard";
import IBillboardService from "../repositories/billboard";
import UploadService from "./upload";

const uploadService = new UploadService();

class BillboardService implements IBillboardService {
  async createBillboardAsync(
    images: Express.Multer.File[] | undefined,
    data: Billboard
  ) {
    {
      const imageUpload = await uploadService.upload(images);

      const newBillboard = await prisma.billboard.create({
        data: {
          name: data.name,
          description: data.description,
          publicUrlId: imageUpload[0].publicId,
          url: imageUpload[0].url,
          categoryId: data.categoryId,
        },
      });

      return newBillboard;
    }
  }

  async findAllBillboardAsync() {
    return await prisma.billboard.findMany();
  }

  async isBillboardExistAsync(id: string) {
    return Boolean(
      await prisma.billboard.findUnique({
        where: {
          id,
        },
      })
    );
  }

  async findBillboardDetailAsync(id: string) {
    return await prisma.billboard.findFirst({
      where: {
        id,
      },
    });
  }

  async updateBillboardAsync(id: string, data: Billboard) {
    const updateBillboard = await prisma.billboard.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        description: data.description,
      },
    });

    return updateBillboard;
  }

  async deleteBillboardAsync(id: string) {
    const exitingBillboard = await prisma.billboard.findUnique({
      where: { id },
    });

    if (exitingBillboard) {
      const result = await uploadService.delete(exitingBillboard.publicUrlId);

      if (result) {
        await prisma.billboard.delete({
          where: {
            id: exitingBillboard.id,
          },
        });
      }
    }
  }
}

export default BillboardService;

