import e, {Request, Response, NextFunction} from 'express';
import {Animal} from '../../types/DBTypes';
import {getAllAnimals} from '../models/animalModel';

const animalListGet = async (
  req: Request,
  res: Response<Animal[]>,
  next: NextFunction
) => {
  try {
    const animals = await getAllAnimals();
    res.json(animals);
  } catch (error) {
    next(error);
  }
};

export {animalListGet};
