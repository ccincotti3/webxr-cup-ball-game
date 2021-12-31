function requireAll(req) {
  req.keys().forEach(req);
}

requireAll(require.context("./components/", true, /\.js$/));
require("./scene.html");

if (module.hot) {
  module.hot.accept();
}
console.warn = function () {};
