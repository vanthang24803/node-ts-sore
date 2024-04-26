import express, { Router } from "express";
import validateMiddleware from "../middlewares/validate";
import { PlanterSchema } from "../models/planter";
import { PlanterController } from "../controllers/planter";

const router: Router = express.Router();

const controller = new PlanterController();

router.post(
  "/products/:productId/options/:id/planter",
  validateMiddleware(PlanterSchema),
  controller.createPlanter
);
router.get(
  "/products/:productId/options/:optionId/planter",
  controller.findPlanters
);
router.put(
  "/products/:productId/options/:optionId/planter",
  validateMiddleware(PlanterSchema),
  controller.updatePlanter
);
router.delete(
  "/products/:productId/options/:optionId/planter",
  controller.deletePlanter
);

export default router;
