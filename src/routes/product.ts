import express, { Router } from 'express';
import uploads from '../middlewares/upload';
import validateMiddleware from '../middlewares/validate';
import { UpdateProductSchema } from '../models/product';
import { ProductController } from '../controllers/product';

const router: Router = express.Router();
const controller = new ProductController();

router.get('/search', controller.searchProduct);
router.post('/', [uploads.array('images')], controller.createProduct);

router.get('/', controller.findAllProduct);
router.get('/:id', controller.findDetailProduct);
router.put(
  '/:id',
  validateMiddleware(UpdateProductSchema),
  controller.updateProduct
);
router.delete('/:id', controller.deleteProduct);

export default router;
