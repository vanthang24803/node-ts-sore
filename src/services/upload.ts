import cloudinary from '@/configs/cloudinary';
import IUploadService from '@/repositories/upload';

class UploadService implements IUploadService {
  public async upload(files: Express.Multer.File[] | undefined) {
    const images: string[] | undefined = files?.map(
      (file: Express.Multer.File) => file.path
    );

    const uploadImages = [];

    for (const image of images ?? []) {
      const result = await cloudinary.uploader.upload(image);
      uploadImages.push({
        url: result.secure_url,
        publicId: result.public_id,
      });
    }

    return uploadImages;
  }

  public async delete(publicId: string) {
    const result = await cloudinary.uploader.destroy(publicId);

    return result.result === 'ok';
  }
}

export default UploadService;
