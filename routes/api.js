/* Modules */
var express = require('express');
var router = express.Router();

/* Controllers */
const movieController = require('../controllers/movieController');

/* Middleware */
const addLocals = require('../middleware/addLocals');
const authentication = require('../middleware/authentication');

/* POST Routes. */
router.post('/add-movie', authentication, movieController.addMovies);
router.post('/edit-movie/:id', authentication, movieController.editMovieById);

/* DELETE Routes. */
router.delete('/delete-movie/:id', authentication, movieController.deleteMovieById);

module.exports = router;
