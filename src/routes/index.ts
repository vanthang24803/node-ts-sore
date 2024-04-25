import express, { Router } from "express";
import categoryRoute from "./category";
import billboardRoute from "./billboard";
import productRoute from "./product";
import optionRoute from "./option";
import planterRoute from "./planter";
import colorRouter from "./colors";
import tagRouter from "./tag";
import mediaRouter from "./media";
import authRouter from "./auth";

const router: Router = express.Router();

router.use("/auth", authRouter);
router.use("/categories", categoryRoute);
router.use("/billboards", billboardRoute);
router.use("/products", productRoute);
router.use([optionRoute, planterRoute, colorRouter, tagRouter, mediaRouter]);

export default router;
