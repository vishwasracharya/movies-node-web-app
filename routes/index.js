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
router.get('/', addLocals, authentication, async (req, res) => {
  let isCached = false, movies;
  try {
    const cacheResults = await redisClient.get('movies');
    if (cacheResults) {
      isCached = true;
      movies = JSON.parse(cacheResults);
    } else {
      movies = await movieController.getAllMovies();
      if (movies.length > 0) {
        await redisClient.set('movies', JSON.stringify(movies));
        await redisClient.expire('movies', 60 * 60 * 24);
      }
    }
    res.render('index', { 
      title: 'Home | Movies App',
      movies: movies
    });
    movies = await movieController.getAllMovies();
    if (movies.length > 0) {
      await redisClient.set('movies', JSON.stringify(movies));
      await redisClient.expire('movies', 60 * 60 * 24);
    }
  } catch (ex) {
    console.log(ex);
  }
});

module.exports = router;
