import { prisma } from "../lib/prisma";
import { Billboard } from "../models/billboard";
import { deletePhotoService, uploadService } from "./upload";

export const createBillboardAsync = async (
  images: Express.Multer.File[] | undefined,
  data: Billboard
) => {
  const imageUpload = await uploadService(images);

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
};

export const findAllBillboardAsync = async () => {
  return await prisma.billboard.findMany();
};

export const isBillboardExistAsync = async (id: string) => {
  return Boolean(
    await prisma.billboard.findUnique({
      where: {
        id,
      },
    })
  );
};

export const findBillboardDetailAsync = async (id: string) => {
  return await prisma.billboard.findFirst({
    where: {
      id,
    },
  });
};

export const updateBillboardAsync = async (id: string, data: Billboard) => {
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
};

export const deleteBillboardAsync = async (id: string) => {
  const exitingBillboard = await prisma.billboard.findUnique({ where: { id } });

  if (exitingBillboard) {
    const result = await deletePhotoService(exitingBillboard.publicUrlId);

    if (result) {
      await prisma.billboard.delete({
        where: {
          id: exitingBillboard.id,
        },
      });
    }
  }
};
