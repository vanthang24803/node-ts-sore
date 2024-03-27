import express, { Router } from "express";
import categoryRoute from "./category";
import billboardRoute from "./billboard";
import productRoute from "./product";

const router: Router = express.Router();

router.use("/categories", categoryRoute);
router.use("/billboards", billboardRoute);
router.use("/products", productRoute);

export default router;
