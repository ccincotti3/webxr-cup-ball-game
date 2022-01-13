#version 300 es
precision highp float;

in vec2 v_uv;

uniform sampler2D u_tex;
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

float sdCircle( vec2 p, float r )
{
    return length(p) - r;
}

void main()
{
    // vec4 tex_color = texture(u_tex, v_uv);
    // if(tex_color.a < 0.05) {
    //     discard;
    // }
    // out_color = tex_color;
    vec2 p = v_uv - 0.5; 
    p.x *= u_ratio;
    // float d = sdCircle(uv2, 0.5);
    float d = sdBox(p, vec2(0.4 * u_ratio, 0.4)) - 0.05;
    if(d > 0.05) {
        discard;
    }
    // vec3 col = vec3(1.0) - sign(d)*vec3(0.851,0.651,0.427);
	vec3 col = mix( u_secondary_color, u_primary_color, 1.0-smoothstep(-0.02,-0.01,d) );
	// col *= 1.0 - exp(-3.0*abs(d));
	// col *= 0.8 + 0.2*cos(150.0*d);
	// col = mix( col, vec3(1.0), 1.0-smoothstep(0.0,0.01,abs(d)) );
    out_color = vec4(col, 1.0);
}