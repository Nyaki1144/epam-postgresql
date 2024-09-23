import { pool } from "../model/db/connetion";
import { directors } from "../util/typs";

export async function createDirectorsTable() {
  const Directors = `
                    CREATE TABLE IF NOT EXISTS Directors (
                      DirectorID SERIAL PRIMARY KEY,
                      Name VARCHAR(50) not NULL,
                      Nationality VARCHAR(50) not NULL,
                      DOB date
                    );
                  `;
  await pool.query(Directors);
}

export async function getDirectorsService() {
  const data = await pool.query(`SELECT * FROM Directors;`);
  return data.rows;
}

export async function getDirectorService(ID: string) {
  const data = await pool.query(
    `SELECT * FROM Directors WHERE Directorid = $1;`,
    [ID]
  );

  return data.rows;
}

export async function updateDirectorService(ID: string, data: directors) {
  const { name, nationality, DOB } = data;

  const result = await pool.query(
    `UPDATE Directors
      SET name = $1, nationality = $2, dob = $3
      WHERE Directorid = $4 RETURNING *;`,
    [name, nationality, DOB, ID]
  );

  return result.rows;
}

export async function deleteDirectorService(ID: string) {
  const data = await pool.query(
    `DELETE FROM Directors WHERE Directorid = $1;`,
    [ID]
  );
  return data.rows;
}

export async function setDirectorService(data: directors) {
  const { name, nationality, DOB } = data;

  const result = await pool.query(
    `
      INSERT INTO Directors (Name, Nationality, DOB)
      VALUES ($1, $2, $3);
    `,
    [name, nationality, DOB]
  );
  return result.rows;
}
