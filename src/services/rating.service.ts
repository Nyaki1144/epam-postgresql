import { pool } from "../model/db/connetion";
import { rating } from "../util/typs";

export async function createRatingTable() {
  const Rating = `
                  CREATE TABLE IF NOT EXISTS Ratings (
                    RatingID SERIAL PRIMARY KEY,
                    Rating INT not NULL,
                    MovieID INT UNIQUE,
                    FOREIGN KEY (MovieID) REFERENCES Movies (MovieID)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
                  );
                `;

  await pool.query(Rating);
}

export async function getRatingsService() {
  const data = await pool.query(`SELECT * FROM Ratings;`);
  return data.rows;
}

export async function getRatingService(ID: string) {
  const data = await pool.query(`SELECT * FROM Ratings WHERE movieid = $1;`, [
    ID,
  ]);

  return data.rows;
}

export async function updateRatingService(
  ID: string,
  data: { rating: string }
) {
  const { rating } = data;

  const result = await pool.query(
    `UPDATE Ratings
  SET rating = $1
  WHERE movieid = $2 RETURNING *;`,
    [rating, ID]
  );
  return result.rows;
}

export async function deleteRatingService(ID: string) {
  const data = await pool.query(`DELETE FROM Ratings WHERE movieid = $1;`, [
    ID,
  ]);
  return data.rows;
}

export async function setRatingService(data: rating) {
  const { rating, movieid } = data;

  const result = await pool.query(
    `
      INSERT INTO ratings (rating, movieid)
      VALUES ($1, $2);
    `,
    [rating, movieid]
  );
  return result.rows;
}
