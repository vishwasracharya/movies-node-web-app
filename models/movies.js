const mongoose = require('mongoose');

/**
 * Movie Model Schema
 * @schema Movies_Schema
 * @property {string} title - required
 * @property {string} genre - required
 * @property {number} year - required
 * @property {string} director - required
 * @property {number} rating - required
 * @property {string} image - required
 * @property {string} description - required
 * @property {number} quantity - default 10
 * @property {string} price - default 20
 * @property {date} created_at - default Date.now
 * @property {date} updated_at - default Date.now
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   Movie:
 *    type: object
 *    required:
 *     - title
 *     - rating
 *     - genre
 *     - director
 *     - year
 *     - image
 *     - description
 *    properties:
 *     title:
 *      type: string
 *      description: The title of the movie
 *     rating:
 *      type: number
 *      description: The rating of the movie
 *     genre:
 *      type: string
 *      description: The genre of the movie
 *     director:
 *      type: string
 *      description: The director of the movie
 *     year:
 *      type: number
 *      description: The year of the movie
 *     image:
 *      type: string
 *      description: The image of the movie
 *     description:
 *      type: string
 *      description: The description of the movie
 *     quantity:
 *      type: number
 *      description: The quantity of the movie
 *      default: 10
 *     price:
 *      type: number
 *      description: The price of the movie
 *      default: 20
 *     createdAt:
 *      type: string
 *      format: date-time
 *      description: The date the movie was created
 *     updatedAt:
 *      type: string
 *      format: date-time
 *      description: The date the movie was updated
 *    example:
 *      title: The Godfather
 *      rating: 9.2
 *      genre: Crime, Drama
 *      director: Francis Ford Coppola
 *      year: 1972
 *      image: https://image.tmdb.org/t/p/w500/rPdtLWNsZmAtoZl9PK7S2wE3qiS.jpg
 *      description: The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.
 */

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 10,
  },
  price: {
    type: Number,
    default: 20,
  },
  created_at: {
    type: Date,
    default: () => Date.now(),
  },
  updated_at: {
    type: Date,
    default: () => Date.now(),
  },
});
const Movies = mongoose.model('MOVIES', movieSchema);
module.exports = Movies;
