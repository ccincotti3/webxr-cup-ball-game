const PHYSICS = require("../constants/physics.js");

// scale="0.1 0.1 0.1"
// id="cursorMesh{{hand}}"
// bind__visible="!({{ cupEnabled(hand) }})"
// ammo-body="type: {{PHYSICS.hand.type}}; collisionFilterMask: {{PHYSICS.hand.mask}}; collisionFilterGroup: {{PHYSICS.hand.mask}}"
// bind__ammo-body="disableCollision: hand === '{{hand}}'; emitCollisionEvents: hand !== '{{hand}}'"
// ammo-shape
// >

AFRAME.registerComponent("collidable-visible", {
  schema: {
    type: { type: "string" },
    enabled: { type: "boolean", default: false },
  },
  init: function () {
    this.setCollisionAndVisibility = this.setCollisionAndVisibility.bind(this);

    this.onLoaded = this.onLoaded.bind(this);

    this.onLoaded();
  },

  update: function (oldData) {
    if (oldData.enabled !== this.data.enabled) {
      this.setCollisionAndVisibility(this.data.enabled);
    }
  },

  setCollisionAndVisibility: function (isActive) {
    const object3d = this.el.object3D;
    object3d.visible = isActive;
  },

  onLoaded: function () {
    // Do this here since we need the model to be loaded before we can use type: mesh
    this.setCollisionAndVisibility(this.data.enabled);
    const physicsType = this.data.type;
    this.el.setAttribute("ammo-body", {
      disableCollision: false,
      emitCollisionEvents: true,
      collisionFilterMask: PHYSICS[physicsType].mask,
      collisionFilterGroup: PHYSICS[physicsType].group,
      type: PHYSICS[physicsType].type,
    });
    console.log(
      "DISABLECOLLISIONS",
      this.el.getAttribute("ammo-body").disableCollision
    );
    console.log("EMIT", this.el.getAttribute("ammo-body").emitCollisionEvents);
    this.el.setAttribute("ammo-shape", "type", "hull");
  },
});
