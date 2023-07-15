const passport = require("passport");
const NaverStrategy = require("passport-naver").Strategy;
const config = require("config");
const User = require("../models/User");

passport.use(
  new NaverStrategy(
    {
      clientID: config.get("NAVER_CLIENT_ID"),
      clientSecret: config.get("NAVER_CLIENT_SECRET"),
      callbackURL: "https://localhost:5000/oauth/naver/callback",
      passReqToCallback: true,
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne(
        {
          "naver.id": profile.id,
        },
        function (err, user) {
          if (!user) {
            user = new User({
              username: profile.displayName,
              email: profile.emails[0].value,
              profilePicture: profile.photos,
              provider: "naver",
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
