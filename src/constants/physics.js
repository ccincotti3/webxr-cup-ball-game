const TYPES = {
  KINEMATIC: "kinematic",
  STATIC: "static",
  DYNAMIC: "dynamic",
};
const PHYSICS = {
  ball: {
    group: 1,
    mask: 1 + 2 + 4 + 8,
    type: TYPES.DYNAMIC,
  },
  ground: {
    group: 2,
    mask: 1 + 2 + 4 + 8 + 16,
    type: TYPES.STATIC,
  },
  cup: {
    group: 4,
    mask: 1 + 2 + 4,
    type: TYPES.KINEMATIC,
  },
  hand: {
    group: 4,
    mask: 1 + 2 + 4,
    type: TYPES.KINEMATIC,
  },
  hitPlane: {
    group: 8,
    mask: 1,
    type: TYPES.STATIC,
  },
  ropeSegment: {
    group: 16,
    mask: 2,
    type: TYPES.DYNAMIC,
  },
};

module.exports = PHYSICS;
