import { prisma } from "../lib/prisma";
import ITagService from "../repositories/tag";

class TagService implements ITagService {
  async create(productId: string, name: string) {
    const result = await prisma.tag.create({
      data: {
        name,
        productId,
      },
    });
    return result;
  }

  async isExist(productId: string, id: string) {
    const existingTag = await prisma.tag.findUnique({
      where: { id: id, productId: productId },
    });
    return Boolean(existingTag);
  }

  async delete(productId: string, id: string) {
    await prisma.tag.delete({
      where: {
        id: id as string,
        productId,
      },
    });
  }

  async update(productId: string, id: string, name: string) {
    const result = await prisma.tag.update({
      where: {
        id: id as string,
        productId,
      },
      data: {
        name,
      },
    });
    return result;
  }

  async findById(id: string) {
    return prisma.tag.findUnique({
      where: {
        id,
      },
    });
  }
}

export default TagService;
