/* eslint-disable no-underscore-dangle */
/* Modules */
const express = require('express');

const router = express.Router();

/* Models */
const Users = require('../models/users');

/* Controllers */
const movieController = require('../controllers/movieController');
const decodeJwtController = require('../controllers/functions/decodeJwtController');

/* Middleware */
const addLocals = require('../middleware/addLocals');
const authentication = require('../middleware/authentication');
const validateObjectId = require('../middleware/validateObjectId');

/* GET Routes. */
router.get('/add', addLocals, authentication, (req, res) => {
  res.render('movies/add', {
    title: 'Add Movie | Movies App',
  });
});

router.get('/:id', addLocals, validateObjectId, async (req, res) => {
  const { id } = req.params;
  const movie = await movieController.getMovieById(id);
  if (movie !== null) {
    res.render('movies/movie', {
      title: `${movie.title} | Movies App`,
      movie,
    });
  } else {
    res.status(404).render('404', {
      title: '404 | Movies App',
      message: 'Movie Not Found',
      error: {
        status: 404,
        stack: 'Movie Not Found',
      },
    });
  }
});

router.get(
  '/edit/:id',
  addLocals,
  authentication,
  validateObjectId,
  async (req, res) => {
    const { id } = req.params;
    const movie = await movieController.getMovieById(id);
    if (movie !== null) {
      res.render('movies/edit', {
        title: `${movie.title} | Movies App`,
        movie,
      });
    } else {
      res.status(404).render('404', {
        title: '404 | Movies App',
        message: 'Movie Not Found',
        error: {
          status: 404,
          stack: 'Movie Not Found',
        },
      });
    }
  }
);

router.get('/rent/:id', addLocals, validateObjectId, async (req, res) => {
  const { id } = req.params;
  const movie = await movieController.getMovieById(id);
  let user = decodeJwtController(req.cookies.token);
  user = await Users.findById(user._id).populate('movies');
  if (movie !== null) {
    res.render('movies/rent', {
      title: `${movie.title} | Movies App`,
      movie,
      rented: !!user.movies.find((m) => m._id === id),
    });
  } else {
    res.status(404).render('404', {
      title: '404 | Movies App',
      message: 'Movie Not Found',
      error: {
        status: 404,
        stack: 'Movie Not Found',
      },
    });
  }
});

module.exports = router;
