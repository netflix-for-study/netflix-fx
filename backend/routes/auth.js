const express = require("express");
const config = require("config");
const CryptoJS = require("crypto-js");
const router = express.Router();
const _ = require("lodash");
const User = require("../models/User");

//사용자 로그인
router.post("/login", async (req, res) => {
  //email 일치 확인
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("email 또는 password를 확인해주세요");

  //decrypting the password(비밀번호 복호화)
  const bytes = CryptoJS.AES.decrypt(user.password, config.get("cryptojskey"));
  const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
  //비밀번호 일치 확인
  if (decryptedPassword !== req.body.password)
    return res.status(400).send("email 또는 password를 확인해주세요");

  //사용자 인증 토큰 생성
  const token = user.generateAuthToken(user);

  res
    .header("auth-token", token)
    .status(200)
    //lodash의 pick함수를 사용->user의 특정 정보 추출
    .send(_.pick(user, ["_id", "email", "username", "profilePicture"]));
});

module.exports = router;
