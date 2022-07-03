const db = require('.');

db.query(
  `
    INSERT INTO users (first_name, last_name, email, city, age, hobby) VALUES 
      ('Iva', 'Ivanova', 'iva@mail.com', 'Sofia', 31, DEFAULT),
      ('Miro', 'Petrov', 'miro@mail.com', DEFAULT, 29, 'ski'),
      ('Milen', 'Qsenov', 'milen@mail.com', 'Plovdiv', DEFAULT, DEFAULT),
      ('Eli', 'Ivanova', 'eli@mail.com', 'Sofia', 26, 'biking');
    
    INSERT INTO movies (title, genre, year, description) VALUES
      ('Jupiter moon', 'fantasy', 2022, 'Travel to the unknown. Best visual effects you will ever see.'),
      ('SuperHero', 'action', 2018, DEFAULT),
      ('Chemistry exists', 'science', 2012, 'Deep dive into the chemistry.'),
      ('The Vilian', 'action', 2019, 'Best movie to watch the autumn of this year!'),
      ('Fun fun story', 'comedy', 2020, 'Very fun movie.'),
      ('In depths', 'science', 2022, 'Learn things'),
      ('Space ships', 'fantasy', 2015, 'Epic battles in the space.');
  `,
  (err, result) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log(
      `Successfully inserted ${result
        .filter((r) => r.command === 'INSERT')
        .reduce((prev, curr) => {
          return prev + curr.rowCount;
        }, 0)} rows`
    );
  }
);
