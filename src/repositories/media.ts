export default interface IMediaService {
  create: (
    productId: string,
    images: Express.Multer.File[] | undefined
  ) => Promise<unknown>;
  delete: (id: string) => Promise<unknown>;
  findAll: (productId: string) => Promise<unknown>;
}
