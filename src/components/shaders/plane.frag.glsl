#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 out_color;

void main() {
    out_color = vec4(v_uv.x, v_uv.y, 1.0, 1.0);
}