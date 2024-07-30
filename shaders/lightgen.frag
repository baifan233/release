#version 330 core

uniform float uConstant, uLinear, uQuadratic;
uniform float uRadius;

uniform vec3 uLightPosition, uLightColor;

uniform sampler2D uColor;
uniform int screenHeight=900;
varying vec2 vST;
varying vec2 vPositionUnits;

layout(location=0) out vec4 Color;

void main() {
    vec3 vp = vec3(gl_FragCoord.x, screenHeight - gl_FragCoord.y , 0);
    float distance = length(vec3(vp) - uLightPosition);
    float dn = (distance / uRadius );

    //float Attenuation = 1.0 / (uConstant + (uLinear * distance) + (uQuadratic * distance * distance)) 

    float intensity = 1 / (uConstant + (dn * uLinear) + (dn * dn * uQuadratic));

    vec3 nm = vec3(0.5f,0.5f,1.f);
    //vec3 nm = texture2D(uColor, vST, 0).rgb;
    vec3 n = normalize((2 * nm) - 1);
    vec3 l = normalize(uLightPosition - vp);
    float diffuseStrength = max(0, dot(l, n));
    Color.rgb = uLightColor * diffuseStrength + texture2D(uColor, vST, 0).rgb;    
    Color.a = clamp(intensity, 0, 1);

}