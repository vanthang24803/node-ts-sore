import { Request, Response } from "express";
import responseStatus from "../helpers/response";
import { Status } from "../enum/status";
import { prisma } from "../lib/prisma";

export const createColor = async (req: Request, res: Response) => {
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

    const { method, planterId } = req.query;

    if (method === "create" && planterId) {
      const existingPlanter = await prisma.planter.findUnique({
        where: {
          id: planterId as string,
        },
      });

      if (!existingPlanter) {
        return res.status(404).json(responseStatus(Status.NotFound, "Planter"));
      }

      const { name, value } = req.body;

      const result = await prisma.color.create({
        data: {
          name,
          value,
          planterId: planterId as string,
        },
      });

      return res.status(201).json(responseStatus(Status.Created, result));
    }

    return res
      .status(400)
      .json(responseStatus(Status.BadRequest, "Invalid Params"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};

export const findColor = async (req: Request, res: Response) => {
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

    const { method, planterId, id } = req.query;

    if (method === "all" && planterId) {
      const existingPlanter = await prisma.planter.findUnique({
        where: {
          id: planterId as string,
        },
      });

      if (!existingPlanter) {
        return res.status(404).json(responseStatus(Status.NotFound, "Planter"));
      }

      const result = await prisma.color.findMany();

      return res.status(200).json(responseStatus(Status.Success, result));
    }

    if (method === "detail" && planterId && id) {
      const existingPlanter = await prisma.planter.findUnique({
        where: {
          id: planterId as string,
        },
      });

      if (!existingPlanter) {
        return res.status(404).json(responseStatus(Status.NotFound, "Planter"));
      }

      const result = await prisma.color.findUnique({
        where: {
          id: id as string,
        },
      });

      if (result) {
        return res.status(200).json(responseStatus(Status.Success, result));
      }

      return res.status(404).json(responseStatus(Status.NotFound, "Color"));
    }

    return res
      .status(400)
      .json(responseStatus(Status.BadRequest, "Invalid Params"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};

export const updateColor = async (req: Request, res: Response) => {
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

    const { method, planterId, id } = req.query;

    if (method === "update" && planterId && id) {
      const existingPlanter = await prisma.planter.findUnique({
        where: {
          id: planterId as string,
        },
      });

      if (!existingPlanter) {
        return res.status(404).json(responseStatus(Status.NotFound, "Planter"));
      }

      const { name, value } = req.body;

      const result = await prisma.color.update({
        where: {
          id: id as string,
        },
        data: {
          name,
          value,
        },
      });

      if (result) {
        return res.status(200).json(responseStatus(Status.Success, result));
      }

      return res.status(404).json(responseStatus(Status.NotFound, "Color"));
    }

    return res
      .status(400)
      .json(responseStatus(Status.BadRequest, "Invalid Params"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};

export const deleteColor = async (req: Request, res: Response) => {
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

    const { method, planterId, id } = req.query;

    if (method === "delete" && planterId && id) {
      const existingPlanter = await prisma.planter.findUnique({
        where: {
          id: planterId as string,
        },
      });

      if (!existingPlanter) {
        return res.status(404).json(responseStatus(Status.NotFound, "Planter"));
      }

      await prisma.color.delete({
        where: {
          id: id as string,
        },
      });

      return res.status(200).json(responseStatus(Status.Success, "Color deleted success"));
    }

    return res
      .status(400)
      .json(responseStatus(Status.BadRequest, "Invalid Params"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};
