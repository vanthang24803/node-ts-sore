import { prisma } from "../lib/prisma";
import IPlanterService from "../repositories/planter";

class PlanterService implements IPlanterService {
  public async create(optionId: string, name: string) {
    const result = await prisma.planter.create({
      data: {
        name,
        optionId,
      },
    });
    return result;
  }

  public async isExist(optionId: string, id: string) {
    const existingTag = await prisma.planter.findUnique({
      where: { id, optionId },
    });
    return Boolean(existingTag);
  }

  public async delete(optionId: string, id: string) {
    await prisma.planter.delete({
      where: {
        id: id as string,
        optionId,
      },
    });
  }

  public async update(optionId: string, id: string, name: string) {
    const result = await prisma.planter.update({
      where: { id, optionId },
      data: {
        name,
      },
    });

    return result;
  }

  public async findById(id: string) {
    return await prisma.planter.findUnique({
      where: { id },
    });
  }

  public async findAll(optionId: string) {
    return prisma.planter.findMany({
      where: {
        optionId,
      },
    });
  }
}

export default PlanterService;
