const db = require('../db');

// GET "/movies?title=some-title&genres=action,fantasy"
exports.getMovies = (req, res, next) => {
  const { title, genres } = req.query;

  let query = '';

  if (title) {
    query += `AND title ILIKE '%${title}%' `;
  }

  if (genres) {
    const formattedGenres = genres.split(',').join("','");
    query += `AND genre IN ('${formattedGenres}') `;
  }

  db.query(
    `SELECT * FROM movies WHERE 1 = 1 ${query} LIMIT $1;`,
    [10],
    (err, result) => {
      if (err) {
        return next(err);
      }

      res.json({ data: result.rows, query: result.nativeQuery });
    }
  );
};

// GET "/movies/count?genre=action"
exports.getMoviesCountByGenre = (req, res, next) => {
  const { genre } = req.query;

  db.query(
    'SELECT count(*) AS "genre_count" FROM movies WHERE genre = $1 LIMIT $2;',
    [genre, 10],
    (err, result) => {
      if (err) {
        return next(err);
      }

      res.json({ data: result.rows, query: result.nativeQuery });
    }
  );
};

// GET "/movies/group?minCount=5"
exports.getMoviesGroupByGenre = (req, res, next) => {
  const { minCount = 1 } = req.query;

  db.query(
    'SELECT genre, count(*) AS "genre_count" FROM movies GROUP BY genre HAVING count(*) >= $1;',
    [minCount],
    (err, result) => {
      if (err) {
        return next(err);
      }

      res.json({ data: result.rows, query: result.nativeQuery });
    }
  );
};

// GET "/movies/recency"
exports.getMoviesByRecency = (req, res, next) => {
  db.query(
    "SELECT *, CASE WHEN year < 2015 THEN 'Old, but gold' WHEN year <= 2022 THEN 'Recent' ELSE 'From the future' END AS recency FROM movies;",
    [],
    (err, result) => {
      if (err) {
        return next(err);
      }

      res.json({ data: result.rows, query: result.nativeQuery });
    }
  );
};
