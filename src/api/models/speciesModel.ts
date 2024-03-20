import promisePool from '../../database/db';
import {Category, Species} from '../../types/DBTypes';
import {RowDataPacket} from 'mysql2';

type TempSpecies = Omit<Species, 'category'> & {category: Category | string};

const getAllSpecies = async (): Promise<TempSpecies[]> => {
  const sql = promisePool.format(`
    SELECT species_id, species_name, image,
    JSON_OBJECT('category_id', categories.category_id, 'category_name', categories.category_name) AS category
    FROM species
    JOIN categories ON species.category = categories.category_id;
  `);
  const [rows] = await promisePool.execute<TempSpecies[] & RowDataPacket[]>(
    sql
  );
  console.log(rows);
  const species: TempSpecies[] = rows.map((row) => {
    return {...row, category: JSON.parse(row.category as string)};
  });

  return species;
};

export {getAllSpecies};
