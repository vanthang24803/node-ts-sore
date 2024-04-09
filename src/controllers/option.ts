import { Request, Response } from "express";
import responseStatus from "../helpers/response";
import { Status } from "../enum/status";
import { prisma } from "../lib/prisma";

export const createOption = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingProduct = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!existingProduct) {
      return res.status(404).json(responseStatus(Status.NotFound, "Product"));
    }

    const { name, price, sale, size } = req.body;

    const result = await prisma.option.create({
      data: {
        name,
        price,
        sale,
        size,
        productId: id,
      },
    });

    return res.status(200).json(responseStatus(Status.Success, result));
  } catch (error) {
    console.error(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};

export const updateOption = async (req: Request, res: Response) => {
  try {
    const { productId, id } = req.params;

    const existingProduct = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!existingProduct) {
      return res.status(404).json(responseStatus(Status.NotFound, "Product"));
    }

    const existingOption = await prisma.option.findUnique({
      where: {
        id,
      },
    });

    if (!existingOption) {
      return res.status(404).json(responseStatus(Status.NotFound, "Option"));
    }

    const { name, price, sale, size } = req.body;

    const result = await prisma.option.update({
      where: {
        id,
      },
      data: {
        name,
        price,
        sale,
        size,
      },
    });

    res.status(200).json(responseStatus(Status.Success, result));
  } catch (error) {
    console.error(error);
    res.status(500).json(responseStatus(Status.ServerError));
  }
};

export const findAllOption = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingProduct = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!existingProduct) {
      return res.status(404).json(responseStatus(Status.NotFound, "Product"));
    }

    const result = await prisma.option.findMany();
    res.status(200).json(responseStatus(Status.Success, result));
  } catch (error) {
    console.error(error);
    res.status(500).json(responseStatus(Status.ServerError));
  }
};

export const deleteOption = async (req: Request, res: Response) => {
  try {
    const { productId, id } = req.params;

    const existingProduct = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!existingProduct) {
      return res.status(404).json(responseStatus(Status.NotFound, "Product"));
    }

    const existingOption = await prisma.option.findUnique({
      where: {
        id,
      },
    });

    if (!existingOption) {
      return res.status(404).json(responseStatus(Status.NotFound, "Option"));
    }

    await prisma.option.delete({
      where: {
        id,
      },
    });

    res
      .status(200)
      .json(responseStatus(Status.Success, "Option deleted successful"));
  } catch (error) {
    console.error(error);
    res.status(500).json(responseStatus(Status.ServerError));
  }
};
