import{Q as e}from"./tank-model-BJhWidxI.js";import{t}from"./helperFunctions-DtVS_Xik.js";import{n,t as r}from"./imageProcessingFunctions-VhBUSAZ4.js";var i=`imageProcessingPixelShader`,a=`varying vec2 vUV;uniform sampler2D textureSampler;
#include<imageProcessingDeclaration>
#include<helperFunctions>
#include<imageProcessingFunctions>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void)
{vec4 result=texture2D(textureSampler,vUV);result.rgb=max(result.rgb,vec3(0.));
#ifdef IMAGEPROCESSING
#ifndef FROMLINEARSPACE
result.rgb=toLinearSpace(result.rgb);
#endif
result=applyImageProcessing(result);
#else
#ifdef FROMLINEARSPACE
result=applyImageProcessing(result);
#endif
#endif
gl_FragColor=result;}`;e.ShadersStore[i]||(e.ShadersStore[i]=a);var o=[n,t,r];for(let t of o)e.IncludesShadersStore[t.name]||(e.IncludesShadersStore[t.name]=t.shader);var s={name:i,shader:a};export{s as imageProcessingPixelShader};