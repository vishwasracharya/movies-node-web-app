/* Modules */
const express = require('express');

const router = express.Router();

/* Models */
const Users = require('../models/users');

/* Controllers */
const userController = require('../controllers/userController');

/* Middleware */
const addLocals = require('../middleware/addLocals');
const authentication = require('../middleware/authentication');
const validateObjectId = require('../middleware/validateObjectId');

/* GET Routes. */
/**
 * @swagger
 * /account/users:
 *  get:
 *    tags: [Users]
 *    summary: Get All Users
 *    description: This can only be accessed by admin users.
 *    responses:
 *      '200':
 *        description: A rendered page with all users
 *      '302':
 *        description: Redirect to login page if not logged in
 *      '400':
 *        description: Invalid Token
 */

router.get('/users', addLocals, authentication, async (req, res) => {
  console.log('req.user', req.user);
  if (req.user.isAdmin) {
    const users = await Users.find();
    // res.status(200).send(users);
    res.render('account/list_users', {
      title: 'Profile | Movies App',
      users,
    });
  } else {
    res.redirect(302, `${process.env.SITE_URL}`);
  }
});

/**
 * @swagger
 * /account/{id}:
 *  get:
 *    tags: [Users]
 *    summary: Get User By Id
 *    description: This can only be done by the logged in user.
 *    parameters: [ { name: id, in: path, required: true, type: string } ]
 *    responses:
 *      '200':
 *        description: A user with all the rented movies
 *      '302':
 *        description: Redirect to login page if not logged in
 *      '400':
 *        description: Invalid Token
 *      '404':
 *        description: Invalid ID
 */
router.get(
  '/:id',
  addLocals,
  authentication,
  validateObjectId,
  async (req, res) => {
    const { id } = req.params;
    const user = await Users.findById(id).populate('movies');
    console.log(user);
    // return res.status(200).send(user);
    res.render('account/profile', {
      title: 'Profile | Movies App',
      movies: user.movies ? user.movies : [],
    });
  }
);

/* DELETE Route */
/**
 * @swagger
 * /account/delete/{id}:
 *  delete:
 *    tags: [Users]
 *    summary: Delete a user by id
 *    description: This can only be accessed by admin.
 *    operationId: deleteUser
 *    parameters: [ { name: id, in: path, required: true, type: string } ]
 *    responses:
 *      '200':
 *        description: User Deleted Successfully
 *      '302':
 *        description: Redirect to login page if not logged in
 *      '404':
 *        description: User Not Found or Invalid ID
 */
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;
