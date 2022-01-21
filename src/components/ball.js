import CONFIG from "../constants/config";

AFRAME.registerComponent("ball", {
  schema: {
    ropeLength: { type: "number", default: CONFIG.STARTING_ROPE_LENGTH },
    target: { type: "string", default: "" },
  },
  init: function () {
    this.setTarget();
  },

  update(oldData) {
    if (oldData.ropeLength !== this.data.ropeLength) {
      this.setTarget();
    }
  },

  setTarget: function () {
    this.el.setAttribute("ammo-constraint", {
      target: this.data.target + "-" + String(this.data.ropeLength - 1),
      type: "hinge",
      pivot: "0 0.10 0",
    });
  },
});
