import express, { Router } from 'express';
import validate from '../middlewares/validate';
import { CategorySchema } from '../models/category';
import { CategoryController } from '../controllers/category';

const router: Router = express.Router();

const controller = new CategoryController();

router.post('/', validate(CategorySchema), controller.createAsync);
router.get('/', controller.findAllAsync);
router.put('/:id', validate(CategorySchema), controller.updateAsync);
router.delete('/:id', controller.deleteAsync);

export default router;
