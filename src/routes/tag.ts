import express, { Router } from "express";
import validateMiddleware from "../middlewares/validate";
import { TagSchema } from "../models/tag";
import { createTag, deleteTag, detailTag, updateTag } from "../controllers/tag";

const router: Router = express.Router();

router.post("/products/:productId/tag", validateMiddleware(TagSchema), createTag);

router.delete("/products/:productId/tag" , deleteTag)
router.get("/products/:productId/tag" , detailTag)

router.put("/products/:productId/tag", validateMiddleware(TagSchema), updateTag);

export default router;
