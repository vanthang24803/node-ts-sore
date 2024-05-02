import { prisma } from '@/lib/prisma';
import IMediaService from '@/repositories/media';
import UploadService from '@/services/upload';

class MediaService implements IMediaService {
  private uploadService: UploadService;

  constructor() {
    this.uploadService = new UploadService();
  }

  public async create(
    productId: string,
    images: Express.Multer.File[] | undefined
  ) {
    const createdImages = [];
    const imageUploads = await this.uploadService.upload(images);
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

  public async delete(id: string) {
    const exitingMedia = await prisma.image.findUnique({
      where: {
        id: id,
      },
    });

    if (exitingMedia) {
      await this.uploadService.delete(exitingMedia.id);

      await prisma.image.delete({
        where: {
          id: id as string,
        },
      });

      return {
        isSuccess: true,
        message: 'Image deleted success',
      };
    }
    return {
      isSuccess: false,
      message: 'Image not found',
    };
  }

  public async findAll(productId: string) {
    return await prisma.image.findMany({
      where: {
        productId,
      },
    });
  }
}

export default MediaService;
