const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("접근 거부. 주어진 토큰이 없습니다");
  //토큰 검증(복호화)
  try {
    const decoded = jwt.verify(token, config.get("jwtprivatekey"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("유효한 토큰이 아닙니다");
  }
};
