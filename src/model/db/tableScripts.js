export const Directors = `
                    CREATE TABLE IF NOT EXISTS Directors (
                      DirectorID SERIAL PRIMARY KEY,
                      Name VARCHAR(50) not NULL,
                      Nationality VARCHAR(50) not NULL,
                      DOB date
                    );
                  `;

export const Actors = `
                CREATE TABLE IF NOT EXISTS Actors (
                  ActorID SERIAL PRIMARY KEY,
                  Name VARCHAR(50) not NULL,
                  Nationality VARCHAR(50) not NULL,
                  DOB date
                );
              `;

export const Genres = `
                  CREATE TABLE IF NOT EXISTS Genres (
                    GenreID SERIAL PRIMARY KEY,
                    GenreName VARCHAR(50) not NULL
                  );
                `;

export const Movies = `
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

export const Ratings = `
                  CREATE TABLE IF NOT EXISTS Ratings (
                    Rating INT not NULL,
                    MovieID INT,
                    FOREIGN KEY (MovieID) REFERENCES Movies (MovieID)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
                  );
                `;

export const MovieGenres = `
                      CREATE TABLE IF NOT EXISTS MovieGenres (
                        MovieID INT,
                        GenreID INT,
                        PRIMARY KEY (MovieID, GenreID),
                        FOREIGN KEY (MovieID) REFERENCES Movies (MovieID)
                        ON DELETE CASCADE,
                        FOREIGN KEY (GenreID) REFERENCES Genres (GenreID)
                        ON DELETE CASCADE
                      )
                        `;
