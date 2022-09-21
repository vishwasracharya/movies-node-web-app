/* Modules */
const express = require('express');

const router = express.Router();

/* Controllers */
const movieController = require('../controllers/movieController');

/* Middleware */
const authentication = require('../middleware/authentication');
const validateObjectId = require('../middleware/validateObjectId');

if (process.env.ENVIRONMENT !== 'testing') {
  router.use(authentication);
}
/* GET Routes. */
/**
 * @swagger
 * /api/all-movies:
 *  get:
 *    tags: [Movies]
 *    summary: Get All Movies
 *    description: This can only be done by the logged in user.
 *    responses:
 *      '200':
 *        description: A response with all movies
 *      '302':
 *        description: Redirect to login page if not logged in
 *      '400':
 *        description: Invalid Token
 */
router.get('/all-movies', authentication, async (req, res) => {
  const movies = await movieController.getAllMovies();
  res.send(movies);
});

/**
 * @swagger
 * /api/movies/{id}:
 *  get:
 *    tags: [Movies]
 *    summary: Get Movies By Id
 *    description: This can only be done by the logged in user.
 *    parameters: [ { name: id, in: path, required: true, type: string } ]
 *    responses:
 *      '200':
 *        description: A with movie by id
 *      '302':
 *        description: Redirect to login page if not logged in
 *      '400':
 *        description: Invalid Token
 *      '404':
 *        description: Invalid ID
 */
router.get('/movie/:id', validateObjectId, authentication, async (req, res) => {
  const { id } = req.params;
  const movie = await movieController.getMovieById(id);
  if (movie !== null) {
    res.send(movie);
  } else {
    res.status(404).send('Movie Not Found');
  }
});

/* POST Routes. */
/**
 * @swagger
 * /api/add-movie:
 *  post:
 *    tags: [Movies]
 *    summary: Add a new movie
 *    description: This can only be done by the logged in user.
 *    operationId: addMovies
 *    requestBody:
 *      description: Created movie object
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Movie'
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#/components/schemas/Movie'
 *        application/xml:
 *          schema:
 *            $ref: '#/components/schemas/Movie'
 *    responses:
 *      '200':
 *        description: Movie Added Successfully
 *      '302':
 *        description: Redirect to login page if not logged in
 */
router.post('/add-movie', movieController.addMovies);

/**
 * @swagger
 * /api/edit-movie/{id}:
 *  post:
 *    tags: [Movies]
 *    summary: Edit a movie
 *    description: This can only be done by the logged in user.
 *    operationId: editMovieById
 *    requestBody:
 *     description: Created movie object
 *     content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/Movie'
 *      application/x-www-form-urlencoded:
 *        schema:
 *          $ref: '#/components/schemas/Movie'
 *      application/xml:
 *        schema:
 *          $ref: '#/components/schemas/Movie'
 *    responses:
 *      '200':
 *        description: Movie Edited Successfully
 *      '302':
 *        description: Redirect to login page if not logged in
 */
router.post('/edit-movie/:id', validateObjectId, movieController.editMovieById);

/**
 * @swagger
 * /api/rent-movie/{id}/{uid}:
 *  post:
 *    tags: [Movies]
 *    summary: Rent a movie by id and uid
 *    description: This can only be done by the logged in user.
 *    operationId: rentMovieById
 *    parameters: [ { name: id, in: path, required: true, type: string }, { name: uid, in: path, required: true, type: string } ]
 *    responses:
 *      '200':
 *        description: Movie Rented Successfully
 *      '302':
 *        description: Redirect to login page if not logged in
 *      '400':
 *        description: Movie Not Available
 *      '404':
 *        description: Movie Not Found
 */
router.post(
  '/rent-movie/:id/:uid',
  validateObjectId,
  movieController.rentMovieById
);

/**
 * @swagger
 * /api/return-movie/{id}/{uid}:
 *  post:
 *    tags: [Movies]
 *    summary: Return a movie by id and uid
 *    description: This can only be done by the logged in user.
 *    operationId: returnMovieById
 *    parameters: [ { name: id, in: path, required: true, type: string }, { name: uid, in: path, required: true, type: string } ]
 *    responses:
 *      '200':
 *        description: Movie Rented Successfully
 *      '302':
 *        description: Redirect to login page if not logged in
 *      '404':
 *        description: Movie Not Found
 */
router.post(
  '/return-movie/:id/:uid',
  validateObjectId,
  movieController.returnMovieById
);

/* DELETE Routes. */
/**
 * @swagger
 * /api/delete-movie/{id}:
 *  delete:
 *    tags: [Movies]
 *    summary: Delete a movie by id
 *    description: This can only be accessed by admin.
 *    operationId: deleteMovieById
 *    parameters: [ { name: id, in: path, required: true, type: string } ]
 *    responses:
 *      '200':
 *        description: Movie Deleted Successfully
 *      '302':
 *        description: Redirect to login page if not logged in
 *      '404':
 *        description: Invalid ID
 */
router.delete(
  '/delete-movie/:id',
  validateObjectId,
  movieController.deleteMovieById
);

module.exports = router;
