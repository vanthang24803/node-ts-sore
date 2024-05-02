import express, { Router } from 'express';
import validateMiddleware from '../middlewares/validate';
import { ColorSchema } from '../models/color';
import { ColorController } from '../controllers/color';

const router: Router = express.Router();

const controller = new ColorController();

router.post(
  '/products/:productId/options/:optionId/color',
  validateMiddleware(ColorSchema),
  controller.createColor
);
router.get(
  '/products/:productId/options/:optionId/color',
  controller.findColor
);
router.put(
  '/products/:productId/options/:optionId/color',
  validateMiddleware(ColorSchema),
  controller.updateColor
);
router.delete(
  '/products/:productId/options/:optionId/color',
  controller.deleteColor
);

export default router;
