AFRAME.registerComponent("cup", {
  init: function () {
    this.el.addEventListener("model-loaded", this.onLoaded.bind(this));
  },

  onLoaded: function () {
    // Do this here since we need the model to be loaded before we can use type: mesh
    this.el.setAttribute(
      "ammo-body",
      "collisionFilterMask: 1; type: kinematic; emitCollisionEvents: true; disableCollision: false;"
    );
    this.el.setAttribute("ammo-shape", "type: hacd");

    const tree3D = this.el.getObject3D("mesh");
    tree3D.traverse(function (node) {
      if (node.isMesh) {
        node.material = new THREE.MeshPhongMaterial({ color: 0x624226 });
      }
    });
  },
});
