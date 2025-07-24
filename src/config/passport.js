const { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const config = require("./index");
const { tokenTypes } = require("./tokens");
const { User } = require("../models");
const authService = require("../services/auth.service");

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error("Invalid type token");
    }
    const user = await User.findByPk(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const googleStrategyOptions = {
  clientID: config.google.clientId,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackUrl,
};

const googleVerify = async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await authService.loginWithGoogle(profile);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JWTStrategy(jwtOptions, jwtVerify);
const googleStrategy = new GoogleStrategy(googleStrategyOptions, googleVerify);

module.exports = {
  jwtStrategy,
  googleStrategy,
};
