import { Request, Response } from "express";
import responseStatus from "../helpers/response";
import { Status } from "../enum/status";
import { prisma } from "../lib/prisma";

export const createPlanter = async (req: Request, res: Response) => {
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

    const { method } = req.query;

    if (method === "create") {
      const { name } = req.body;

      const result = await prisma.planter.create({
        data: {
          name,
          optionId: id,
        },
      });

      return res.status(201).json(responseStatus(Status.Success, result));
    }

    return res
      .status(400)
      .json(responseStatus(Status.BadRequest, "Invalid Params"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};

export const findPlanters = async (req: Request, res: Response) => {
  try {
    const { productId, optionId } = req.params;

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
        id: optionId,
      },
    });

    if (!existingOption) {
      return res.status(404).json(responseStatus(Status.NotFound, "Option"));
    }

    const { method, id } = req.query;

    if (method === "all") {
      const result = await prisma.planter.findMany();

      return res.status(200).json(responseStatus(Status.Success, result));
    }

    if (method === "detail" && id) {
      const result = await prisma.planter.findUnique({
        where: { id: id as string },
      });

      if (result) {
        return res.status(200).json(responseStatus(Status.Success, result));
      }

      return res.status(404).json(responseStatus(Status.NotFound, "Planter"));
    }

    return res
      .status(400)
      .json(responseStatus(Status.BadRequest, "Invalid Params"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};

export const updatePlanter = async (req: Request, res: Response) => {
  try {
    const { productId, optionId } = req.params;

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
        id: optionId,
      },
    });

    if (!existingOption) {
      return res.status(404).json(responseStatus(Status.NotFound, "Option"));
    }

    const { method, id } = req.query;
    if (method === "update" && id) {
      const { name } = req.body;

      const result = await prisma.planter.update({
        where: { id: id as string },
        data: {
          name,
        },
      });

      if (result) {
        return res.status(200).json(responseStatus(Status.Success, result));
      }

      return res.status(404).json(responseStatus(Status.NotFound, "Planter"));
    }
    return res
      .status(400)
      .json(responseStatus(Status.BadRequest, "Invalid Params"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};

export const deletePlanter = async (req: Request, res: Response) => {
  try {
    const { productId, optionId } = req.params;

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
        id: optionId,
      },
    });

    if (!existingOption) {
      return res.status(404).json(responseStatus(Status.NotFound, "Option"));
    }

    const { method, id } = req.query;
    if (method === "delete" && id) {
      await prisma.planter.delete({
        where: {
          id: id as string,
        },
      });

      return res
        .status(200)
        .json(responseStatus(Status.Success, "Plater deleted successfully"));
    }
    return res
      .status(400)
      .json(responseStatus(Status.BadRequest, "Invalid Params"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};
