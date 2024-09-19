import { pool } from "../model/db/connetion.js";

export const getActors = async (req, res) => {
  const data = await pool.query(`SELECT * FROM actors;`);
  res.status(201).send(data.rows);
};

export const getActor = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = await pool.query(`SELECT * FROM actors WHERE actorid = $1;`, [ID]);
    res.status(201).send(data.rows);
  } catch (error) {
    console.log(error.message);
  }
};

export const updateActor = async (req, res) => {
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
    console.log(error.message);
  }
};

export const deleteActor = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = await pool.query(`DELETE FROM actors WHERE actorid = $1;`, [ID]);
    res.status(201).send(data.rows);
  } catch (error) {
    console.log(error.message);
  }
};

export const setActor = async (req, res) => {
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
    console.log(error.message);
  }
};
