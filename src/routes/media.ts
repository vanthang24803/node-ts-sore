import express, { Router } from "express";

import uploads from "../middlewares/upload";
import {
  createImages,
  deletedImages,
  findAllImages,
} from "../controllers/media";

const router: Router = express.Router();

router.post(
  "/products/:productId/media",
  [uploads.array("images")],
  createImages
);
router.delete("/products/:productId/media", deletedImages);
router.get("/products/:productId/media", findAllImages);

export default router;
