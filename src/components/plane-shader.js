// Based off of this answer - https://github.com/aframevr/aframe/issues/2159#issuecomment-267613232
AFRAME.registerShader("planeShader", {
  schema: {
    src: { type: "map" },
  },
  vertexShader: require("./shaders/plane.vert.glsl"),
  fragmentShader: require("./shaders/plane.frag.glsl"),
  raw: true,
  init: function (data) {
    // new THREE.TextureLoader().load( data.src, (tex) => {
    //     console.log(tex)
    //     this.material.uniforms.u_tex.value = tex;
    //     this.material.needsUpdate = true
    // } );

    this.material = new THREE.RawShaderMaterial({
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader,
      uniforms: {
        // u_tex: {
        //     type: 't',
        //     value:  new THREE.TextureLoader().load( document.getElementById( data.src ).src )
        // }
      },
      transparent: true,
    });
  },
});
