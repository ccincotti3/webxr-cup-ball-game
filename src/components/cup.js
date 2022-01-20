const PHYSICS = require("../constants/physics.js");

AFRAME.registerComponent("cup", {
  schema: {
    enabled: { type: "boolean", default: false },
  },
  init: function () {
    this.loaded = false;
    this.el.addEventListener("model-loaded", this.onLoaded.bind(this));

    this.setCollisionAndVisibility = this.setCollisionAndVisibility.bind(this);

    window.addEventListener("h", () => {
      this.el.sceneEl.emit("leftPlaneHit");
    });
  },

  update: function (oldData) {
    if (this.loaded && oldData.enabled !== this.data.enabled) {
      this.setCollisionAndVisibility(this.data.enabled);
    }
  },

  setCollisionAndVisibility: function (isActive) {
    const object3d = this.el.object3D;
    object3d.visible = isActive;
    // this.el.setAttribute("ammo-body", {
    //   disableCollision: !isActive,
    //   emitCollisionEvents: isActive,
    // });
  },

  onLoaded: function () {
    // Do this here since we need the model to be loaded before we can use type: mesh
    this.el.setAttribute("ammo-body", {
      collisionFilterMask: PHYSICS.cup.mask,
      collisionFilterGroup: PHYSICS.cup.group,
      type: PHYSICS.cup.type,
    });
    this.el.setAttribute("ammo-shape", "type", "hacd");
    this.setCollisionAndVisibility(this.data.enabled);
    const tree3D = this.el.getObject3D("mesh");
    tree3D.traverse(function (node) {
      if (node.isMesh) {
        node.material = new THREE.MeshPhongMaterial({ color: 0x624226 });
      }
    });

    this.loaded = true;
  },
});
