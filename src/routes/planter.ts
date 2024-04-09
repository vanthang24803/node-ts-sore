import express, { Router } from "express";
import validateMiddleware from "../middlewares/validate";
import { PlanterSchema } from "../models/planter";
import { createPlanter, deletePlanter, findPlanters, updatePlanter } from "../controllers/planter";


const router: Router = express.Router();

router.post("/:productId/options/:id/planter", validateMiddleware(PlanterSchema), createPlanter);
router.get("/:productId/options/:optionId/planter", findPlanters);
router.put("/:productId/options/:optionId/planter", validateMiddleware(PlanterSchema), updatePlanter);
router.delete("/:productId/options/:optionId/planter",deletePlanter);


export default router;
