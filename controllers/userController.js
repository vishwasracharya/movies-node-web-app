/**
 * userController module.
 * @module userController
 */

/* Modules */
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

/* Models */
const Users = require('../models/users');

const decodeJwtController = require('./functions/decodeJwtController');

/* POST Methods */
const signInWithEmailAndPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errData = errors.array()[0];
    await req.flash('info', errData.msg);
    return res.status(400).json({
      error: true,
      message: errData.msg,
    });
  }

  const user = await Users.findOne({ email: req.body.email });
  if (!user) {
    await req.flash('info', "User Doesn't Exist");
    return res.status(404).send({ error: true, message: "User Doesn't Exist" });
    // res.redirect(302, `${process.env.SITE_URL}/auth/signin`);
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    await req.flash('info', 'Invalid Password');
    return res.status(400).send({ error: true, message: 'Invalid Password' });
    // res.redirect(302, `${process.env.SITE_URL}/auth/signin`);
  }

  const token = user.generateAuthToken();
  await req.flash('info', 'User Logged In Successfully');
  return res
    .cookie('token', token, { httpOnly: true })
    .status(200)
    .send({ message: 'User Logged In Successfully', token, user });
  // res
  //   .cookie('token', token, { httpOnly: true })
  //   .redirect(302, `${process.env.SITE_URL}`);
};

const signUpWithEmailAndPassword = async (req, res) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    const errData = errors.array()[0];
    console.log(errData.value);
    await req.flash('info', errData.msg);
    return res.status(400).json({
      error: true,
      message: errData.msg,
    });
  }

  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    await req.flash('info', 'User Already Registered');
    return res
      .status(400)
      .send({ error: true, message: 'User Already Registered' });
    // res.redirect(302, `${process.env.SITE_URL}/auth/signup`);
  }
  user = new Users(
    _.pick(req.body, ['firstName', 'lastName', 'email', 'password', 'isAdmin'])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token = user.generateAuthToken();
  await req.flash('info', 'User Registered Successfully');
  return res.cookie('token', token, { httpOnly: true }).status(200).send({
    error: false,
    message: 'User Registered Successfully',
    token,
    user,
  });
  // res
  //   .cookie('token', token, { httpOnly: true })
  //   .redirect(302, `${process.env.SITE_URL}`);
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findOne({ _id: id });
    console.log(user);
    if (!user) return res.status(404).send('User Not Found');

    await Users.findOneAndDelete({ _id: id });
    return res.status(200).send('User Deleted Successfully');
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
};

const getAllUsers = async (req, res) => {
  try {
    if (decodeJwtController(req.cookies.token).isAdmin) {
      const users = await Users.find();
      return res.status(200).send(users);
    }
    return res.status(403).send('Access Denied');
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findOne({ _id: id }).populate('movies');
    if (!user) return res.status(404).send('User Not Found');
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
};

module.exports.signInWithEmailAndPassword = signInWithEmailAndPassword;
module.exports.signUpWithEmailAndPassword = signUpWithEmailAndPassword;
module.exports.deleteUser = deleteUser;
module.exports.getAllUsers = getAllUsers;
module.exports.getUserById = getUserById;
