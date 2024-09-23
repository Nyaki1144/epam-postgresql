import { pool } from "../model/db/connetion";
import { directors, movie } from "../util/typs";

export async function createMoviesTable() {
  const Movies = `
                CREATE TABLE IF NOT EXISTS Movies (
                  MovieID SERIAL PRIMARY KEY,
                  Title VARCHAR(100) not NULL,
                  ReleaseYear INT not NULL, 
                  DirectorID INT,
                  FOREIGN KEY (DirectorID) REFERENCES Directors (DirectorID)
                  ON DELETE CASCADE
                  ON UPDATE CASCADE
                );
              `;
  await pool.query(Movies);
}

export async function getMoviesService() {
  const data = await pool.query(`SELECT * FROM Movies;`);
  return data.rows;
}

export async function getMovieService(ID: string) {
  const data = await pool.query(`SELECT * FROM Movies WHERE Movieid = $1;`, [
    ID,
  ]);
  return data.rows;
}

export async function updateMovieService(data: movie, ID: string) {
  const { title, releaseYear, directorid } = data;

  const result = await pool.query(
    `UPDATE Movies
    SET title = $1, ReleaseYear = $2, DirectorID = $3
    WHERE Movieid = $4 RETURNING *;`,
    [title, releaseYear, directorid, ID]
  );

  return result.rows;
}

export async function deleteMovieService(ID: string) {
  const data = await pool.query(`DELETE FROM Movies WHERE Movieid = $1;`, [ID]);
  return data.rows;
}

export async function setMovieService(data: movie) {
  const { title, releaseYear, directorid } = data;

  await pool.query(
    `
      INSERT INTO Movies (Title, ReleaseYear, DirectorID)
      VALUES ($1, $2, $3);
    `,
    [title, releaseYear, directorid]
  );
}
