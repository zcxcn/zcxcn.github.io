import{X as e}from"./tank-model-7GsQQrUA.js";import{n as t,t as n}from"./clipPlaneFragment-ahP57c6c.js";import{t as r}from"./packingFunctions-se7c6eCJ.js";var i=`depthPixelShader`,a=`#ifdef ALPHATEST
varying vUV: vec2f;var diffuseSamplerSampler: sampler;var diffuseSampler: texture_2d<f32>;
#endif
#include<clipPlaneFragmentDeclaration>
varying vDepthMetric: f32;
#ifdef PACKED
#include<packingFunctions>
#endif
#ifdef STORE_CAMERASPACE_Z
varying vViewPos: vec4f;
#endif
#define CUSTOM_FRAGMENT_DEFINITIONS
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {
#include<clipPlaneFragment>
#ifdef ALPHATEST
if (textureSample(diffuseSampler,diffuseSamplerSampler,input.vUV).a<0.4) {discard;}
#endif
#ifdef STORE_CAMERASPACE_Z
#ifdef PACKED
fragmentOutputs.color=pack(input.vViewPos.z);
#else
fragmentOutputs.color= vec4f(input.vViewPos.z,0.0,0.0,1.0);
#endif
#else
#ifdef NONLINEARDEPTH
#ifdef PACKED
fragmentOutputs.color=pack(input.position.z);
#else
fragmentOutputs.color= vec4f(input.position.z,0.0,0.0,0.0);
#endif
#else
#ifdef PACKED
fragmentOutputs.color=pack(input.vDepthMetric);
#else
fragmentOutputs.color= vec4f(input.vDepthMetric,0.0,0.0,1.0);
#endif
#endif
#endif
}`;e.ShadersStoreWGSL[i]||(e.ShadersStoreWGSL[i]=a);var o=[t,r,n];for(let t of o)e.IncludesShadersStoreWGSL[t.name]||(e.IncludesShadersStoreWGSL[t.name]=t.shader);var s={name:i,shader:a};export{s as depthPixelShaderWGSL};