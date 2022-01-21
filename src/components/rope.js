import CONFIG from "../constants/config";

AFRAME.registerComponent("rope", {
  schema: {
    ropeLength: { type: "number", default: CONFIG.STARTING_ROPE_LENGTH },
    enabled: { type: "boolean", default: false },
  },
  init: function () {
    this.setLinkPhysics = this.setLinkPhysics.bind(this);
    this.initRope();
  },

  update: function (oldData) {
    if (this.data.enabled && oldData.ropeLength !== this.data.ropeLength) {
      for (let i = 0; i < this.el.children.length; i++) {
        const c = this.el.children[i];
        this.setLinkPhysics(c, i);
      }
    }
  },

  initRope: function () {
    // attach rope segments
    // TODO: maybe make a pool?
    let lastId = this.el.parentElement.id;
    for (let i = 0; i < this.el.children.length; i++) {
      const c = this.el.children[i];

      // This is the best way to handle this. All targets and objects
      // need to be rendered otherwise when adding things to the DOM
      // on the fly, weird physics happens.

      // The trick is to set the target on everything, the type, and change the pivot
      // to create the illusion of space in the rope (or lack of).
      c.setAttribute("ammo-constraint", {
        target: "#" + lastId,
        type: "hinge",
        pivot: "0 0.10 0",
      });

      lastId = c.id;
    }
  },

  setLinkPhysics: function (link, linkIndex) {
    link.setAttribute("ammo-body", {
      linearDamping: linkIndex < this.data.ropeLength ? "0.2" : "0.01",
      angularDamping: linkIndex < this.data.ropeLength ? "0.01" : "0",
    });

    link.setAttribute("ammo-constraint", {
      pivot: linkIndex < this.data.ropeLength ? "0 0.10 0" : "0 0 0",
    });
  },
});
