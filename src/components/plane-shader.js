// Based off of this answer - https://github.com/aframevr/aframe/issues/2159#issuecomment-267613232
AFRAME.registerShader("planeShader", {
  schema: {
    src: { type: "map" },
    selected: { type: "boolean", default: false },
    ratio: { type: "number", is: "uniform", default: 1 },
  },
  vertexShader: require("./shaders/plane.vert.glsl"),
  fragmentShader: require("./shaders/plane.frag.glsl"),
  raw: true,
  init: function (data) {
    this.primaryColor = new THREE.Vector3(0.937, 0.843, 0.6);
    this.secondaryColor = new THREE.Vector3(0.851, 0.651, 0.427);
    this.selectedColor = new THREE.Vector3(0, 0.7, 0.1);
    this.ratio = data.ratio;

    this.material = new THREE.RawShaderMaterial({
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader,
      uniforms: {
        u_primary_color: {
          type: "vec3",
          value: this.primaryColor,
        },
        u_secondary_color: {
          type: "vec3",
          value: this.secondaryColor,
        },
        u_ratio: {
          type: "number",
          value: this.ratio,
        },
      },
      transparent: true,
    });
  },

  update: function (data) {
    const isSelected = data.selected;
    const ratio = data.ratio;
    this.material.uniforms.u_primary_color.value = isSelected
      ? this.selectedColor
      : this.primaryColor;
    this.material.uniforms.u_secondary_color.value = isSelected
      ? this.selectedColor
      : this.secondaryColor;
    this.material.needsUpdate = true;
  },
});
