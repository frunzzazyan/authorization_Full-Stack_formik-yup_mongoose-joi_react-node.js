const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport")

passport.serializeUser(function(user, done) {
    done(null, user);
  })
passport.deserializeUser(function(user, done) {
    done(null, user);
  })

passport.use(new GoogleStrategy({
    clientID: "54611505914-rpn9dfa0vd0vihpgk5a3bkl14ickprig.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
  }
));