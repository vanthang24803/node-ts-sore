interface ICategoryService {
  createCategory: (name: string) => Promise<unknown>;
  findAllCategory: () => Promise<unknown>;
  isExist: (id: string) => Promise<boolean>;
  updateCategory: (id: string, name: string) => Promise<unknown>;
  deleteCategory: (id: string) => Promise<void>;
}

export default ICategoryService;
