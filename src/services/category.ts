import { prisma } from "../lib/prisma";

export const createCategory = async (name: string) => {
  const newCategory = await prisma.category.create({
    data: {
      name,
    },
  });

  return newCategory;
};

export const findAllCategory = async () => {
  return await prisma.category.findMany();
};

export const isExist = async (id: string) => {
  return Boolean(
    await prisma.category.findUnique({
      where: {
        id,
      },
    })
  );
};

export const updateCategory = async (id: string, name: string) => {
  const updateCategory = await prisma.category.update({
    where: { id },
    data: {
      name,
    },
  });

  return updateCategory;
};

export const deleteCategory = async (id: string) => {
  await prisma.category.delete({
    where: {
      id,
    },
  });
};
