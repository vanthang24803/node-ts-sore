import { Option } from "../models/option";

export default interface IOptionService {
  create: (productId: string, data: Option) => Promise<unknown>;
  update: (productId: string, id: string, data: Option) => Promise<unknown>;
  isExist: (productId: string, id: string) => Promise<boolean>;
  findAll: (productId: string) => Promise<unknown>;
  findById: (productId: string, id: string) => Promise<unknown>;
  delete: (productId: string, id: string) => Promise<unknown>;
}
