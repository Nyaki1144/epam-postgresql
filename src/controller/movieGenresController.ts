import { pool } from "../model/db/connetion";
import { Controller } from "../util/typs";

export const getMovieGenres: Controller = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = await pool.query(
      `SELECT * FROM Ratings WHERE Ratingid = $1;`,
      [ID]
    );
    res.status(201).send(data.rows);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const deleteMovieGenres: Controller = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = await pool.query(`DELETE FROM Ratings WHERE Ratingid = $1;`, [
      ID,
    ]);
    res.status(201).send(data.rows);
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

    res.status(201).send(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};
