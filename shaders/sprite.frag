#version 330 core

uniform sampler2D tSprite;
uniform vec4 texColor;
varying vec2 vST;

uniform float time = 0;
uniform float bloomSize = 1;
uniform vec3 shakeP= vec3(0,0,0);
layout(location=0) out vec4 Color;
layout(location=1) out vec4 bloomColor;
void main() 
{
    vec2 shake=vec2(0,0);
    if (vST.y > shakeP.x && vST.y < shakeP.y)
    {
        shake = vec2(sin(time)*shakeP.z ,0);
    }

    Color = texture2D(tSprite, vST-shake)*texColor;
    bloomColor = Color;
    bloomColor.a*=bloomSize;
}