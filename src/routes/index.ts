import express, { Router } from "express";
import categoryRoute from "./category";
import billboardRoute from "./billboard";
import productRoute from "./product";
import optionRoute from './option'
import planterRoute from './planter'

const router: Router = express.Router();

router.use("/categories", categoryRoute);
router.use("/billboards", billboardRoute);
router.use("/products", productRoute);
router.use("/products" , optionRoute)
router.use("/products" , planterRoute)

export default router;
