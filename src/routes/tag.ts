import express, { Router } from 'express';
import validateMiddleware from '../middlewares/validate';
import { TagSchema } from '../models/tag';
import { TagController } from '../controllers/tag';

const router: Router = express.Router();
const controller = new TagController();

router.post(
  '/products/:productId/tag',
  validateMiddleware(TagSchema),
  controller.createTag
);

router.delete('/products/:productId/tag', controller.deleteTag);
router.get('/products/:productId/tag', controller.detailTag);

router.put(
  '/products/:productId/tag',
  validateMiddleware(TagSchema),
  controller.updateTag
);

export default router;
