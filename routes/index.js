/* Modules */
const express = require('express');

const router = express.Router();

/* Controllers */
const movieController = require('../controllers/movieController');

/* Middleware */
const addLocals = require('../middleware/addLocals');
const authentication = require('../middleware/authentication');

/* GET Routes. */
router.get('/', addLocals, authentication, async (req, res) => {
  const movies = await movieController.getAllMovies();
  res.render('index', {
    title: 'Home | Movies App',
    movies: movies,
  });
});

module.exports = router;
