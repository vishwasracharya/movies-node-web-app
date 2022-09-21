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

/**
 * @swagger
 * /auth/signout:
 *  get:
 *    tags: [Auth]
 *    summary: Sign Out
 *    description: Sign Out
 *    responses:
 *      '302':
 *        description: Redirect to login page after signing out
 */
router.get('/signout', addLocals, async (req, res) => {
  res.clearCookie('token');
  res.redirect(302, `${process.env.SITE_URL}`);
});

/* POST Methods */
/**
 * @swagger
 * /auth/signin:
 *  post:
 *    tags: [Auth]
 *    summary: Sign In
 *    description: Sign In
 *    operationId: signInWithEmailAndPassword
 *    requestBody:
 *      content:
 *        application/json:
 *         schema:
 *          $ref: '#/components/schemas/User_SignIn'
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#/components/schemas/User_SignIn'
 *        application/xml:
 *          schema:
 *            $ref: '#/components/schemas/User_SignIn'
 *    responses:
 *      '302':
 *        description: User Signed In Successfully OR Redirect to login page if not logged in OR Redirect to signup page if user does not exist
 */
router.post('/signin', userController.signInWithEmailAndPassword);

/**
 * @swagger
 * /auth/signup:
 *  post:
 *    tags: [Auth]
 *    summary: Sign Up
 *    description: Sign Up
 *    operationId: signUpWithEmailAndPassword
 *    requestBody:
 *      description: Created user object
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Users'
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#/components/schemas/Users'
 *        application/xml:
 *          schema:
 *            $ref: '#/components/schemas/Users'
 *    responses:
 *      '302':
 *        description: User Signed Up Successfully OR Redirect to login page if not logged in
 */
router.post('/signup', userController.signUpWithEmailAndPassword);

module.exports = router;
