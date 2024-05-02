import express, { Router } from 'express';

import uploads from '../middlewares/upload';
import { MediaController } from '../controllers/media';

const router: Router = express.Router();
const controller = new MediaController();

router.post(
  '/products/:productId/media',
  [uploads.array('images')],
  controller.createImages
);
router.delete('/products/:productId/media', controller.deletedImages);
router.get('/products/:productId/media', controller.findAllImages);

export default router;
