#version 300 es

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

in vec3 position;
in vec2 uv;

out vec2 v_uv;

void main() {
    v_uv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}