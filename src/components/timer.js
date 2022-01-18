AFRAME.registerComponent("timer", {
  init: function () {
    this.tick = AFRAME.utils.throttleTick(this.tick, 500, this);
  },

  tick: function (time, dt) {
    this.el.emit("setTimeElapsed", { elapsed: time });
  },
});
