import express, { Router } from "express";
import uploads from "../middlewares/upload";
import { BillboardSchema } from "../models/billboard";
import validate from "../middlewares/validate";
import { BillboardController } from "../controllers/billboard";

const router: Router = express.Router();

const controller = new BillboardController();

router.post(
  "/uploads",
  [uploads.array("images"), validate(BillboardSchema)],
  controller.createBillboard
);

router.get("/", controller.findAllBillboard);
router.put("/:id", controller.updateBillboard);
router.get("/:id", controller.findBillboardDetail);
router.delete("/:id", controller.deleteBillboard);

export default router;
