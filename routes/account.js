/* Modules */
var express = require('express');
var router = express.Router();

/* Models */
const Movies = require('../models/movies');
const Users = require('../models/users');

/* Controllers */
const movieController = require('../controllers/movieController');

/* Middleware */
const addLocals = require('../middleware/addLocals');
const authentication = require('../middleware/authentication');

/* GET Routes. */
router.get('/:id', addLocals, authentication, async (req, res) => {
    const id = req.params.id;
    const user = await Users.findById(id).populate('movies');
    console.log(user);
    res.render('account/profile', {
        title: 'Profile | Movies App',
        movies: user.movies
    });
});

module.exports = router;