export default interface IPlanterService {
  create: (optionId: string, name: string) => Promise<unknown>;
  isExist: (optionId: string, id: string) => Promise<boolean>;
  update: (optionId: string, id: string, name: string) => Promise<unknown>;
  delete: (optionId: string, id: string) => Promise<void>;
  findById: (id: string) => Promise<unknown>;
  findAll: (optionId: string) => Promise<unknown>;
}
