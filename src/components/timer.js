AFRAME.registerComponent("timer", {
  init: function () {
    this.tick = AFRAME.utils.throttleTick(this.tick, 500, this);
  },

  // update: function(oldData) {
  //     if(oldData.startTime && oldData.startTime !== this.data.startTime) {

  //     }
  // },

  tick: function (time, dt) {
    // const timeInSeconds = Math.floor((time - this.data.startTime) / 1000)
    this.el.emit("setTimeElapsed", { elapsed: time });
  },
});
