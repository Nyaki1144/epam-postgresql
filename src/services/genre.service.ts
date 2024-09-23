import { pool } from "../model/db/connetion";
import { rating } from "../util/typs";

export async function createGenreTable() {
  const Genres = `
                  CREATE TABLE IF NOT EXISTS Genres (
                    GenreID SERIAL PRIMARY KEY,
                    GenreName VARCHAR(50) not NULL
                  );
                `;

  await pool.query(Genres);
}

export async function getGenresService() {
  const data = await pool.query(`SELECT * FROM Genres;`);
  return data.rows;
}

export async function getGenreService(ID: string) {
  const data = await pool.query(`SELECT * FROM Genres WHERE Genreid = $1;`, [
    ID,
  ]);

  return data.rows;
}

export async function updateGenreService(
  ID: string,
  data: { genrename: string }
) {
  const { genrename } = data;

  const result = await pool.query(
    `UPDATE Genres
      SET genrename = $1
      WHERE Genreid = $2 RETURNING *;`,
    [genrename, ID]
  );

  return result.rows;
}

export async function deleteGenreService(ID: string) {
  const data = await pool.query(`DELETE FROM Genres WHERE Genreid = $1`, [ID]);
  return data.rows;
}

export async function setGenreService(data: { genre: string }) {
  const { genre } = data;

  const result = await pool.query(
    `
      INSERT INTO Genres (Genrename)
      VALUES ($1);
    `,
    [genre]
  );

  return result.rows;
}
