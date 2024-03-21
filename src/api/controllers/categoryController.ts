import {Request, Response, NextFunction} from 'express';
import {
  getAllCategories,
  getCategoryById,
  postCategory,
} from '../models/categoryModel';
import {Category} from '../../types/DBTypes';
import {MessageResponse} from '../../types/MessageTypes';
import {validationResult} from 'express-validator';
import CustomError from '../../classes/CustomError';

const categoryListGet = async (
  req: Request,
  res: Response<Category[]>,
  next: NextFunction
) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

const categoryGet = async (
  req: Request<{id: string}, {}, {}>,
  res: Response<Category>,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const category = await getCategoryById(id);
    res.json(category);
  } catch (error) {
    next(error);
  }
};

const categoryPost = async (
  req: Request<{}, {}, Pick<Category, 'category_name'>>,
  res: Response<MessageResponse>,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages: string = errors
      .array()
      .map((error) => `${error.msg}: ${error.param}`)
      .join(', ');
    console.log('category_post validation', messages);
    next(new CustomError(messages, 400));
    return;
  }

  try {
    const result = await postCategory(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export {categoryListGet, categoryGet, categoryPost};
