import express, { Router } from "express";
import validateMiddleware from "../middlewares/validate";
import { PlanterSchema } from "../models/planter";
import { createPlanter, deletePlanter, findPlanters, updatePlanter } from "../controllers/planter";


const router: Router = express.Router();

router.post("/products/:productId/options/:id/planter", validateMiddleware(PlanterSchema), createPlanter);
router.get("/products/:productId/options/:optionId/planter", findPlanters);
router.put("/products/:productId/options/:optionId/planter", validateMiddleware(PlanterSchema), updatePlanter);
router.delete("/products/:productId/options/:optionId/planter",deletePlanter);


export default router;
