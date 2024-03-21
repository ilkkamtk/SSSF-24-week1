import express from 'express';
import {
  categoryGet,
  categoryListGet,
  categoryPost,
} from '../controllers/categoryController';
import {body} from 'express-validator';

const router = express.Router();

router
  .route('/')
  .get(categoryListGet)
  .post(body('category_name').notEmpty().isString().escape(), categoryPost);

router.route('/:id').get(categoryGet);

export default router;
