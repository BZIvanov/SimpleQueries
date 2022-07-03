const db = require('.');

db.query(
  `
    DROP TABLE IF EXISTS movies;
    DROP TABLE IF EXISTS users;

    CREATE TABLE IF NOT EXISTS users (
      id serial PRIMARY KEY,
      first_name VARCHAR (50) NOT NULL,
      last_name VARCHAR (50) NOT NULL,
      email VARCHAR (50) UNIQUE NOT NULL,
      town VARCHAR (50),
      age INT CHECK (age >= 18 AND age < 81),
      created_on TIMESTAMP NOT NULL DEFAULT CURRENT_DATE
    );

    ALTER TABLE users ADD hobby VARCHAR;

    ALTER TABLE users RENAME COLUMN town TO city;

    CREATE TABLE IF NOT EXISTS movies (
      id serial PRIMARY KEY,
      title VARCHAR (50) UNIQUE NOT NULL,
      genre VARCHAR (50) NOT NULL,
      year INT CHECK (year >= 1900 AND year <= 2022),
      description VARCHAR,
      created_on TIMESTAMP NOT NULL DEFAULT CURRENT_DATE
    );
  `,
  (err, result) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log(
      `Successfully created ${
        result.filter((r) => r.command === 'CREATE').length
      } tables`
    );
  }
);
