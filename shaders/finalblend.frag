/*   黑化?
#version 330 compatibility
uniform sampler2D uColor, uIntensity;
varying vec2 vST;
out vec4 FragColor;
uniform vec3 ambientLight={.05,.1,.25};
uniform float k=1.0f;					  
vec4 xposure(vec4 _color, float gray, float ex)  
{							  
	float b = (4.0*ex - 1.0);     
	float a = 1.0 - b;          
	float f = gray*(a*gray + b); 
	return f*_color;		  
}							  
void main() 
{
	vec4 _dsColor={1,1,1,1};
	_dsColor.rgb = texture(uColor, vST, 0).rgb * (ambientLight+ texture2D(uIntensity, vST, 0).rgb); 
	float _lum = 0.3*_dsColor.x + 0.59*_dsColor.y;    
	vec4 _fColor = texture2D(uColor, vST);  
	FragColor = xposure(_fColor, _lum, k);
	FragColor.rgb*=(ambientLight+ texture2D(uIntensity, vST, 0).rgb);
    //FragColor.rgb = texture(uColor, vST, 0).rgb * (ambientLight+ texture2D(uIntensity, vST, 0).rgb);
    //FragColor.rgb = texture(uColor, vST, 0).rgb;    
    //FragColor.a = 1;
}
*/


#version 330 core

uniform sampler2D uColor;
uniform sampler2D uIntensity;

in vec2 TexCoords;

out vec4 FragColor;
uniform vec3 ambientLight={.05,.1,.25};

void main() {
    FragColor.rgb = texture(uColor, TexCoords, 0).rgb * (ambientLight*1.2+ texture2D(uIntensity, TexCoords, 0).rgb);
    //FragColor.rgb = texture(uColor, TexCoords, 0).rgb;    
	
    //FragColor = texture(uColor, TexCoords, 0) * ((ambientLight + texture2D(uIntensity, TexCoords, 0).rgb,1));
	FragColor.a=texture(uColor,TexCoords,0).a;
	

}


/*  
#version 330 compatibility   //点状马赛克

uniform sampler2D uColor, uIntensity;
precision highp float;
varying vec2 vST;

out vec4 FragColor;
uniform vec3 ambientLight={.05,.1,.25};
vec2 mosaicSize = vec2(8,8);
void main() {
	vec2 TexSize=textureSize(uColor,0);
	vec2 intXY = vec2(vST.x*TexSize.x, vST.y*TexSize.y);    
	vec2 XYMosaic = vec2(floor(intXY.x/mosaicSize.x)*mosaicSize.x,floor(intXY.y/mosaicSize.y)*mosaicSize.y) + 0.5*mosaicSize; 
	vec2 delXY = XYMosaic - intXY;   
	float delL = length(delXY);      
	vec2 UVMosaic = vec2(XYMosaic.x/TexSize.x,XYMosaic.y/TexSize.y); 
	vec4 _finalColor;                
	if(delL< 0.5*mosaicSize.x)       
		_finalColor = texture2D(uColor,UVMosaic);  
	else                             
		_finalColor = texture2D(uColor,vST);  

	gl_FragColor = _finalColor;      

    //FragColor.rgb = texture(uColor, vST, 0).rgb * (ambientLight+ texture2D(uIntensity, vST, 0).rgb);
    //FragColor.rgb = texture(uColor, vST, 0).rgb;    
    //FragColor.a = 1;
}
*/

/* 
#version 330 compatibility   //上下模糊

uniform sampler2D uColor, uIntensity;

varying vec2 vST;

out vec4 FragColor;
uniform vec3 ambientLight={.05,.1,.25};

uniform bool horizontal;
uniform float weight[5] = float[] (0.227027, 0.1945946, 0.1216216, 0.054054, 0.016216);
void main() 
{
    float strength=10.0f; //强度    
    vec2 tex_offset = strength / textureSize(uColor, 0); // gets size of single texel
    vec3 tempc=texture(uColor, vST, 0).rgb * (ambientLight+ texture2D(uIntensity, vST, 0).rgb);//咱的材质在这里
    vec3 result = tempc * weight[0]; // current fragment's contribution
    if(horizontal)
    {
        for(int i = 1; i < 5; ++i)
        {
            result += texture(uColor, vST + vec2(tex_offset.x * i, 0.0)).rgb * weight[i];
            result += texture(uColor, vST - vec2(tex_offset.x * i, 0.0)).rgb * weight[i];
        }
    }
    else
    {
        for(int i = 1; i < 5; ++i)
        {
            result += texture(uColor, vST + vec2(0.0, tex_offset.y * i)).rgb * weight[i];
            result += texture(uColor, vST - vec2(0.0, tex_offset.y * i)).rgb * weight[i];
        }
    }
    FragColor.rgb = result;
    //FragColor.rgb = texture(uColor, vST, 0).rgb;    
    FragColor.a = 1;
}
*/

/*
#version 150 compatibility   //模糊

uniform sampler2D uColor, uIntensity;

varying vec2 vST;

out vec4 FragColor;
uniform vec3 ambientLight={.05,.1,.25};
//FragColor.rgb = texture(uColor, vST, 0).rgb;
void main() 
{
	vec4 color = vec4(0.0);
	int seg = 5;
	int i = -seg;
	int j = 0;
	float f = 0.0f;
    float strength=512.0f;
	float dv = 2.0f/strength;
	float tot = 0.0f;
	for(; i <= seg; ++i)
	{
		for(j = -seg; j <= seg; ++j)
		{
			f = (1.1 - sqrt(i*i + j*j)/8.0);
			f *= f;
			tot += f;
			color += texture( uColor, vec2(vST.x + j * dv, vST.y + i * dv) ).rgba * f;
		}
	}
	color /= tot;
	FragColor = color;
    //FragColor.rgb = texture(uColor, vST, 0).rgb * (ambientLight+ texture2D(uIntensity, vST, 0).rgb);    
    FragColor.a = 1;
}
*/