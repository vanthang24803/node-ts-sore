import { prisma } from "../lib/prisma";
import { Color } from "../models/color";
import IColorService from "../repositories/color";

class ColorService implements IColorService {
  public async create(planterId: string, data: Color) {
    const { name, value } = data;
    const result = await prisma.color.create({
      data: {
        name,
        value,
        planterId,
      },
    });

    return result;
  }

  public async delete(planterId: string, id: string) {
    await prisma.color.delete({
      where: {
        id,
        planterId,
      },
    });
  }

  public async update(planterId: string, id: string, data: Color) {
    const { name, value } = data;

    const result = await prisma.color.update({
      where: {
        id,
        planterId,
      },
      data: {
        name,
        value,
      },
    });
    return result;
  }

  public async findAll(planterId: string) {
    return await prisma.color.findMany({
      where: {
        planterId,
      },
    });
  }

  public async findById(planterId: string, id: string) {
    return await prisma.color.findUnique({
      where: {
        id,
        planterId,
      },
    });
  }
}

export default ColorService;
