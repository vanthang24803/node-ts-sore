import { Color } from "../models/color";

export default interface IColorService {
  create: (planterId: string, data: Color) => Promise<unknown>;
  delete: (planterId: string, id: string) => Promise<unknown>;
  findAll: (planterId: string) => Promise<unknown>;
  findById: (planterId: string, id: string) => Promise<unknown>;
  update: (planterId: string, id: string, data: Color) => Promise<unknown>;
}
