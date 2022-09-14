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
router.get('/users', addLocals, authentication, async (req, res) => {
  if (req.user.isAdmin) {
    const users = await Users.find();
    res.render('account/list_users', {
      title: 'Profile | Movies App',
      users,
    });
  } else {
    res.redirect(302, `${process.env.SITE_URL}`);
  }
});

router.get(
  '/:id',
  addLocals,
  authentication,
  validateObjectId,
  async (req, res) => {
    const { id } = req.params;
    const user = await Users.findById(id).populate('movies');
    console.log(user);
    res.render('account/profile', {
      title: 'Profile | Movies App',
      movies: user.movies ? user.movies : [],
    });
  }
);

/* DELETE Route */
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;
