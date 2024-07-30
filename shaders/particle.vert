

#version 330 compatibility 

layout (location=0) in vec2 aVertex;
layout (location=1) in vec2 TexCoords;
layout (location=2) in vec3 uPosition;//pos angle overturn
layout (location=3) in vec4 texColor;//color
layout (location=4) in vec4 psize;//size texcoordOffset

uniform mat3 uViewportTransform;

uniform sampler2D tSprite;
float dAngle=0.0f;
varying vec2 vST;
float aVx=0.0f;
float aVy=0.0f;
vec2 vertex=aVertex.xy;
out vec4 tColor;
void vRotationTransform()
{
aVx=vertex.x;
aVy=vertex.y;
if(dAngle==0.0f)return;
float dX=vertex.x;
float dY=vertex.y;
float angle=3.1415926f*dAngle/180.f;//角度转弧度
aVx = dX * cos(angle) - dY * sin(angle);
aVy = dX * sin(angle) + dY * cos(angle);
}
void main() {     
    vertex.xy*=psize.xy;
    dAngle = uPosition.z;
    vRotationTransform();
    vec3 pxPosition = vec3( aVx + uPosition.x,
                            aVy + uPosition.y, 1);

    float leftP = 0;
    leftP = step(gl_VertexID,0.f);// 如果顶点index >0 则left=0 否则则left=1  当index是0 那left=1
    leftP = (1-leftP) *step(gl_VertexID,2.f);//当left等于1 那就应该让后面的step无效 ×0 若left是0 那后面的值×1  后面的step用于判断是否大于3
    vST.x = psize.a * (1-step(leftP,0.f)) + psize.b *step(leftP,0.f);       

    vST.y = TexCoords.y;
    gl_Position =  vec4((uViewportTransform * pxPosition).xy, 1, 1);
    tColor = texColor;    
}