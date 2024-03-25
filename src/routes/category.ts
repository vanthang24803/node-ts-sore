import express, { Router } from "express";
import validate from "../middlewares/validate";
import { CategorySchema } from "../models/category";
import {
  createAsync,
  deleteAsync,
  findAllAsync,
  updateAsync,
} from "../controllers/category";

const router: Router = express.Router();

router.post("/", validate(CategorySchema), createAsync);
router.get("/", findAllAsync);
router.put("/:id", validate(CategorySchema), updateAsync);
router.delete("/:id", deleteAsync);

export default router;
