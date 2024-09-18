import pg from "pg";
const { Pool } = pg;
import "dotenv/config";

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

pool.on("connect", () => {
  console.log("Connected to the database");
});
const client = await pool.connect();

const Directors = `
                    CREATE TABLE IF NOT EXISTS Directors (
                      DirectorID SERIAL PRIMARY KEY,
                      Name VARCHAR(50) not NULL,
                      Nationality VARCHAR(50) not NULL,
                      DOB date
                    );
                  `;

const Actors = `
                CREATE TABLE IF NOT EXISTS Actors (
                  ActorID SERIAL PRIMARY KEY,
                  Name VARCHAR(50) not NULL,
                  Nationality VARCHAR(50) not NULL,
                  DOB date
                );
              `;

const Genres = `
                  CREATE TABLE IF NOT EXISTS Genres (
                    GenreID SERIAL PRIMARY KEY,
                    GenreName VARCHAR(50) not NULL
                  );
                `;

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

const Ratings = `
                  CREATE TABLE IF NOT EXISTS Ratings (
                    Rating INT not NULL,
                    MovieID INT,
                    FOREIGN KEY (MovieID) REFERENCES Movies (MovieID)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
                  );
                `;

await client.query(Directors);
await client.query(Actors);
await client.query(Genres);
await client.query(Movies);
await client.query(Ratings);

client.release();

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

// example
// CREATE TABLE IF NOT EXISTS MovieActors (
//   MovieID INT,
//   ActorID INT,
//   PRIMARY KEY (MovieID, ActorID),
//   FOREIGN KEY (MovieID) REFERENCES Movies (MovieID)
//   ON DELETE CASCADE,
//   FOREIGN KEY (ActorID) REFERENCES Actors (ActorID)
//   ON DELETE CASCADE
// );
