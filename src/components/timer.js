AFRAME.registerComponent("timer", {
  init: function () {
    this.tick = AFRAME.utils.throttleTick(this.tick, 1000, this);
  },

  update: function () {},

  tick: function (time, dt) {
    this.el.emit("setTimeElapsed", { elapsed: time });
  },
});
