import express, { Router } from "express";
import {
  createBillboard,
  deleteBillboard,
  findAllBillboard,
  findBillboardDetail,
  updateBillboard,
} from "../controllers/billboard";
import uploads from "../middlewares/upload";
import { BillboardSchema } from "../models/billboard";
import validate from "../middlewares/validate";

const router: Router = express.Router();

router.post(
  "/uploads",
  [uploads.array("images"), validate(BillboardSchema)],
  createBillboard
);

router.get("/", findAllBillboard);
router.put("/:id", updateBillboard);
router.get("/:id", findBillboardDetail);
router.delete("/:id", deleteBillboard);

export default router;
