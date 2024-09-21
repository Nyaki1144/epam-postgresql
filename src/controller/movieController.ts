import { pool } from "../model/db/connetion";
import { Controller } from "../util/typs";

export const getMovies: Controller = async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM Movies;`);
    res.status(201).send(data.rows);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const getMovie: Controller = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = await pool.query(`SELECT * FROM Movies WHERE Movieid = $1;`, [
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

export const updateMovie: Controller = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = req.body;
    const { title, ReleaseYear, DirectorID } = data;

    const result = await pool.query(
      `UPDATE Movies
    SET name = $1, nationality = $2, dob = $3
    WHERE Movieid = $4 RETURNING *;`,
      [title, ReleaseYear, DirectorID, ID]
    );
    res.status(201).send(result.rows);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const deleteMovie: Controller = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = await pool.query(`DELETE FROM Movies WHERE Movieid = $1;`, [
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

export const setMovie: Controller = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    const { title, ReleaseYear, DirectorID } = data;

    await pool.query(
      `
        INSERT INTO Movies (Title, ReleaseYear, DirectorID)
        VALUES ($1, $2, $3);
      `,
      [title, ReleaseYear, DirectorID]
    );

    res.status(201).send(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};
