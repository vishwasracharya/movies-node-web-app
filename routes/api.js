/* Modules */
const express = require('express');

const router = express.Router();

/* Controllers */
const movieController = require('../controllers/movieController');

/* Middleware */
const authentication = require('../middleware/authentication');
const validateObjectId = require('../middleware/validateObjectId');

if (process.env.ENVIRONMENT !== 'testing') {
  router.use(authentication);
}

/* POST Routes. */
router.post('/add-movie', movieController.addMovies);
router.post('/edit-movie/:id', validateObjectId, movieController.editMovieById);
router.post(
  '/rent-movie/:id/:uid',
  validateObjectId,
  movieController.rentMovieById
);
router.post(
  '/return-movie/:id/:uid',
  validateObjectId,
  movieController.returnMovieById
);

/* DELETE Routes. */
router.delete(
  '/delete-movie/:id',
  validateObjectId,
  movieController.deleteMovieById
);

module.exports = router;
