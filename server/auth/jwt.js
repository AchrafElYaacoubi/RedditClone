const passport = require("passport");
const { Strategy: JwtStrategy } = require('passport-jwt');
const { ExtractJwt } = require('passport-jwt');
const config = require('../config');



var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwt.secret;

const jwtStrategy = new JwtStrategy(opts, function(jwt_payload, done) {
  done(false, jwt_payload)
})

module.exports = { jwtStrategy };