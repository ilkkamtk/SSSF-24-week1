import CustomError from '../../classes/CustomError';
import promisePool from '../../database/db';
import {Species} from '../../types/DBTypes';
import {ResultSetHeader, RowDataPacket} from 'mysql2';

const getAllSpecies = async (): Promise<Species[]> => {
  const sql = promisePool.format('SELECT * FROM species;');
  const [rows] = await promisePool.execute<Species[] & RowDataPacket[]>(sql);
  console.log(rows);
  return rows;
};

const getSpeciesById = async (id: number) => {
  const sql = promisePool.format('SELECT * FROM species WHERE species_id = ?', [
    id,
  ]);
  console.log(sql);
  const [rows] = await promisePool.execute<RowDataPacket[] & Species[]>(sql);
  if (rows.length === 0) {
    throw new CustomError('No species found', 404);
  }
  return rows[0];
};

const postSpecies = async (species: Omit<Species, 'species_id'>) => {
  const sql = promisePool.format(
    'INSERT INTO species (species_name, category, image) VALUES (?, ?, ?);',
    [species.species_name, species.category, species.image]
  );
  const [headers] = await promisePool.execute<ResultSetHeader>(sql);
  if (headers.affectedRows === 0) {
    throw new CustomError('Species not added', 400);
  }
  return {message: 'Species added'};
};

const putSpecies = async (id: number, species: Omit<Species, 'species_id'>) => {
  const sql = promisePool.format(
    'UPDATE species SET species_name = ?, category = ?, image = ? WHERE species_id = ?;',
    [species.species_name, species.category, species.image, id]
  );
  const [headers] = await promisePool.execute<ResultSetHeader>(sql);
  if (headers.affectedRows === 0) {
    throw new CustomError('Species not updated', 400);
  }
  return {message: 'Species updated'};
};

const deleteSpecies = async (id: number) => {
  const sql = promisePool.format('DELETE FROM species WHERE species_id = ?', [
    id,
  ]);
  const [headers] = await promisePool.execute<ResultSetHeader>(sql);
  if (headers.affectedRows === 0) {
    throw new CustomError('Species not deleted', 400);
  }
  return {message: 'Species deleted'};
};

export {getAllSpecies, getSpeciesById, postSpecies, putSpecies, deleteSpecies};
