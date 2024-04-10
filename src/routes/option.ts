import express, { Router } from "express";
import validateMiddleware from "../middlewares/validate";
import { OptionSchema } from "../models/option";
import {
  createOption,
  deleteOption,
  findAllOption,
  findDetailOption,
  updateOption,
} from "../controllers/option";

const router: Router = express.Router();

router.post("/products/:id/options", validateMiddleware(OptionSchema), createOption);
router.put(
  "/:productId/options/:id",
  validateMiddleware(OptionSchema),
  updateOption
);
router.get("/products/:id/options", findAllOption);
router.get("/products/:productId/options/:id", findDetailOption);
router.delete("/products/:productId/options/:id", deleteOption);

export default router;
