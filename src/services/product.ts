import { Size } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { Product, UpdateProduct } from "../models/product";
import { uploadService } from "./upload";

export const createProductAsync = async (
  images: Express.Multer.File[] | undefined,
  data: Product
) => {
  const imageUpload = await uploadService(images);

  const newProduct = await prisma.product.create({
    data: {
      name: data.name,
      rangePrice: data.rangePrice,
      description: data.description || "",
      thumbnail: imageUpload[0].url,
      guide: data.guide || "",
      options: {
        create: {
          name: data.optionName,
          price: Number(data.optionPrice),
          sale: Number(data.optionSale),
          size: data.optionSize as Size,
        },
      },
      categories: {
        create: {
          category: { connect: { id: data.categoryId } },
        },
      },
    },

    include: {
      options: true,
    },
  });

  return newProduct;
};

export const findAllProductAsync = async () => {
  const products = await prisma.product.findMany();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return products.map(({ description, guide, ...rest }) => rest);
};

export const isProductExist = async (id: string) => {
  return Boolean(prisma.product.findUnique({ where: { id } }));
};

export const findDetailProductAsync = async (id: string) => {
  return prisma.product.findUnique({
    where: { id },
    include: {
      images: true,
      options: true,
      tag: true,
    },
  });
};

export const updateProductAsync = async (id: string, data: UpdateProduct) => {
  const updateProduct = await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      guide: data.guide || "",
      rangePrice: data.rangePrice,
    },
  });
  return updateProduct;
};

export const deleteProductAsync = async (id: string) => {
  return await prisma.product.delete({ where: { id } });
};
