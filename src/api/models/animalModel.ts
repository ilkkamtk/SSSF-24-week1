import promisePool from '../../database/db';
import {Animal} from '../../types/DBTypes';
import {RowDataPacket} from 'mysql2';

const getAllAnimals = async (): Promise<Animal[]> => {
  const sql = promisePool.format('SELECT * FROM animals;');
  const [rows] = await promisePool.execute<Animal[] & RowDataPacket[]>(sql);
  console.log(rows);
  return rows;
};

export {getAllAnimals};
