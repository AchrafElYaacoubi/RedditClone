const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config");

exports.local = passport.authenticate('local',
  { 
    session: false,
  }
)

exports.createToken = user => jwt.sign({ user }, config.jwt.secret, { expiresIn: config.jwt.expiry})

exports.jwt = passport.authenticate('jwt',
  { 
    session: false,
  }
)
