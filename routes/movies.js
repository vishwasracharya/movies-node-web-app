/* Modules */
var express = require('express');
var router = express.Router();

/* Models */
const Movies = require('../models/movies');

/* Controllers */
const movieController = require('../controllers/movieController');

/* Middleware */
const addLocals = require('../middleware/addLocals');
const authentication = require('../middleware/authentication');
const validateObjectId = require('../middleware/validateObjectId');

/* GET Routes. */
router.get('/add', addLocals, authentication, (req, res) => {
  res.render('movies/add', { 
    title: 'Add Movie | Movies App' 
  });
});

router.get('/:id', addLocals, validateObjectId, async (req, res) => {
  const id = req.params.id;
  const movie = await movieController.getMovieById(id);
  if (movie !== null) {
    res.render('movies/movie', { 
      title: `${movie.title} | Movies App`,
      movie
    });
  } else {
    res.status(404).render('404', {
      title: '404 | Movies App',
      message: 'Movie Not Found',
      error: {
        status: 404,
        stack: 'Movie Not Found'
      }
    });
  }
});

router.get('/edit/:id', addLocals, authentication, validateObjectId, async (req, res) => {
  const id = req.params.id;
  const movie = await movieController.getMovieById(id);
  if (movie !== null) {
    res.render('movies/edit', { 
      title: `${movie.title} | Movies App`,
      movie
    });
  } else {
    res.status(404).render('404', {
      title: '404 | Movies App',
      message: 'Movie Not Found',
      error: {
        status: 404,
        stack: 'Movie Not Found'
      }
    });
  }
});
  
module.exports = router;