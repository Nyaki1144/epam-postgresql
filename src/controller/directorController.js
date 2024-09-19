import { pool } from "../model/db/connetion.js";

export const getDirectors = async (req, res) => {
  const data = await pool.query(`SELECT * FROM Directors;`);
  res.status(201).send(data.rows);
};

export const getDirector = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = await pool.query(`SELECT * FROM Directors WHERE Directorid = $1;`, [ID]);
    res.status(201).send(data.rows);
  } catch (error) {
    console.log(error.message);
  }
};

export const updateDirector = async (req, res) => {
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
    console.log(error.message);
  }
};

export const deleteDirector = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = await pool.query(`DELETE FROM Directors WHERE Directorid = $1;`, [ID]);
    res.status(201).send(data.rows);
  } catch (error) {
    console.log(error.message);
  }
};

export const setDirector = async (req, res) => {
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
    console.log(error.message);
  }
};
