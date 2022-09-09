/* Modules */
var express = require('express');
var router = express.Router();

/* Controllers */
const movieController = require('../controllers/movieController');

/* Middleware */
const addLocals = require('../middleware/addLocals');
const authentication = require('../middleware/authentication');
const validateObjectId = require('../middleware/validateObjectId');

if (process.env.ENVIRONMENT !== 'testing') {
  router.use(authentication);
}

/* POST Routes. */
router.post('/add-movie', movieController.addMovies);
router.post('/edit-movie/:id', validateObjectId, movieController.editMovieById);

/* DELETE Routes. */
router.delete('/delete-movie/:id', validateObjectId, movieController.deleteMovieById);

module.exports = router;
