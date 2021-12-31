const getConfig = (totalSegments) => {
  return {
    SEGMENT: {
      idPrefix: "segment",
      radius: "0.02",
      collisionFilterGroup: "2",
      collisionFilterMask: "2",
      disableCollision: "true",
      getLinearDamping: (_segmentNumber) => 0.2,
      color: "white",
    },
    BALL: {
      idPrefix: "ball",
      radius: "0.05",
      collisionFilterGroup: "1",
      collisionFilterMask: "5",
      disableCollision: "false",
      getLinearDamping: (_segmentNumber) => 0.2,
      color: "pink",
    },
  };
};
AFRAME.registerComponent("rope", {
  schema: {
    initialLength: { type: "number", default: 5 },
    addLength: { type: "number", default: 0 },
  },
  init: function () {
    this.initRope(this.data.initialLength);
  },

  update: function (oldData) {
    if (
      oldData.addLength !== undefined &&
      oldData.addLength !== this.data.addLength
    ) {
      while (this.el.firstChild) {
        // Probably can just remove ammo components
        // https://aframe.io/docs/1.2.0/core/entity.html#removeattribute-componentname-propertyname
        this.el.removeChild(this.el.lastChild);
      }
      this.initRope(this.data.initialLength + this.data.addLength);
    }
  },

  initRope(numSegments) {
    const ropeConfig = getConfig(numSegments);
    const ropeContainer = this.el;

    let lastId = this.el.parentElement.id;

    // attach rope segments
    // TODO: maybe make a pool?
    for (let i = 0; i < numSegments; i++) {
      const el = this.initRopeEl(i, ropeConfig.SEGMENT);
      this.initRopeElPhysics(el, lastId, ropeConfig.SEGMENT, i);
      ropeContainer.append(el);
      lastId = el.id;
    }

    const ballEl = this.initRopeEl(0, ropeConfig.BALL);
    this.initRopeElPhysics(ballEl, lastId, ropeConfig.BALL);
    ropeContainer.append(ballEl);
  },

  initRopeEl(i, config) {
    const el = document.createElement("a-sphere");
    el.id = `${config.idPrefix}-${i}`;
    el.setAttribute(
      "scale",
      `${config.radius} ${config.radius} ${config.radius}`
    );
    el.setAttribute("position", "0 -0.2 0.0");
    el.setAttribute("material", `color: ${config.color}`);
    return el;
  },

  initRopeElPhysics(el, target, config, i = 0) {
    const linearDamping = config.getLinearDamping(i);
    const sphereRadius = config.radius;
    const collisionFilterGroup = config.collisionFilterGroup;
    const collisionFilterMask = config.collisionFilterMask;
    const disableCollision = config.disableCollision;
    el.setAttribute(
      "ammo-constraint",
      `target: #${target}; type: hinge; pivot: 0 0.10 0`
    );
    el.setAttribute(
      "ammo-body",
      `disableCollision: ${disableCollision}; collisionFilterGroup: ${collisionFilterGroup}; collisionFilterMask: ${collisionFilterMask}; linearDamping:  ${linearDamping}; mass: 1; type: dynamic; activationState: disableDeactivation;`
    );
    el.setAttribute(
      "ammo-shape",
      `fit: manual; type: sphere; sphereRadius: ${sphereRadius}`
    );
  },
});
