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

  search(query: string | undefined): Promise<unknown>;

  findAllProductAsync(
    limit: string | number | undefined,
    page: string | number | undefined
  ): Promise<unknown>;
}

export default IProductService;
