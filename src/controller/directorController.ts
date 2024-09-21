import { pool } from "../model/db/connetion";
import { Controller } from "../util/typs";

export const getDirectors: Controller = async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM Directors;`);
    res.status(201).send(data.rows);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const getDirector: Controller = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = await pool.query(
      `SELECT * FROM Directors WHERE Directorid = $1;`,
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

export const updateDirector: Controller = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = req.body;
    const { name, nationality, DOB } = data;

    const result = await pool.query(
      `UPDATE Directors
    SET name = $1, nationality = $2, dob = $3
    WHERE Directorid = $4 RETURNING *;`,
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

export const deleteDirector: Controller = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = await pool.query(
      `DELETE FROM Directors WHERE Directorid = $1;`,
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

export const setDirector: Controller = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    const { name, nationality, DOB } = data;

    await pool.query(
      `
        INSERT INTO Directors (Name, Nationality, DOB)
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
