/* Modules */
var express = require('express');
var router = express.Router();

/* Controllers */
const movieController = require('../controllers/movieController');

/* Middleware */
const addLocals = require('../middleware/addLocals');

/* POST Routes. */
router.post('/add-movie', movieController.addMovies);
router.post('/edit-movie/:id', movieController.editMovieById);

/* DELETE Routes. */
router.delete('/delete-movie/:id', movieController.deleteMovieById);

module.exports = router;
