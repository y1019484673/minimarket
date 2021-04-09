const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware(
      '/api',
      {
        target: "http://fbtestm.ectrip.com",
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    )
  );
};
