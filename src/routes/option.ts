import express, { Router } from 'express';
import validateMiddleware from '../middlewares/validate';
import { OptionSchema } from '../models/option';
import { OptionController } from '../controllers/option';

const router: Router = express.Router();
const controller = new OptionController();

router.post(
  '/products/:id/options',
  validateMiddleware(OptionSchema),
  controller.createOption
);
router.put(
  '/:productId/options/:id',
  validateMiddleware(OptionSchema),
  controller.updateOption
);
router.get('/products/:id/options', controller.findAllOption);
router.get('/products/:productId/options/:id', controller.findDetailOption);
router.delete('/products/:productId/options/:id', controller.deleteOption);

export default router;
