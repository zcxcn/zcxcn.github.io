import{rt as e}from"./tank-model-DEYcadDW.js";var t=`mainUVVaryingDeclaration`,n=`#ifdef MAINUV{X}
varying vec2 vMainUV{X};
#endif
`;e.IncludesShadersStore[t]||(e.IncludesShadersStore[t]=n);var r={name:t,shader:n},i=`logDepthDeclaration`,a=`#ifdef LOGARITHMICDEPTH
uniform float logarithmicDepthConstant;varying float vFragmentDepth;
#endif
`;e.IncludesShadersStore[i]||(e.IncludesShadersStore[i]=a);var o={name:i,shader:a};export{r as n,o as t};