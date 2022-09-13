/* Modules */
const express = require('express');

const router = express.Router();

/* Controllers */
const userController = require('../controllers/userController');

/* Middleware */
const addLocals = require('../middleware/addLocals');

/* GET Routes. */
router.get('/signin', addLocals, async (req, res) => {
  const messages = await req.consumeFlash('info');
  res.render('auth/signin', {
    title: 'Sign In | Movies App',
    messages: messages[0],
  });
});

router.get('/signup', addLocals, async (req, res) => {
  const messages = await req.consumeFlash('info');
  res.render('auth/signup', {
    title: 'Sign Up | Movies App',
    messages: messages[0],
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
