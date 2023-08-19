const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // 이 경로로 시작하는 요청은 프록시로 전달
    createProxyMiddleware({
      target: "http://localhost:8080", // 백엔드 서버 주소 입력
      changeOrigin: true,
    })
  );
};
