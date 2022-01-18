function requireAll(req) {
  req.keys().forEach(req);
}

require("aframe-proxy-event-component");
require("aframe-haptics-component");
require("aframe-extras");
require("aframe-state-component");
require("aframe-environment-component");
require("nunjucks");

requireAll(require.context("./components/", true, /\.js$/));
require("./scene.html");

if (module.hot) {
  module.hot.accept();
}
console.warn = function () {};
