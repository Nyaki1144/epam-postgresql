import { pool } from "../model/db/connetion";
import { Controller } from "../util/typs";

export const getRatings: Controller = async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM Ratings;`);
    res.status(201).json(data.rows);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const getRating: Controller = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = await pool.query(`SELECT * FROM Ratings WHERE movieid = $1;`, [
      ID,
    ]);
    res.status(201).json(data.rows);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const updateRating: Controller = async (req, res) => {
  try {
    const movieid = req.params.id;
    const data = req.body;
    const { rating } = data;

    const result = await pool.query(
      `UPDATE Ratings
    SET rating = $1
    WHERE movieid = $2 RETURNING *;`,
      [rating, movieid]
    );
    res.status(201).json(result.rows);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const deleteRating: Controller = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = await pool.query(`DELETE FROM Ratings WHERE movieid = $1;`, [
      ID,
    ]);
    res.status(201).json(data.rows);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const setRating: Controller = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    const { rating, movieid } = data;

    await pool.query(
      `
        INSERT INTO ratings (rating, movieid)
        VALUES ($1, $2);
      `,
      [rating, movieid]
    );

    res.status(201).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};
