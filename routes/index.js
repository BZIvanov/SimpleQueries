const users = require('./users');
const movies = require('./movies');

module.exports = (app) => {
  app.use('/users', users);
  app.use('/movies', movies);
};
