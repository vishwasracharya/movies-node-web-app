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
/* GET Routes. */
router.get('/all-movies', authentication, async (req, res) => {
  const movies = await movieController.getAllMovies();
  res.send(movies);
});
router.get('/movie/:id', validateObjectId, authentication, async (req, res) => {
  const { id } = req.params;
  const movie = await movieController.getMovieById(id);
  if (movie !== null) {
    res.send(movie);
  } else {
    res.status(404).send('Movie Not Found');
  }
});

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
