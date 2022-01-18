const PHYSICS = require('../constants/physics.js');

const getConfig = (ropeContainerId) => {
  return {
    SEGMENT: {
      idPrefix: ropeContainerId + "-segment",
      radius: "0.02",
      disableCollision: "true",
      collisionFilterGroup: PHYSICS.ropeSegment.group,
      collisionFilterMask: PHYSICS.ropeSegment.mask,
      type: PHYSICS.ropeSegment.type,
      getLinearDamping: (_segmentNumber) => 0.2,
      color: "white",
    },
    BALL: {
      idPrefix: ropeContainerId + "-ball",
      radius: "0.05",
      collisionFilterGroup: PHYSICS.ball.group,
      collisionFilterMask: PHYSICS.ball.mask,
      type: PHYSICS.ball.type,
      disableCollision: "false",
      getLinearDamping: (_segmentNumber) => 0.2,
      color: "pink",
    },
  };
};
AFRAME.registerComponent("rope", {
  schema: {
    ropeLength: { type: "number", default: 0 },
    enabled: { type: "boolean", default: false },
  },
  init: function () {
    this.ballEl = null;
  },

  update: function (oldData) {
    if (
      oldData.enabled !== this.data.enabled || (
      oldData.ropeLength !== undefined &&
      oldData.ropeLength !== this.data.ropeLength
    )) {
        while (this.el.firstChild) {
          // This seems like overkill
          this.el.removeChild(this.el.lastChild);
        }
        if(this.data.enabled) {
          console.log("INIT ROPE", this.data)
          this.initRope(this.data.ropeLength);
        }
    }
  },

  initRope(numSegments) {
    const ropeContainer = this.el;
    const ropeConfig = getConfig(ropeContainer.id);

    let lastId = this.el.parentElement.id;

    // attach rope segments
    // TODO: maybe make a pool?
    for (let i = 0; i < numSegments; i++) {
      const el = this.initRopeEl(i, ropeConfig.SEGMENT);
      this.addPhysics(el, lastId, ropeConfig.SEGMENT, i);
      ropeContainer.append(el);
      lastId = el.id;
    }

    // add ball
    this.ballEl = this.initRopeEl(0, ropeConfig.BALL);
    this.addPhysics(this.ballEl, lastId, ropeConfig.BALL);
    ropeContainer.append(this.ballEl);
  },

  initRopeEl(i, config) {
    const el = document.createElement("a-sphere");
    el.id = `${config.idPrefix}-${i}`;
    el.setAttribute(
      "scale",
      `${config.radius} ${config.radius} ${config.radius}`
    );
    el.setAttribute("position", "0 -0.2 0.0");
    el.setAttribute("material", { color: config.color });
    return el;
  },

  addPhysics(el, target, config, i = 0) {
    const linearDamping = config.getLinearDamping(i);
    const sphereRadius = config.radius;
    const collisionFilterGroup = config.collisionFilterGroup;
    const collisionFilterMask = config.collisionFilterMask;
    const disableCollision = config.disableCollision;
    const type = config.type;
    el.setAttribute(
      "ammo-constraint",
      `target: #${target}; type: hinge; pivot: 0 0.10 0`
    );
    el.setAttribute(
      "ammo-body",
      `disableCollision: ${disableCollision}; collisionFilterGroup: ${collisionFilterGroup}; collisionFilterMask: ${collisionFilterMask}; linearDamping:  ${linearDamping}; mass: 1; type: ${type}; activationState: disableDeactivation;`
    );
    el.setAttribute(
      "ammo-shape",
      `fit: manual; type: sphere; sphereRadius: ${sphereRadius}`
    );
  },

  removePhysics(el) {
    Object.values(PHYSICS).forEach((prop) => {
      el.removeAttribute(prop);
    });
  },
});
