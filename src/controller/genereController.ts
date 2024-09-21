import { pool } from "../model/db/connetion";
import { Controller } from "../util/typs";

export const getGenres: Controller = async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM Genres;`);
    res.status(201).send(data.rows);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const getGenre: Controller = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = await pool.query(`SELECT * FROM Genres WHERE Genreid = $1;`, [
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

export const updateGenre: Controller = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = req.body;
    const { title, ReleaseYear, DirectorID } = data;

    const result = await pool.query(
      `UPDATE Genres
    SET name = $1, nationality = $2, dob = $3
    WHERE Genreid = $4 RETURNING *;`,
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

export const deleteGenre: Controller = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = await pool.query(`DELETE FROM Genres WHERE Genreid = $1;`, [
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

export const setGenre: Controller = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    const { genre } = data;

    await pool.query(
      `
        INSERT INTO Genres (Genrename)
        VALUES ($1);
      `,
      [genre]
    );

    res.status(201).send(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};
