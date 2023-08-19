const express = require("express");
const config = require("config");

const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// 프로필 페이지
router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId;
    const user = await User.findById(userId);

    res.json(user);
  } catch (err) {
    res.status(401).send("유효하지 않은 토큰입니다.");
  }
});

//찜한 영화 목록 조회
router.get("/favoritelist", async (req, res) => {
  try {
    const userId = req.query.userId;
    const user = await User.findById(userId);
    res.json(user.favoriteList);

    // res.json({ favoriteList: user.favoriteList });
  } catch (err) {
    res.status(401).send("찜한 영화목록 조회 실패");
  }
});

//찜한 영화 추가
router.post("/favoritelist", async (req, res) => {
  try {
    const userId = req.query.userId;
    const user = await User.findById(userId);
    const { movieId } = req.body;

    if (user.favoriteList.includes(movieId)) {
      return res.status(400).send("이미 찜한 영화입니다.");
    }
    user.favoriteList.push(movieId);
    await user.save();

    res.send("영화 찜하기 완료");
  } catch (err) {
    res.status(500).send("서버 오류");
  }
});

//찜한 영화 삭제
router.delete("/favoritelist/:id", async (req, res) => {
  try {
    const userId = req.query.userId;
    const user = await User.findById(userId);
    const movieId = req.params.id;
    const index = user.favoriteList.indexOf(movieId);

    //배열 인덱스가 -1인 경우: 리스트 내 영화가 없음
    if (index !== -1) {
      user.favoriteList.splice(index, 1);
      await user.save();
    }

    res.status(200).send("찜한 영화 삭제 완료");
  } catch (err) {
    res.status(500).send("서버 오류");
  }
});

module.exports = router;
