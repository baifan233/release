

#version 330 compatibility 

layout (location=0) in vec2 aVertex;
layout (location=1) in vec2 TexCoords;

uniform mat3 uViewportTransform;
uniform vec2 uPosition;
uniform sampler2D tSprite;
uniform float dAngle=0.0f;
uniform vec2 psize={64,64};
varying vec2 vST;
float aVx=0.0f;
float aVy=0.0f;
vec2 vertex=aVertex.xy;

void vRotationTransform()
{
aVx=vertex.x;
aVy=vertex.y;
if(dAngle==0.0f)return;
float dX=vertex.x;
float dY=vertex.y;
float angle=3.1415926f*dAngle/180.f;//½Ç¶È×ª»¡¶È
aVx = dX * cos(angle) - dY * sin(angle);
aVy = dX * sin(angle) + dY * cos(angle);
}
void main() {     
    vertex.xy*=psize.xy;
    
    vRotationTransform();
    vec3 pxPosition = vec3( aVx + uPosition.x,
                            aVy + uPosition.y, 1);

    gl_Position =  vec4((uViewportTransform * pxPosition).xy, 1, 1);

    vST = vec2(TexCoords.x,TexCoords.y);
}