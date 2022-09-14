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
