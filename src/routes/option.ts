import express, { Router } from "express";
import validateMiddleware from "../middlewares/validate";
import { OptionSchema } from "../models/option";
import {
  createOption,
  deleteOption,
  findAllOption,
  updateOption,
} from "../controllers/option";

const router: Router = express.Router();

router.post("/:id/options", validateMiddleware(OptionSchema), createOption);
router.put(
  "/:productId/options/:id",
  validateMiddleware(OptionSchema),
  updateOption
);
router.get("/:id/options", findAllOption);
router.delete("/:productId/options/:id", deleteOption);

export default router;