import { prisma } from "../lib/prisma";
import ICategoryService from "../repositories/category";

class CategoryService implements ICategoryService {
  public async createCategory(name: string) {
    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });

    return newCategory;
  }

  public async findAllCategory() {
    return await prisma.category.findMany();
  }

  public async isExist(id: string) {
    return Boolean(
      await prisma.category.findUnique({
        where: {
          id,
        },
      })
    );
  }

  public async updateCategory(id: string, name: string) {
    const updateCategory = await prisma.category.update({
      where: { id },
      data: {
        name,
      },
    });

    return updateCategory;
  }

  public async deleteCategory(id: string) {
    await prisma.category.delete({
      where: {
        id,
      },
    });
  }
}

export default CategoryService;
