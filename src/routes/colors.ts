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
  "/products/:productId/options/:optionId/color",
  validateMiddleware(ColorSchema),
  createColor
);
router.get("/products/:productId/options/:optionId/color", findColor);
router.put(
  "/products/:productId/options/:optionId/color",
  validateMiddleware(ColorSchema),
  updateColor
);
router.delete("/products/:productId/options/:optionId/color", deleteColor);

export default router;
