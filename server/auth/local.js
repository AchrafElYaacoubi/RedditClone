const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const User = require("../models/user");
const jwt = require('jsonwebtoken');


const localStrategy = new LocalStrategy( async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    if (!user) return done(null, false, { message: 'User not found' });

    const valid = await user.verifyPassword(password);
    if (!valid) return done(null, false, { message: 'Invalid password' });

    return done(null, user);
  } catch (err) {
    done(err);
  }
})



module.exports = { localStrategy };