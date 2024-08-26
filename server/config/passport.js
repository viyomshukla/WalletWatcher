const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config()
const signupmodel = require('../models/signupmodel'); // Adjust the path as necessary

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY; // Use an environment variable in production

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await signupmodel.findById(jwt_payload.userId);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
}));

module.exports = passport;
