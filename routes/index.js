/* Modules */
var express = require('express');
var router = express.Router();

/* Models */
const Movies = require('../models/movies');

/* Controllers */
const movieController = require('../controllers/movieController');

/* Middleware */
const addLocals = require('../middleware/addLocals');

/* GET Routes. */
router.get('/', addLocals, async (req, res) => {
  const movies = await movieController.getAllMovies();
  console.log(movies);
  res.render('index', { 
    title: 'Home | Movies App',
    movies: movies
  });
});

module.exports = router;
