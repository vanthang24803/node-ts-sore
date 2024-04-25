import { Product, UpdateProduct } from "../models/product";

interface IProductService {
  createProductAsync(
    images: Express.Multer.File[] | undefined,
    data: Product
  ): Promise<unknown>;

  isProductExist(id: string): Promise<boolean>;

  findDetailProductAsync(id: string): Promise<unknown>;

  updateProductAsync(id: string, data: UpdateProduct): Promise<unknown>;

  deleteProductAsync(id: string): Promise<void>;
}

export default IProductService;
