#version 330 core 

attribute vec2 aVertex;

uniform sampler2D uColor;

varying vec2 vPositionUnits;
varying vec2 vST;

void main() {
    vec2 size = textureSize(uColor, 0);

    vec2 pxClip = aVertex.xy;
    vec2 vPositionUnits = ((pxClip + 1) / 2) * size;

    vST = (pxClip + 1) / 2;

    gl_Position.xy = aVertex.xy;
    gl_Position.z = 0; //FIXME: SHould setting depth values be allowed?
    gl_Position.w = 1;
}