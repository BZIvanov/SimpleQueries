const router = require('express').Router();
const {
  getMovies,
  getMoviesCountByGenre,
  getMoviesGroupByGenre,
  getMoviesByRecency,
} = require('../controllers/movies');

router.route('/').get(getMovies);
router.route('/count').get(getMoviesCountByGenre);
router.route('/group').get(getMoviesGroupByGenre);
router.route('/recency').get(getMoviesByRecency);

module.exports = router;
