import { prisma } from "../lib/prisma";
import IPlanterService from "../repositories/planter";

class PlanterService implements IPlanterService {
  async create(optionId: string, name: string) {
    const result = await prisma.planter.create({
      data: {
        name,
        optionId,
      },
    });
    return result;
  }

  async isExist(optionId: string, id: string) {
    const existingTag = await prisma.planter.findUnique({
      where: { id, optionId },
    });
    return Boolean(existingTag);
  }

  async delete(optionId: string, id: string) {
    await prisma.planter.delete({
      where: {
        id: id as string,
        optionId,
      },
    });
  }

  async update(optionId: string, id: string, name: string) {
    const result = await prisma.planter.update({
      where: { id, optionId },
      data: {
        name,
      },
    });

    return result;
  }

  async findById(id: string) {
    return await prisma.planter.findUnique({
      where: { id },
    });
  }

  async findAll(optionId: string) {
    return prisma.planter.findMany({
      where: {
        optionId,
      },
    });
  }
}

export default PlanterService;
