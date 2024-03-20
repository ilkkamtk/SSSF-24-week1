import express from 'express';
import {animalListGet} from '../controllers/animalController';

const router = express.Router();

router.route('/').get(animalListGet);

export default router;
