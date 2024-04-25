import { Billboard } from "../models/billboard";

interface IBillboardService {
  createBillboardAsync: (
    images: Express.Multer.File[] | undefined,
    data: Billboard
  ) => Promise<unknown>;

  findAllBillboardAsync: () => Promise<unknown>;
  isBillboardExistAsync: (id: string) => Promise<boolean>;
  findBillboardDetailAsync: (id: string) => Promise<unknown>;
  updateBillboardAsync: (id: string, data: Billboard) => Promise<unknown>;

  deleteBillboardAsync: (id: string) => Promise<void>;
}

export default IBillboardService;
