const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  const target =
    "http://3.37.219.154";

  app.use(
    "/api/v1",
    createProxyMiddleware({
      target,
      changeOrigin: true,
    })
  );
};
