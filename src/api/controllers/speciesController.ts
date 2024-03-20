import {Request, Response, NextFunction} from 'express';
import {Species} from '../../types/DBTypes';
import {getAllSpecies} from '../models/speciesModel';

const speciesListGet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const species = await getAllSpecies();
    res.json(species);
  } catch (error) {
    next(error);
  }
};

export {speciesListGet};
