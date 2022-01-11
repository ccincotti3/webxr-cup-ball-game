AFRAME.registerComponent("controller", {
  init: function () {
    this.controllerType = "";

    this.el.addEventListener("controllerconnected", (evt) => {
      this.el.emit("enableControllerControls");
    });
  },
});
