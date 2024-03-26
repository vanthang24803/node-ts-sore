import express, { Router } from "express";
import categoryRoute from "./category";
import billboardRoute from "./billboard";

const router: Router = express.Router();

router.use("/categories", categoryRoute);
router.use("/billboards", billboardRoute);

export default router;
