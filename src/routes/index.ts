import express, { Router } from "express";
import categoryRoute from "./category";

const router: Router = express.Router();

router.use("/categories", categoryRoute);

export default router;
