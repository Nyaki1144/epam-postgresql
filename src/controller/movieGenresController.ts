import { pool } from "../model/db/connetion";
import { Controller } from "../util/typs";

export const deleteMovieGenres: Controller = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = await pool.query(
      `DELETE FROM moviegenres WHERE movieid = $1;`,
      [ID]
    );
    res.status(200).json(data.rows);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const setMovieGenres: Controller = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    const { genreid, movieid } = data;

    await pool.query(
      `
        INSERT INTO moviegenres (genreid, movieid)
        VALUES ($1, $2);
      `,
      [genreid, movieid]
    );

    res.status(201).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};
