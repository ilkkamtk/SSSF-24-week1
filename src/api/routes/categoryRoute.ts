import express from 'express';
import {
  categoryGet,
  categoryListGet,
  categoryPost,
} from '../controllers/categoryController';

const router = express.Router();

router.route('/').get(categoryListGet).post(categoryPost);

router.route('/:id').get(categoryGet);

export default router;
