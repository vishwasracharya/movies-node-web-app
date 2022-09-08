/* Modules */
var express = require('express');
var router = express.Router();
const redisClient = require('../utils/redis');

/* Models */
const Movies = require('../models/movies');

/* Controllers */
const movieController = require('../controllers/movieController');

/* Middleware */
const addLocals = require('../middleware/addLocals');
const authentication = require('../middleware/authentication');

/* GET Routes. */
router.get('/add', addLocals, authentication, (req, res) => {
  res.render('movies/add', { 
    title: 'Add Movie | Movies App' 
  });
});

router.get('/:id', addLocals, async (req, res) => {
  const id = req.params.id;
  let isCached = false, movie;
  try {
    const cacheResults = await redisClient.get(id);
    if (cacheResults) {
      isCached = true;
      movie = JSON.parse(cacheResults);
    } else {
      movie = await movieController.getMovieById(id);
      await redisClient.set(id, JSON.stringify(movie));
      await redisClient.expire(id, 60 * 60 * 24);
    }
    if (movie !== null) {
      res.render('movies/movie', { 
        title: `${movie.title} | Movies App`,
        movie
      });
      movie = await movieController.getMovieById(id);
      await redisClient.set(id, JSON.stringify(movie));
      await redisClient.expire(id, 60 * 60 * 24);
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
  } catch (ex) {
    console.log(ex);
  }
});

router.get('/edit/:id', addLocals, authentication, async (req, res) => {
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
