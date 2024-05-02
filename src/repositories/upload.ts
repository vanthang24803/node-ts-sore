interface IUploadService {
  upload: (files: Express.Multer.File[] | undefined) => Promise<unknown>;

  delete: (publicId: string) => Promise<boolean>;
}

export default IUploadService;
