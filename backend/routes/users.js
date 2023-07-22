const express = require("express");
const CryptoJS = require("crypto-js");
const config = require("config");

const User = require("../models/User");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");

const router = express.Router();

//사용자 회원가입
router.post("/signup", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("이미 가입된 회원입니다.");
  }

  user = new User({
    username: req.body.username,
    email: req.body.email,

    //비밀번호 암호화(crypto-js 라이브러리 사용)
    password: CryptoJS.AES.encrypt(
      req.body.password,
      config.get("cryptojskey").toString()
    ),
  });

  user = await user.save();
  res.status(200).send(user);
});

//사용자 회원정보 수정
router.put("/:id", auth, async (req, res) => {
  //비밀번호 업데이트
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      config.get("cryptojskey").toString()
    );
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  if (!user) return res.status(404).send("업데이트 실패");

  res.status(200).send(user);
});

//사용자 회원탈퇴
router.delete("/:id", [auth, admin], async (req, res) => {
  const user = User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(400).send("회원정보 없음");

  res.status(200).send("회원탈퇴 성공");
});

//사용자 정보 조회
router.get("/:id", [auth, admin], async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("사용자 조회 실패");

  res.status(200).send(user);
});

//모든 사용자 정보 조회
router.get("/", [auth, admin], async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(404).send("사용자 없음");

  res.status(200).send(users);
});

module.exports = router;
