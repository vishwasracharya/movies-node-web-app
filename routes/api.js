/* Modules */
const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

/* Controllers */
const movieController = require('../controllers/movieController');
const userController = require('../controllers/userController');

/* Middleware */
// const authentication = require('../middleware/authentication');
const apiAuth = require('../middleware/apiAuth');
const adminAuth = require('../middleware/adminAuth');
const validateObjectId = require('../middleware/validateObjectId');

if (process.env.ENVIRONMENT !== 'testing') {
  // router.use(authentication);
}
/* GET Routes. */

router.get('/all-users', apiAuth, userController.getAllUsers);
router.get('/user/:id', apiAuth, validateObjectId, userController.getUserById);
router.get(
  '/user/profile/:id',
  apiAuth,
  validateObjectId,
  userController.getUserById
);

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
router.get('/all-movies', apiAuth, async (req, res) => {
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
router.get('/movie/:id', apiAuth, validateObjectId, async (req, res) => {
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
router.post(
  '/add-movie',
  apiAuth,
  body('title')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters long'),
  body('genre')
    .isLength({ min: 3 })
    .withMessage('Genre must be at least 3 character long'),
  body('year')
    .isLength({ min: 1 })
    .isNumeric()
    .withMessage('Year must be a number'),
  body('rating')
    .isLength({ min: 1, max: 5 })
    .isNumeric()
    .withMessage('Rating must be a number'),
  body('director')
    .isLength({ min: 3 })
    .withMessage('Director must be at least 3 characters long'),
  body('image')
    .isLength({ min: 1 })
    .isURL()
    .withMessage('Image must be a valid URL'),
  body('description').isLength({ min: 1 }),
  movieController.addMovies
);

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
router.post(
  '/edit-movie/:id',
  apiAuth,
  validateObjectId,
  movieController.editMovieById
);

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
  apiAuth,
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
  apiAuth,
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
  apiAuth,
  adminAuth,
  validateObjectId,
  movieController.deleteMovieById
);

router.put(
  '/user/:id',
  apiAuth,
  validateObjectId,
  body('firstName')
    .isLength({ min: 3 })
    .withMessage('First Name must be at least 3 characters long'),
  body('lastName')
    .isLength({ min: 3 })
    .withMessage('Last name must be at least 3 characters long'),
  userController.updateUser
);

router.put(
  '/user/password/:id',
  apiAuth,
  validateObjectId,
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  userController.updatePassword
);

module.exports = router;
