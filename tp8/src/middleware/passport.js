const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const dotenv = require('dotenv');
dotenv.config();

const userModel = require('../models/userModel');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const initializePassport = () => {
  passport.use(
    'jwt',
    new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
      try {
        const user = await userModel.findById(jwtPayload.userId);
        if (!user) return done(null, false, { message: 'Invalid token' });
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.use(
    'local',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await userModel.findOne({ email });
          if (!user) return done(null, false, { message: 'Incorrect email' });
          const isMatch = await userModel.isValidPassword(password);
          if (!isMatch) return done(null, false, { message: 'Incorrect password' });
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

module.exports = {
  initializePassport,
};
