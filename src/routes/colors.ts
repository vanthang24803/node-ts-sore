import express, { Router } from "express";
import validateMiddleware from "../middlewares/validate";
import { ColorSchema } from "../models/color";
import {
  createColor,
  deleteColor,
  findColor,
  updateColor,
} from "../controllers/color";

const router: Router = express.Router();

router.post(
  "/:productId/options/:optionId/color",
  validateMiddleware(ColorSchema),
  createColor
);
router.get("/:productId/options/:optionId/color", findColor);
router.put(
  "/:productId/options/:optionId/color",
  validateMiddleware(ColorSchema),
  updateColor
);
router.delete("/:productId/options/:optionId/color", deleteColor);

export default router;
