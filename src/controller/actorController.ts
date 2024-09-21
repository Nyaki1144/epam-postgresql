import { pool } from "../model/db/connetion";
import { Controller } from "../util/typs";

export const getActors: Controller = async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM actors;`);
    res.status(201).send(data.rows);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const getActor: Controller = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = await pool.query(`SELECT * FROM actors WHERE actorid = $1;`, [
      ID,
    ]);
    res.status(201).json({ message: data.rows });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const updateActor: Controller = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = req.body;
    const { name, nationality, DOB } = data;

    const result = await pool.query(
      `UPDATE actors
    SET name = $1, nationality = $2, dob = $3
    WHERE actorid = $4 RETURNING *;`,
      [name, nationality, DOB, ID]
    );
    res.status(201).send(result.rows);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const deleteActor: Controller = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = await pool.query(`DELETE FROM actors WHERE actorid = $1;`, [
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

export const setActor: Controller = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    const { name, nationality, DOB } = data;

    await pool.query(
      `
        INSERT INTO actors (Name, Nationality, DOB)
        VALUES ($1, $2, $3);
      `,
      [name, nationality, DOB]
    );

    res.status(201).send(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};
