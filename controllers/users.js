const db = require('../db');

// GET "/users"
exports.getUsers = (req, res, next) => {
  db.query(
    'SELECT * FROM users ORDER BY first_name ASC;',
    [],
    (err, result) => {
      if (err) {
        return next(err);
      }

      res.json({ data: result.rows, query: result.nativeQuery });
    }
  );
};

// POST "/users"
exports.createUser = (req, res, next) => {
  const { first_name, last_name, email, city, age } = req.body;

  // we are using RETURNING to get back the data created so we can send it with the response
  db.query(
    'INSERT INTO users (first_name, last_name, email, city, age) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
    [first_name, last_name, email, city, age],
    (err, result) => {
      if (err) {
        return next(err);
      }

      res.json({ data: result.rows, query: result.nativeQuery });
    }
  );
};

// GET "/users/:id"
exports.getUser = (req, res, next) => {
  db.query(
    'SELECT * FROM users WHERE id = $1;',
    [req.params.id],
    (err, result) => {
      if (err) {
        return next(err);
      }

      res.json({ data: result.rows, query: result.nativeQuery });
    }
  );
};

// PATCH "/users/:id"
exports.updateUser = (req, res, next) => {
  const data = { ...req.body };
  const fields = Object.keys(data);
  const values = fields.map((field) => data[field]);

  const updateParams = fields
    .map((field, idx) => `${field} = $${idx + 2}`)
    .join(', ');

  db.query(
    `UPDATE users SET ${updateParams} WHERE id = $1 RETURNING *;`,
    [req.params.id, ...values],
    (err, result) => {
      if (err) {
        return next(err);
      }

      res.json({ data: result.rows, query: result.nativeQuery });
    }
  );
};

// DELETE "/users/:id"
exports.removeUser = (req, res, next) => {
  db.query(
    'DELETE FROM users WHERE id = $1;',
    [req.params.id],
    (err, result) => {
      if (err) {
        return next(err);
      }

      res.json({ data: result.rows, query: result.nativeQuery });
    }
  );
};

// GET "/users/cities"
exports.getUsersCities = (req, res, next) => {
  db.query(
    'SELECT DISTINCT city FROM users WHERE city IS NOT NULL;',
    [],
    (err, result) => {
      if (err) {
        return next(err);
      }

      res.json({ data: result.rows, query: result.nativeQuery });
    }
  );
};
