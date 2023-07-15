const express = require("express");
const router = express.Router();
const googlePassport = require("../oauth/google");
const kakaoPassport = require("../oauth/kakao");
const naverPassport = require("../oauth/naver");

// Google 로그인 요청 처리
router.get(
  "/oauth/google",
  googlePassport.authenticate("google", { scope: ["profile"] })
);

// Google 로그인 콜백 처리
router.get(
  "/oauth/google/callback",
  googlePassport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/profile");
  }
);

// Kakao 로그인 요청 처리
router.get("/oauth/kakao", kakaoPassport.authenticate("kakao"));

// Kakao 로그인 콜백 처리
router.get(
  "/oauth/kakao/callback",
  kakaoPassport.authenticate("kakao", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/profile");
  }
);

// Naver 로그인 요청 처리
router.get("/oauth/naver", naverPassport.authenticate("naver"));

// Naver 로그인 콜백 처리
router.get(
  "/oauth/naver/callback",
  naverPassport.authenticate("naver", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/profile");
  }
);

module.exports = router;
