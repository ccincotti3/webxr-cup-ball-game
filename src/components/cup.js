const PHYSICS = require('../constants/physics.js');

AFRAME.registerComponent("cup", {
  schema: {
    enabled: { type: "boolean", default: false },
  },
  init: function () {
    this.loaded = false;
    this.el.addEventListener("model-loaded", this.onLoaded.bind(this));
  },

  update: function (oldData) {
    if (this.loaded && oldData.enabled !== this.data.enabled) {
      if (this.data.enabled) {
        this.addPhysicsAndVisibility();
      } else {
        this.removePhysicsAndVisiblity();
      }
    }
  },

  addPhysicsAndVisibility() {
    const object3d = this.el.object3D;
    object3d.visible = true;
    this.el.setAttribute("ammo-body", {
      collisionFilterMask: PHYSICS.cup.mask,
      collisionFilterGroup: PHYSICS.cup.group,
      type: PHYSICS.cup.type,
      emitCollisionEvents: true,
      disableCollision: false,
    });
    this.el.setAttribute("ammo-shape", "type: hacd");
  },

  removePhysicsAndVisiblity() {
    const object3d = this.el.object3D;
    object3d.visible = false;
    this.el.removeAttribute("ammo-body");
    this.el.removeAttribute("ammo-shape");
  },

  onLoaded: function () {
    // Do this here since we need the model to be loaded before we can use type: mesh
    // this.addPhysicsAndVisibility()
    this.removePhysicsAndVisiblity();
    const tree3D = this.el.getObject3D("mesh");
    tree3D.traverse(function (node) {
      if (node.isMesh) {
        node.material = new THREE.MeshPhongMaterial({ color: 0x624226 });
      }
    });

    this.loaded = true;
  },
});
