import { pool } from "../model/db/connetion";
import { actors } from "../util/typs";

export async function createActorsTable() {
  const Actor = `
                CREATE TABLE IF NOT EXISTS Actors (
                  ActorID SERIAL PRIMARY KEY,
                  Name VARCHAR(50) not NULL,
                  Nationality VARCHAR(50) not NULL,
                  DOB date
                );
              `;
  await pool.query(Actor);
}

export async function getActorsService() {
  const data = await pool.query(`SELECT * FROM Actor;`);
  return data.rows;
}

export async function getActorService(ID: string) {
  const data = await pool.query(`SELECT * FROM Actor WHERE actorid = $1;`, [
    ID,
  ]);

  return data.rows;
}

export async function updateActorService(ID: string, data: actors) {
  const { name, nationality, DOB } = data;

  const result = await pool.query(
    `UPDATE actors
  SET name = $1, nationality = $2, dob = $3
  WHERE actorid = $4 RETURNING *;`,
    [name, nationality, DOB, ID]
  );

  return result.rows;
}

export async function deleteActorService(ID: string) {
  const data = await pool.query(`DELETE FROM actors WHERE actorid = $1;`, [ID]);
  return data.rows;
}

export async function setActorService(data: actors) {
  const { name, nationality, DOB } = data;

  const result = await pool.query(
    `
      INSERT INTO actors (Name, Nationality, DOB)
      VALUES ($1, $2, $3);
    `,
    [name, nationality, DOB]
  );
  return result.rows;
}
