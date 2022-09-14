/* eslint-disable no-undef */
/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-underscore-dangle */
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai').expect;
const app = require('../../app');
const Movies = require('../../models/movies');

const { assert } = chai;
chai.use(chaiHttp);

/* Constants */
// const isAuth = true;
const { SITE_URL } = process.env;
const TEMP_MOVIE = {
  title: 'Test Movie',
  genre: 'Test Genre',
  director: 'Test Director',
  year: 2020,
  rating: 5,
  image: 'https://via.placeholder.com/150',
  description: 'Test Description',
};
const createMovie = async () => {
  const movie = new Movies(TEMP_MOVIE);
  await movie.save();
  return movie;
};

/* Test Cases */
// describe(`GET ${SITE_URL}`, () => {
//   it('should return a 200 response', async () => {

//   });
// });
