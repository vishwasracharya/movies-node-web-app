/* Modules */
var express = require('express');
var router = express.Router();

/* Models */
const Users = require('../models/users');

/* Controllers */
const userController = require('../controllers/userController');

/* Middleware */
const addLocals = require('../middleware/addLocals');
const authentication = require('../middleware/authentication');

/* GET Routes. */
router.get('/signin', addLocals, async (req, res) => {
    let messages = await req.consumeFlash('info');
    messages = messages[0];
    res.render('auth/signin', {
        title: 'Sign In | Movies App',
        messages
    });
});

router.get('/signup', addLocals, async (req, res) => {
    let messages = await req.consumeFlash('info');
    messages = messages[0];
    res.render('auth/signup', {
        title: 'Sign Up | Movies App',
        messages
    });
});

router.get('/signout', addLocals, async (req, res) => {
    res.clearCookie('token');
    res.redirect(302, `${process.env.SITE_URL}`);
});

/* POST Methods */
router.post('/signin', userController.signInWithEmailAndPassword);
router.post('/signup', userController.signUpWithEmailAndPassword);

module.exports = router;
