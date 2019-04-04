export let shader = `

varying vec2 vUv;
uniform float time;
uniform vec4 mouse;
uniform vec2 resolution;
uniform sampler2D channel;
uniform vec3 channelResolution;
uniform int nLines;
uniform float lineWidth;
uniform float redAngle;
uniform float greenAngle;
uniform float blueAngle;

uniform float redThreshold;
uniform float greenThreshold;
uniform float blueThreshold;
uniform bool lines;

#define PI 3.1415926535897932384626433832795
/*
float distanceToGrid(vec2 uv, float gridSize, float lineWidth) {
    return smoothstep(0.0, 1.0, (0.5*lineWidth - abs(min(mod(uv.x, gridSize), lineWidth) - 0.5 * lineWidth))/(0.5*lineWidth));
}*/

float distanceToGrid(vec2 uv, float gridSize, float lineWidth) {
    float distToGrid = mod(uv.x, gridSize) - 0.5 * lineWidth;
    return min(distToGrid, 0.5 * lineWidth);
}

float distanceToLine(vec2 uv, float gridSize, float lineWidth) {
    float distToLine = mod(uv.x, gridSize) - 0.5 * lineWidth;
    return min(distToLine, 0.5 * lineWidth);
}

float smoothstepLine(vec2 uv, float gridSize, float lineWidth, float aaSize) {
    float distToLine = distanceToLine(uv, gridSize, lineWidth);
    distToLine = 0.5 * lineWidth - abs(distToLine);
    distToLine = min(distToLine, aaSize);
    return smoothstep(0.0, aaSize, distToLine);
    // return smoothstep(0.0, 1.0, (0.5*lineWidth - abs(min(mod(uv.x, gridSize), lineWidth) - 0.5 * lineWidth))/(0.5*lineWidth));
}


vec2 rotate(vec2 v, float alpha)
{
    float vx = v.x*cos(alpha)-v.y*sin(alpha);
    float vy = v.x*sin(alpha)+v.y*cos(alpha);
    return vec2(vx, vy);
}

void main()
{
    // int order = 0; // 0: red last, 1: green last, 2: blue last, 3: alpha last (depending on the color space)
    // vec4 mask = vec4(order==0?1.0:0.0, order==1?1.0:0.0, order==2?1.0:0.0, order==3?1.0:0.0);
    
    vec2 fragCoord = gl_FragCoord.xy;

    vec2 uv = fragCoord / resolution.xy;
    float ratio = resolution.x / resolution.y;
    uv -= .5;
    uv = ratio > 1. ? vec2(ratio * uv.x, uv.y) : vec2(uv.x, uv.y / ratio);
    
    float textureRatio = channelResolution.x / channelResolution.y;
    vec2 textureUV = textureRatio > ratio ? vec2(uv.x, uv.y / textureRatio) : vec2(uv.x * textureRatio, uv.y);
    textureUV += 0.5;
    
    // float nLines = mouse.x;
    // float lineWidthPixel = 3.0;
    
    float maxSize = max(resolution.x, resolution.y) / min(resolution.x, resolution.y);
    float gridSize = maxSize / float(nLines);
    
    float pixelSize = 1.0 / min(float(resolution.x), float(resolution.y));
    float lineWidthNormalized = lineWidth * pixelSize;
    
    float lineAA = 1.0 * pixelSize;
    
    // float threshold = 0.65;
    vec4 thresholds = vec4(redThreshold, greenThreshold, blueThreshold, 0.0);
    float twoPi = 2.0*PI;
    vec3 angles = twoPi * vec3(redAngle, blueAngle, greenAngle) / 360.0;
    
    
    /*
    float gridSize = 0.001 + pow(10.0, mouse.x / resolution.x) * 0.001;
    float lineWidth = 0.005;
    gridSize = max(gridSize, lineWidth);
    */    
    
    vec2 uvRed = rotate(textureUV, angles.r);
    vec2 uvGreen = rotate(textureUV, angles.g);
    vec2 uvBlue = rotate(textureUV, angles.b); // Warning: removed the 0.75 of the following line without really knowing why it's there... (probably to offset the lines to minimize overlaps, but why 0.75 precisely?)
    // vec2 uvBlue = rotate(textureUV + gridSize*0.75, angles.b);
    
    float lineStepRed = smoothstepLine(uvRed, gridSize, lineWidthNormalized, lineAA);
    float lineStepGreen = smoothstepLine(uvGreen, gridSize, lineWidthNormalized, lineAA);
    float lineStepBlue = smoothstepLine(uvBlue, gridSize, lineWidthNormalized, lineAA);
    vec4 lineStep = lines ? vec4(lineStepRed, lineStepGreen, lineStepBlue, 1.0) : vec4(1.0);
    //vec4 lineStep = vec4(gridDistBlue+gridDistGreen, gridDistBlue + gridDistRed, gridDistRed + gridDistGreen, 1.0);
    //vec4 lineStep = vec4(gridDistRed - gridDistBlue - gridDistGreen, gridDistGreen-gridDistBlue, gridDistBlue, 1.0);
    
    vec2 pr = rotate(textureUV, angles.r);
    vec2 pg = rotate(textureUV, angles.g);
    vec2 pb = rotate(textureUV, angles.b);

    float lineDistRed = distanceToLine(pr, gridSize, gridSize);
    float lineDistGreen = distanceToLine(pg, gridSize, gridSize);
    float lineDistBlue = distanceToLine(pb, gridSize, gridSize);

    vec2 redDelta = rotate(vec2(-lineDistRed, 0.0), -angles.r);
    vec2 greenDelta = rotate(vec2(-lineDistGreen, 0.0), -angles.g);
    vec2 blueDelta = rotate(vec2(-lineDistBlue, 0.0), -angles.b);

    float pixelRed = texture2D(channel, textureUV + redDelta).r;
    float pixelGreen = texture2D(channel, textureUV + greenDelta).g;
    float pixelBlue = texture2D(channel, textureUV + blueDelta).b;
    vec4 pixel = lines ? vec4(pixelRed, pixelGreen, pixelBlue, 1.0) : texture2D(channel, textureUV);
    // vec4 pixel = vec4(pixelRed, pixelRed, pixelRed, 1.0);
    // vec4 pixel = vec4(pixelRed, 1.0, 1.0, 1.0);
    // vec4 pixel = textureLod(channel, textureUV, 2.0);
     
    vec4 thresholded = vec4(1.0) - vec4(greaterThan(pixel, thresholds));
    
    
    // Set pixel color
    /*
    //vec4 pixel = texture(channel, textureUV);
    if(textureUV.x < 0.0 || textureUV.x > 1.0 || textureUV.y < 0.0 || textureUV.y > 1.0) {
        pixel = vec4(0.0);
    }
    */

    vec4 fragColor = vec4(1.0)-(thresholded * lineStep);
    //fragColor =  pixel;

    gl_FragColor = fragColor;
}

`;
