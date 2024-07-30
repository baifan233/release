
#version 330 core
uniform float iTime;
uniform float dayPercent;

varying vec2 vST;

out vec4 FragColor;

#define saturate(x) clamp(x,0.,1.)
#define rgb(r,g,b) (vec3(r,g,b)/255.)

float rand(float x) { return fract(sin(x) * 71.5413291); }

float rand(vec2 x) { return rand(dot(x, vec2(13.4251, 15.5128))); }

float noise(vec2 x)
{
    vec2 i = floor(x);
    vec2 f = x - i;
    f *= f*(3.-2.*f);
    return mix(mix(rand(i), rand(i+vec2(1,0)), f.x),
               mix(rand(i+vec2(0,1)), rand(i+vec2(1,1)), f.x), f.y);
}

float fbm(vec2 x)
{
    float r = 0.0, s = 1.0, w = 1.0;
    for (int i=0; i<5; i++)
    {
        s *= 2.0;
        w *= 0.5;
        r += w * noise(s * x);
    }
    return r;
}

float cloud(vec2 uv, float scalex, float scaley, float density, float sharpness, float speed)
{
    return pow(saturate(fbm(vec2(scalex,scaley)*(uv+vec2(speed,0)*iTime))-(1.0-density)), 1.0-sharpness);
}

uniform vec3 colors[4];

vec3 render(vec2 uv)
{
       
        /*
        c1=nc1;
        c2=nc2;
        c3=nc3;
        c4=nc4;
        */
    // sky
     vec3 color = mix(colors[0],colors[1], uv.y);
    // sun
    /*
    vec2 spos = uv - vec2(0.2, 0.65);
    float sun = exp(-250.*dot(spos,spos));
    vec3 scol = rgb(255,255,255) * sun * 0.6;
    color += scol;
    */
   
  // clouds
    vec3 cl1 = mix(rgb(38,60,145), rgb(255,60,145),uv.y);
    float d1 = mix(0.9,0.1,pow(uv.y, 0.7));
    color = mix(color, colors[2], cloud(uv,2.,8.,d1,0.4,0.04));    
    color = mix(color,colors[2], 5.*cloud(uv,12.,15.,0.9,0.75,0.03) * cloud(uv,2.,8.,0.5,0.0,0.02)*uv.y);
    // post
    color *= vec3(1.0,0.93,0.81)*1.04;
    color = mix(0.75*colors[3], color, smoothstep(-0.1,0.3,uv.y));
    color = pow(color,vec3(1.3));
    
   
    vec2 lightPos = vec2(0.6,0.8);
    float lightRadius = 0.05;
    vec2 ray = uv - lightPos;
    float dd = dot(ray, ray);
    if (dd < lightRadius * lightRadius) color += 1.0;
    else color += 1.0 - acos(lightRadius / sqrt(dd)) / 1.57;

    return color;
}

uniform float sx;
uniform float sy;
vec3 Orb(vec2 uv, vec3 color, float radius)
{          
    vec2 position=vec2(0,0.5);    
    radius = ((radius * 0.1) + 0.005);
    float dist = radius / distance(uv, position);
    return color * pow(dist, 1.0 / 0.5);
}

void main() 
{
    vec2 uv = vST.xy ;
    uv.x -= 0.5;
    uv.x*=sx/sy;
	FragColor = vec4(render(uv),1.0);
   
}
