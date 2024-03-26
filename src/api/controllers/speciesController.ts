import {Request, Response, NextFunction} from 'express';
import {Species} from '../../types/DBTypes';
import {
  deleteSpecies,
  getAllSpecies,
  getSpeciesById,
  postSpecies,
  putSpecies,
} from '../models/speciesModel';
import {MessageResponse} from '../../types/MessageTypes';

const speciesListGet = async (
  req: Request,
  res: Response<Species[]>,
  next: NextFunction
) => {
  try {
    const species = await getAllSpecies();
    res.json(species);
  } catch (error) {
    next(error);
  }
};

const speciesGet = async (
  req: Request<{id: string}, {}, {}>,
  res: Response<Species>,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const category = await getSpeciesById(id);
    res.json(category);
  } catch (error) {
    next(error);
  }
};

const speciesPost = async (
  req: Request<{}, {}, Omit<Species, 'species_id'>>,
  res: Response<MessageResponse>,
  next: NextFunction
) => {
  try {
    const result = await postSpecies(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const speciesPut = async (
  req: Request<{id: string}, {}, Omit<Species, 'species_id'>>,
  res: Response<MessageResponse>,
  next: NextFunction
) => {
  try {
    const result = await putSpecies(Number(req.params.id), req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const speciesDelete = async (
  req: Request<{id: string}, {}, {}>,
  res: Response<MessageResponse>,
  next: NextFunction
) => {
  try {
    const result = await deleteSpecies(Number(req.params.id));
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export {speciesListGet, speciesGet, speciesPost, speciesPut, speciesDelete};
