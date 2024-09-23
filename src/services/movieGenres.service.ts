import { pool } from "../model/db/connetion";

export async function createMovieGenresTable() {
  const MovieGenres = `
                CREATE TABLE IF NOT EXISTS MovieGenres (
                  MovieID INT,
                  GenreID INT,
                  PRIMARY KEY (MovieID, GenreID),
                  FOREIGN KEY (MovieID) REFERENCES Movies (MovieID)
                  ON DELETE CASCADE,
                  FOREIGN KEY (GenreID) REFERENCES Genres (GenreID)
                  ON DELETE CASCADE
                );`;
  await pool.query(MovieGenres);
}

export async function setMovieGenresService(data: {
  genreid: number;
  movieid: number;
}) {
  const { genreid, movieid } = data;

  const result = await pool.query(
    `
        INSERT INTO moviegenres (genreid, movieid)
        VALUES ($1, $2);
      `,
    [genreid, movieid]
  );
  return result.rows;
}

export async function deleteMovieGenresService(ID: string) {
  const data = await pool.query(`DELETE FROM moviegenres WHERE movieid = $1;`, [
    ID,
  ]);
  return data.rows;
}
