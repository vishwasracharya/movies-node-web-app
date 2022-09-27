/* eslint-disable no-underscore-dangle */
/* Models */
const Movies = require('../models/movies');
const Users = require('../models/users');

/* POST Methods */
/**
 * Function to Add a new movie
 * @module addMovies
 * @param {Object} req - Request Object (To get the data from the request)
 * @param {Object} res - Response Object (To be sent to the client)
 */
const addMovies = async (req, res) => {
  try {
    console.log(req.body);
    const data = req.body;
    const movie = new Movies(data);
    await movie.save();
    res.status(200).send({ error: false, message: 'Movie Added Successfully' });
    // res.redirect(200, process.env.SITE_URL);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Function to Edit a movie
 * @module editMovieById
 * @param {Object} req - Request Object (To get the data from the request)
 * @param {Object} res - Response Object (To be sent to the client)
 */
const editMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const newdata = {
      title: data.title,
      genre: data.genre,
      director: data.director,
      year: data.year,
      rating: data.rating,
      image: data.image,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      updated_at: Date.now(),
    };
    await Movies.findByIdAndUpdate(id, newdata);
    // res.status(200).send('Movie Updated Successfully');
    res.redirect(200, `/movies/${id}`);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Function to Rent a movie
 * @module rentMovieById
 * @param {Object} req - Request Object (To get the data from the request)
 * @param {Object} res - Response Object (To be sent to the client)
 */
const rentMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const { uid } = req.params;
    const movie = await Movies.findById(id);
    if (movie) {
      if (movie.quantity > 0) {
        const user = await Users.findById(uid);
        user.movies.push(movie._id);
        await user.save();
        movie.quantity -= 1;
        await movie.save();
        res.status(200).send('Movie Rented Successfully');
        return;
      }
      res.status(400).send('Movie Not Available');
    } else {
      res.status(404).send('Movie Not Found');
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Function to return a rented movie
 * @module returnMovieById
 * @param {Object} req - Request Object (To get the data from the request)
 * @param {Object} res - Response Object (To be sent to the client)
 */
const returnMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const { uid } = req.params;
    const movie = await Movies.findById(id);
    if (movie) {
      await Users.findOneAndUpdate({ _id: uid }, { $pull: { movies: id } });
      movie.quantity += 1;
      await movie.save();
      res.status(200).send('Movie Returned Successfully');
    } else {
      res.status(404).send('Movie Not Found');
    }
  } catch (error) {
    console.log(error);
  }
};

/* DELETE Methods */
/**
 * Function to Delete a movie
 * @module deleteMovieById
 * @param {Object} req - Request Object (To get the data from the request)
 * @param {Object} res - Response Object (To be sent to the client)
 */
const deleteMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    await Movies.findByIdAndDelete(id);
    res.status(200).json({
      ok: true,
      message: 'Movie Deleted Successfully',
    });
  } catch (error) {
    console.log(error);
  }
};

/* GET Methods */
/**
 * @module getAllMovies
 * @returns movies list from the database
 * @type {Array<Object>}
 */
const getAllMovies = async () => {
  try {
    let movies = await Movies.find();
    movies = movies.map((movie) => ({
      _id: movie._id,
      title: movie.title,
      genre: movie.genre,
      director: movie.director,
      year: movie.year,
      rating: movie.rating,
      image: movie.image,
      description: movie.description,
      created_at: movie.created_at,
      updated_at: movie.updated_at,
    }));
    return movies;
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * @module getMovieById
 * @param {String} id - Movie ID
 * @returns requested movie from the database
 * @type {Object}
 */
const getMovieById = async (id) => {
  try {
    const movie = await Movies.findById(id);
    if (movie) {
      return movie;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports.addMovies = addMovies;
module.exports.getAllMovies = getAllMovies;
module.exports.getMovieById = getMovieById;
module.exports.editMovieById = editMovieById;
module.exports.rentMovieById = rentMovieById;
module.exports.returnMovieById = returnMovieById;
module.exports.deleteMovieById = deleteMovieById;
