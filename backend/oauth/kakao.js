const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const config = require("config");

const User = require("../models/User");
const port = require("../utils/port");

passport.use(
  new KakaoStrategy(
    {
      clientID: config.get("KAKAO_CLIENT_ID"),
      callbackURL: `https://localhost:${port}/oauth/kakao/callback`,
      passReqToCallback: true,
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne(
        {
          "kakao.id": profile.id,
        },
        function (err, user) {
          if (!user) {
            user = new User({
              username: profile.displayName,
              email: profile.emails[0].value,
              profilePicture: profile.photos,
              provider: "kakao",
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
