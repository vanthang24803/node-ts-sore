import express, { Router } from "express";
import uploads from "../middlewares/upload";
import {
  createProduct,
  deleteProduct,
  findAllProduct,
  findDetailProduct,
  updateProduct,
} from "../controllers/product";
import validateMiddleware from "../middlewares/validate";
import { UpdateProductSchema } from "../models/product";

const router: Router = express.Router();

router.post("/", [uploads.array("images")], createProduct);

router.get("/", findAllProduct);
router.get("/:id", findDetailProduct);
router.put("/:id", validateMiddleware(UpdateProductSchema), updateProduct);
router.delete("/:id" , deleteProduct);


export default router;
