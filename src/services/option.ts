import { Size } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { Option } from "../models/option";
import IOptionService from "../repositories/option";

class OptionService implements IOptionService {
  public async create(productId: string, data: Option) {
    const { name, price, sale, size } = data;

    const result = await prisma.option.create({
      data: {
        name,
        price,
        sale,
        size: size as Size,
        productId: productId,
      },
    });

    return result;
  }

  public async update(productId: string, id: string, data: Option) {
    const { name, price, sale, size } = data;

    const result = await prisma.option.update({
      where: {
        id,
        productId,
      },
      data: {
        name,
        price,
        sale,
        size: size as Size,
      },
    });

    return result;
  }

  public async isExist(productId: string, id: string) {
    const result = await prisma.option.findUnique({
      where: {
        id: id,
        productId: productId,
      },
    });

    return Boolean(result);
  }

  public async findAll(productId: string) {
    const result = await prisma.option.findMany({
      where: {
        productId: productId,
      },
      include : {
        Planter : true,
      }
    });

    return result;
  }

  public async findById(productId: string, id: string) {
    return await prisma.option.findUnique({
      where: {
        id,
        productId,
      },
    });
  }

  public async delete(productId: string, id: string) {
    await prisma.option.delete({
      where: {
        id,
        productId,
      },
    });
  }
}

export default OptionService;
