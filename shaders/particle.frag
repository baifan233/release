#version 330 core

uniform sampler2D tSprite;
in vec4 tColor;
varying vec2 vST;

uniform float time = 0;
uniform float bloomSize = 1;
layout(location=0) out vec4 Color;
layout(location=1) out vec4 bloomColor;
void main() 
{
    Color = texture2D(tSprite, vST)*tColor;
    bloomColor = Color;
    bloomColor.a*=bloomSize;
}