import { prisma } from "../lib/prisma";
import IMediaService from "../repositories/media";
import UploadService from "./upload";

const uploadService = new UploadService();

class MediaService implements IMediaService {
  async create(productId: string, images: Express.Multer.File[] | undefined) {
    const createdImages = [];
    const imageUploads = await uploadService.upload(images);
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

    return createdImages;
  }

  async delete(id: string) {
    const exitingMedia = await prisma.image.findUnique({
      where: {
        id: id,
      },
    });

    if (exitingMedia) {
      await uploadService.delete(exitingMedia.id);

      await prisma.image.delete({
        where: {
          id: id as string,
        },
      });

      return {
        isSuccess: true,
        message: "Image deleted success",
      };
    }
    return {
      isSuccess: false,
      message: "Image not found",
    };
  }

  async findAll(productId: string) {
    return await prisma.image.findMany({
      where: {
        productId,
      },
    });
  }
}

export default MediaService;
