import { Request, Response } from "express";
import responseStatus from "../helpers/response";
import { Status } from "../enum/status";
import { prisma } from "../lib/prisma";

export const createTag = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const existingProduct = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!existingProduct) {
      return res.status(404).json(responseStatus(Status.NotFound, "Product"));
    }

    const { method } = req.query;

    if (method === "create") {
      const { name } = req.body;

      const result = await prisma.tag.create({
        data: {
          name,
          productId,
        },
      });
      return res.status(200).json(responseStatus(Status.Success, result));
    }

    return res
      .status(400)
      .json(responseStatus(Status.BadRequest, "Invalid Params"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseStatus(Status.BadRequest));
  }
};

export const deleteTag = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const existingProduct = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!existingProduct) {
      return res.status(404).json(responseStatus(Status.NotFound, "Product"));
    }

    const { method, id } = req.query;

    if (method === "delete" && id) {
      const existingTag = await prisma.tag.findUnique({
        where: { id: id as string },
      });

      if (!existingTag) {
        return res.status(404).json(responseStatus(Status.NotFound, "Tag"));
      }

      await prisma.tag.delete({
        where: {
          id: id as string,
        },
      });

      return res
        .status(200)
        .json(responseStatus(Status.Success, "Tag deleted successfully"));
    }

    return res
      .status(400)
      .json(responseStatus(Status.BadRequest, "Invalid Params"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseStatus(Status.BadRequest));
  }
};

export const updateTag = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const existingProduct = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!existingProduct) {
      return res.status(404).json(responseStatus(Status.NotFound, "Product"));
    }

    const { method, id } = req.query;

    if (method === "update" && id) {
      const existingTag = await prisma.tag.findUnique({
        where: { id: id as string },
      });

      if (!existingTag) {
        return res.status(404).json(responseStatus(Status.NotFound, "Tag"));
      }

      const { name } = req.body;

      const result = await prisma.tag.update({
        where: {
          id: id as string,
        },
        data: {
          name,
        },
      });

      return res.status(200).json(responseStatus(Status.Success, result));
    }

    return res
      .status(400)
      .json(responseStatus(Status.BadRequest, "Invalid Params"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseStatus(Status.BadRequest));
  }
};

export const detailTag = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const existingProduct = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!existingProduct) {
      return res.status(404).json(responseStatus(Status.NotFound, "Product"));
    }

    const { method, id } = req.query;

    if (method === "detail" && id) {
      const existingTag = await prisma.tag.findUnique({
        where: { id: id as string },
      });

      if (!existingTag) {
        return res.status(404).json(responseStatus(Status.NotFound, "Tag"));
      }

      return res.status(200).json(responseStatus(Status.Success, existingTag));
    }

    return res
      .status(400)
      .json(responseStatus(Status.BadRequest, "Invalid Params"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseStatus(Status.BadRequest));
  }
};
