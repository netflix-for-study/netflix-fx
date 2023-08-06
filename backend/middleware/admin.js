const config = require("config");
const username = config.get("username");

module.exports = function (req, res, next) {
  const isAdmin = req.user.username === username;
  //관리자 확인
  if (isAdmin) return next();
  //관리자 외 접근거부(관리자 권한 확인)
  if (!req.user.isAdmin) return res.status(403).send("관리자 권한이 없습니다.");
};
