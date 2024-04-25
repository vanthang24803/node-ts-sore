export default interface ITagService {
  create: (productId: string, name: string) => Promise<unknown>;
  isExist: (productId: string, id: string) => Promise<boolean>;
  update: (productId: string, id: string, name: string) => Promise<unknown>;
  delete: (productId: string, id: string) => Promise<void>;
  findById: (id: string) => Promise<unknown>;
}
