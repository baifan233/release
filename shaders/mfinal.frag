
#version 330 core  
out vec4 FragColor;
in vec2 TexCoords;
uniform sampler2D image;
uniform sampler2D bloom;
uniform float bloomStrength = 0.07f;
uniform int drawType;

void main() 
{
    vec3 color=vec3(0,0,0);
    float alpha=1; vec3 hdrColor,bloomColor;float particleBloomSize=texture(bloom, TexCoords).a;
    switch(drawType)
    {
        case 0:
        hdrColor = texture(image, TexCoords).rgb;
        bloomColor = texture(bloom, TexCoords).rgb;
        color = mix(hdrColor, bloomColor, bloomStrength);
        color *= pow(2,0.95);
        color = 1.0 - exp( -color );
        break;

        case 1:
        color = texture(image,TexCoords).rgb;
        color *= pow(2,0.95);
        color = 1.0 - exp( -color );
        break;

        case 2:
        hdrColor = texture(image, TexCoords).rgb;
        bloomColor = texture(bloom, TexCoords).rgb;
        color = mix(hdrColor, bloomColor, bloomStrength*10*particleBloomSize);
        //color *= pow(2,0.95);
        //color = 1.0 - exp( -color );
        alpha = texture(image,TexCoords).a;
        break;
    }
    
    //color.r=texture(image, TexCoords-vec2(0.0015f,0.0015f), 0).r;
    //color.g=texture(image, TexCoords, 0).g;
    //color.b=texture(image, TexCoords-vec2(0.0015f,0.0015f), 0).b; 

    /*
    vec3 gray=vec3(0.299, 0.587, 0.114);    

    float cc =dot(color,gray);
    if(pow( pow(TexCoords.x-0.5,2) + pow(TexCoords.y-0.5,2),0.5)<0.5f)
        FragColor = vec4(cc,cc,cc,alpha); 
    else
        FragColor = vec4(color,alpha); 
        */
    FragColor = vec4(color,alpha); 
}
