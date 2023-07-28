const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const Movie = require("./Movie");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "" },
    profile: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Profile",
        },
      ],
      //프로필 개수 제한(최대 5개)
      validate: {
        validator: function (profiles) {
          return profiles.length <= 5;
        },
        message: "프로필은 최대 5개까지 등록 가능합니다.",
      },
    },

    //isAdmin: 관리자 권한
    isAdmin: { type: Boolean, default: false },

    //oauth 로그인
    google: {
      id: String,
      username: String,
      email: String,
      profilePicture: String,
    },
    kakao: {
      id: String,
      username: String,
      email: String,
      profilePicture: String,
    },
    naver: {
      id: String,
      username: String,
      email: String,
      profilePicture: String,
    },

    watchList: [{ type: mongoose.Schema.Types.ObjectId, ref: Movie }],
    favoriteList: [{ type: mongoose.Schema.Types.ObjectId, ref: Movie }],
  },
  { timestamps: true }
);

//사용자 인증토큰 생성
userSchema.methods.generateAuthToken = function (user) {
  const token = jwt.sign(
    //payload(토큰에 포함된 페이로드)
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    //비밀키
    config.get("jwtprivatekey"),
    //토큰 만료시간
    { expiresIn: "1d" }
  );
  return token;
};

//User 모델 생성
const User = mongoose.model("User", userSchema);

module.exports = User;
