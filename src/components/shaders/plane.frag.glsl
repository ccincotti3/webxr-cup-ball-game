#version 300 es
precision highp float;

in vec2 v_uv;

uniform vec3 u_primary_color;
uniform vec3 u_secondary_color;
uniform float u_ratio;

out vec4 out_color;

// iquilezles.org
float sdBox( in vec2 p, in vec2 b )
{
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

void main()
{
    vec2 p = v_uv - 0.5; 
    p.x *= u_ratio;
    float d = sdBox(p, vec2(0.4 * u_ratio, 0.4)) - 0.05;
    if(d > 0.05) {
        discard;
    }
	vec3 col = mix( u_secondary_color, u_primary_color, 1.0-smoothstep(-0.02,-0.01,d) );
    out_color = vec4(col, 1.0);
}