/* Modules*/
const _ = require('lodash');
const bcrypt = require('bcrypt');

/* Models */
const Users = require('../models/users');

/* POST Methods */
const signInWithEmailAndPassword = async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (!user) {
        await req.flash('info', 'User Doesn\'t Exist');
        res.redirect(302, `${process.env.SITE_URL}/auth/signin`); 
        return;
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        await req.flash('info', 'Invalid Password');
        res.redirect(302, `${process.env.SITE_URL}/auth/signin`); 
        return;
    }

    const token = user.generateAuthToken();
    await req.flash('info', 'User Logged In Successfully');
    res.cookie('token', token, { httpOnly: true }).redirect(302, `${process.env.SITE_URL}`);
};

const signUpWithEmailAndPassword = async (req, res) => {    
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        await req.flash('info', 'User Already Registered');
        res.redirect(302, `${process.env.SITE_URL}/auth/signup`); 
        return;
    }
    user = new Users(_.pick(req.body, ['firstName', 'lastName', 'email', 'password', 'isAdmin']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthToken();
    await req.flash('info', 'User Registered Successfully');
    res.cookie('token', token, { httpOnly: true }).redirect(302, `${process.env.SITE_URL}`);
};

module.exports.signInWithEmailAndPassword = signInWithEmailAndPassword;
module.exports.signUpWithEmailAndPassword = signUpWithEmailAndPassword;