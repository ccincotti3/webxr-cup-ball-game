AFRAME.registerShader("planeShader", {
    vertexShader: require('./shaders/plane.vert.glsl'),
    fragmentShader: require('./shaders/plane.frag.glsl'),
    raw: true
})
