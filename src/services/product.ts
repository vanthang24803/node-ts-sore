/* eslint-disable @typescript-eslint/no-unused-vars */
import { Size } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { Product, UpdateProduct } from "../models/product";
import IProductService from "../repositories/product";
import UploadService from "./upload";

const uploadService = new UploadService();

class ProductService implements IProductService {
  async createProductAsync(
    images: Express.Multer.File[] | undefined,
    data: Product
  ) {
    const imageUpload = await uploadService.upload(images);

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
  }

  async findAllProductAsync() {
    const products = await prisma.product.findMany({
      include: {
        options: {
          select: {
            id: true,
            name: true,
            sale: true,
            price: true,
            size: true,
            createAt: true,
            updateAt: true,
          },
        },
        tag: true,
      },
    });

    return products.map(({ description, guide, ...rest }) => rest);
  }

  async isProductExist(id: string) {
    return Boolean(prisma.product.findUnique({ where: { id } }));
  }

  async findDetailProductAsync(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        options: true,
        tag: true,
      },
    });
  }

  async updateProductAsync(id: string, data: UpdateProduct) {
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
  }

  async deleteProductAsync(id: string): Promise<void> {
    await prisma.product.delete({ where: { id } });
  }
}

export default ProductService;
