AFRAME.registerComponent("target", {
  init: function () {
    this.el.addEventListener("collidestart", (evt) => {
      this.el.emit("increaseScore", { points: 1 });
    });
  },
});
