const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  console.log("Setting up proxy endpoints");
  app.use(proxy("/api", { target: "http://localhost:3001" }));
};
