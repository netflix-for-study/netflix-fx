const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const config = require("config");

const User = require("../models/User");
const port = require("../utils/port");

passport.use(
  new GoogleStrategy(
    {
      clientID: config.get("GOOGLE_CLIENT_ID"),
      clientSecret: config.get("GOOGLE_CLIENT_SECRET"),
      callbackURL: `https://localhost:${port}/oauth/google/callback`,
      passReqToCallback: true,
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne(
        {
          "google.id": profile.id,
        },
        function (err, user) {
          if (!user) {
            user = new User({
              username: profile.displayName,
              email: profile.emails[0].value,
              profilePicture: profile.photos,
              provider: "google",
              naver: profile._json,
            });
            user.save(function (err) {
              if (err) console.log(err);
              return done(err, user);
            });
          } else {
            return done(err, user);
          }
        }
      );
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
