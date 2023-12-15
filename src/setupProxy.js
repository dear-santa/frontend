const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // process.env.REACT_APP_BACK_SERVER_URL
  const target = "http://3.37.219.154";

  app.use(
    "/api/v1",
    createProxyMiddleware({
      target,
      changeOrigin: true,
    })
  );
};
