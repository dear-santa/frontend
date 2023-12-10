const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  const target =
    process.env.REACT_APP_BACK_SERVER_URL || "http://localhost:8080";

  app.use(
    "/",
    createProxyMiddleware({
      target,
      changeOrigin: true,
    })
  );
};