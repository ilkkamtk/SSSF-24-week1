import CustomError from '../../classes/CustomError';
import promisePool from '../../database/db';
import {Category} from '../../types/DBTypes';
import {RowDataPacket} from 'mysql2';

const getAllCategories = async () => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Category[]>(
    'SELECT * FROM categories'
  );
  if (!rows) {
    throw new Error('No categories found');
  }
  return rows as Category[];
};

const getCategoryById = async (id: number) => {
  const sql = promisePool.format(
    'SELECT * FROM categories WHERE category_id = ?',
    [id]
  );
  console.log(sql);
  const [rows] = await promisePool.execute<RowDataPacket[] & Category[]>(sql);
  if (rows.length === 0) {
    throw new CustomError('No categories found', 404);
  }
  return rows[0];
};

export {getAllCategories, getCategoryById};
