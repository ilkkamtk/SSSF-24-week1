import express from 'express';
import {speciesListGet} from '../controllers/speciesController';

const router = express.Router();

router.route('/').get(speciesListGet);

// router.route('/:id').get(speciesGet);

export default router;
