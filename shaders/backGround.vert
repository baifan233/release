#version 330 core

attribute vec2 aVertex;

varying vec2 vST;

void main() {
    //vST = aVertex.xy;  注释掉下面这行 用这行可以做特效
    vST = ((aVertex + 1) / 2).xy;
    gl_Position = vec4(aVertex.xy, 0, 1);
}