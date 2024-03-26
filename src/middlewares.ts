import {NextFunction, Request, Response} from 'express';

import CustomError from './classes/CustomError';
import {ErrorResponse} from './types/MessageTypes';
import {validationResult} from 'express-validator';
import {Species} from './types/DBTypes';
import fetchData from './lib/fetchData';

const notFound = (req: Request, _res: Response, next: NextFunction) => {
  const error = new CustomError(`🔍 - Not Found - ${req.originalUrl}`, 404);
  next(error);
};

const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response<ErrorResponse>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  // console.log(err);
  const statusCode = err.status !== 200 ? err.status || 500 : 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

const validationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages: string = errors
      .array()
      .map((error) => `${error.msg}: ${error.param}`)
      .join(', ');
    console.log('validation errors:', messages);
    next(new CustomError(messages, 400));
    return;
  }
  next();
};

const imageFromWikipedia = async (
  req: Request<{}, {}, Omit<Species, 'species_id'>>,
  res: Response,
  next: NextFunction
) => {
  try {
    const name = req.body.species_name;
    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=${name}&pithumbsize=640&formatversion=2`;
    const imageData = await fetchData(url);
    res.json(imageData);
  } catch (error) {
    next(error);
  }
};

export {notFound, errorHandler, validationErrors, imageFromWikipedia};
