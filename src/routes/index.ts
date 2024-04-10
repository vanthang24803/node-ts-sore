import express, { Router } from "express";
import categoryRoute from "./category";
import billboardRoute from "./billboard";
import productRoute from "./product";
import optionRoute from "./option";
import planterRoute from "./planter";
import colorRouter from "./colors";
import tagRouter from "./tag";
import mediaRouter from "./media";

const router: Router = express.Router();

router.use("/categories", categoryRoute);
router.use("/billboards", billboardRoute);
router.use("/products", productRoute);
router.use(optionRoute);
router.use(planterRoute);
router.use(colorRouter);
router.use(tagRouter);
router.use(mediaRouter);

export default router;
