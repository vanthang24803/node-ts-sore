import { Request, Response } from "express";
import responseStatus from "../helpers/response";
import { Status } from "../enum/status";
import { prisma } from "../lib/prisma";
import UploadService from "../services/upload";

const uploadService = new UploadService();

export const createImages = async (req: Request, res: Response) => {
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
      const images = req.files as Express.Multer.File[] | undefined;
      const imageUploads = await uploadService.upload(images);
      const createdImages = [];

      for (const image of imageUploads) {
        const result = await prisma.image.create({
          data: {
            id: image.publicId,
            url: image.url,
            productId,
          },
        });
        createdImages.push(result);
      }
      return res
        .status(201)
        .json(responseStatus(Status.Created, createdImages));
    }

    return res
      .status(400)
      .json(responseStatus(Status.BadRequest, "Invalid Params"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};

export const deletedImages = async (req: Request, res: Response) => {
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
      const exitingMedia = await prisma.image.findUnique({
        where: {
          id: id as string,
        },
      });
      if (exitingMedia) {
        await uploadService.delete(exitingMedia.id);

        await prisma.image.delete({
          where: {
            id: id as string,
          },
        });

        return res
          .status(200)
          .json(responseStatus(Status.Success, "Image deleted success"));
      }
      return res.status(404).json(responseStatus(Status.NotFound, "Image"));
    }

    return res
      .status(400)
      .json(responseStatus(Status.BadRequest, "Invalid Params"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};

export const findAllImages = async (req: Request, res: Response) => {
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

    if (method === "all") {
      const result = await prisma.image.findMany({
        where: {
          productId,
        },
      });

      return res
        .status(200)
        .json(responseStatus(Status.Success, result));
    }

    return res
      .status(400)
      .json(responseStatus(Status.BadRequest, "Invalid Params"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseStatus(Status.ServerError));
  }
};
