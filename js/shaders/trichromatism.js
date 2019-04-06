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

uniform bool invertRed;
uniform bool invertGreen;
uniform bool invertBlue;

uniform bool lines;

uniform float rgbOrHsv;
uniform float hueRotationBefore;
uniform float hueRotationAfter;

int mixMethod = 1;

#define PI 3.1415926535897932384626433832795
/*
float distanceToGrid(vec2 uv, float gridSize, float lineWidth) {
    return smoothstep(0.0, 1.0, (0.5*lineWidth - abs(min(mod(uv.x, gridSize), lineWidth) - 0.5 * lineWidth))/(0.5*lineWidth));
}*/

int modulo(int i, int m) {
    return i - m * (i / m);
}

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec4 hsv2rgb(vec4 c) {
    return vec4(hsv2rgb(c.xyz), c.w);
}

vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec4 rgb2hsv(vec4 c) {
    return vec4(rgb2hsv(c.xyz), c.w);
}

float deltaToLine(vec2 uv, float gridSize, float offset) {
    return gridSize - mod(uv.x + offset, gridSize);
}

float distanceToLine(vec2 uv, float gridSize, float lineWidth, float offset) {
    float distToLine = mod(uv.x + offset, gridSize) - 0.5 * lineWidth;
    return abs(distToLine);
}

float smoothstepLine(vec2 uv, float gridSize, float lineWidth, float aaSize) {
    float distToLine = distanceToLine(uv, gridSize, lineWidth, 0.5 * gridSize - (gridSize - lineWidth) / 2.0 );
    distToLine = max(0.5 * lineWidth - distToLine, 0.0);
    distToLine = min(distToLine, aaSize);
    return smoothstep(0.0, aaSize, distToLine);
    // return smoothstep(0.0, 1.0, (0.5*lineWidth - abs(min(mod(uv.x, gridSize), lineWidth) - 0.5 * lineWidth))/(0.5*lineWidth));
}


vec2 rotate(vec2 v, float alpha) {
    float vx = v.x*cos(alpha)-v.y*sin(alpha);
    float vy = v.x*sin(alpha)+v.y*cos(alpha);
    return vec2(vx, vy);
}

vec4 rotateHue(vec4 c, float angle) {
    vec4 chsv = rgb2hsv(c);
    chsv.x = mod(chsv.x + angle, 1.0);
    return hsv2rgb(chsv);
}

vec4 convertColor(vec4 color) {

    color = mix(color, rgb2hsv(color), rgbOrHsv);

    vec4 chsv = rgb2hsv(color);
    chsv.x = mod(chsv.x + hueRotationBefore, 1.0);

    color = hsv2rgb(chsv);

    return color;
}

vec3 rgb2xyz(vec3 rgb) {
    rgb.r = rgb.r > 0.04045 ? pow( ( rgb.r + 0.055 ) / 1.055, 2.4) : rgb.r / 12.92;
    rgb.g = rgb.g > 0.04045 ? pow( ( rgb.g + 0.055 ) / 1.055, 2.4) : rgb.g / 12.92;
    rgb.b = rgb.b > 0.04045 ? pow( ( rgb.b + 0.055 ) / 1.055, 2.4) : rgb.b / 12.92;

    rgb *= 100.0;

    return vec3(rgb.r * 0.4124 + rgb.g * 0.3576 + rgb.b * 0.1805, 
                rgb.r * 0.2126 + rgb.g * 0.7152 + rgb.b * 0.0722, 
                rgb.r * 0.0193 + rgb.g * 0.1192 + rgb.b * 0.9505);
}


vec3 xyz2lab(vec3 xyz) {
    xyz = xyz / vec3(94.811, 100.000, 107.304);
    
    xyz = vec3( xyz.r > 0.008856 ? pow( xyz.r, 1.0/3.0) : (7.787 * xyz.r) + (16.0 / 116.0),
                xyz.g > 0.008856 ? pow( xyz.g, 1.0/3.0) : (7.787 * xyz.g) + (16.0 / 116.0),
                xyz.b > 0.008856 ? pow( xyz.b, 1.0/3.0) : (7.787 * xyz.b) + (16.0 / 116.0));

    return vec3( (116.0 * xyz.y) - 16.0, 500.0 * (xyz.x - xyz.y), 200.0 * (xyz.y - xyz.z) );
}

vec3 rgb2lab(in vec3 rgb) {
    vec3 xyz = rgb2xyz(rgb);
    vec3 lab = xyz2lab(xyz);
    return(lab);
}

float colorDifferenceCIE94FromLab(vec3 cieLab1, vec3 cieLab2) {

    // Just to make it more readable
    float cL1 = cieLab1.r;
    float ca1 = cieLab1.g;
    float cb1 = cieLab1.b;

    float cL2 = cieLab2.r;
    float ca2 = cieLab2.g;
    float cb2 = cieLab2.b;

    float c1 = sqrt(ca1 * ca1 + cb1 * cb1);
    float c2 = sqrt(ca2 * ca2 + cb2 * cb2);
    
    float dL = cL2 - cL1;

    float dC = c2 - c1;

    float dE = sqrt( (cL1 - cL2) * (cL1 - cL2) + (ca1 - ca2) * (ca1 - ca2) + (cb1 - cb2) * (cb1 - cb2) );

    float dH = (dE * dE) - (dL * dL) - (dC * dC);

    dH = dH > 0.0 ? sqrt(dH) : 0.0;

    float kL = 1.0;
    float kC = 1.0;
    float kH = 1.0;
    float k1 = 0.045;
    float k2 = 0.015;

    float sL = 1.0;
    float sC = 1.0 + ( k1 * c1 ); // sX
    float sH = 1.0 + ( k2 * c1 ); // sH

    float dLw = dL / (kL * sL);
    float dCw = dC / (kC * sC);
    float dHw = dH / (kH * sH);

    float deltaE94 = sqrt(dLw * dLw + dCw * dCw + dHw * dHw);

    return deltaE94;
}

float colorDifferenceCIE94FromRGB(vec3 rgb1, vec3 rgb2) {
    vec3 lab1 = rgb2lab(rgb1);
    vec3 lab2 = rgb2lab(rgb2);
    return colorDifferenceCIE94FromLab(lab1, lab2);
}

vec4 rgb2cmyk1(vec3 rgb) {
    float minLight = 0.0001;
    if( rgb.r < minLight && rgb.g < minLight && rgb.b < minLight ) {
        return vec4(0.0, 0.0, 0.0, 1.0);
    }

    float c = 1.0 - rgb.r;
    float m = 1.0 - rgb.g;
    float y = 1.0 - rgb.b;
    
    float minCMY = min(min(c, m), y);
    
    float oneMinusMinCMY = 1.0 - minCMY;
    c = (c - minCMY) / oneMinusMinCMY;
    m = (m - minCMY) / oneMinusMinCMY;
    y = (y - minCMY) / oneMinusMinCMY;

    float k = minCMY;

    return vec4(c, m, y, k);
}
vec3 cmyk2rgb1(vec4 cmyk) {

    float c = cmyk.r;
    float m = cmyk.g;
    float y = cmyk.b;
    float k = cmyk.a;

    c = c * (1.0 - k) + k;
    m = m * (1.0 - k) + k;
    y = y * (1.0 - k) + k;

    return 1.0 - vec3(c, m, y);
}

vec4 rgb2cmyk2(vec3 rgb) {

    float minLight = 0.0001;
    if( rgb.r < minLight && rgb.g < minLight && rgb.b < minLight ) {
        return vec4(0.0, 0.0, 0.0, 100.0);
    }

    float c = 1.0 - rgb.r;
    float m = 1.0 - rgb.g;
    float y = 1.0 - rgb.b;
    
    float minCMY = min(min(c, m), y);
    
    c -= minCMY;
    m -= minCMY;
    y -= minCMY;

    float k = minCMY;

    return vec4(c, m, y, k) * 100.0;
}

vec3 cmyk2rgb2(vec4 cmyk) {

    float c = cmyk.r;
    float m = cmyk.g;
    float y = cmyk.b;
    float k = cmyk.a;

    float r = (c + k) / 100.0;
    float g = (m + k) / 100.0;
    float b = (y + k) / 100.0;

    return 1.0 - vec3(r, g, b);
}

vec3 blendColorsCmyk1(vec3 c1, vec3 c2) {
    vec4 cmyk1 = rgb2cmyk1(c1);
    vec4 cmyk2 = rgb2cmyk1(c2);
    return cmyk2rgb1(cmyk1 + cmyk2);
}

vec3 blendColorsCmyk2(vec3 c1, vec3 c2) {
    vec4 cmyk1 = rgb2cmyk2(c1);
    vec4 cmyk2 = rgb2cmyk2(c2);
    return cmyk2rgb2(cmyk1 + cmyk2);
}

vec3 blendColorsCmyk1(vec3 c1, vec3 c2, vec3 c3) {
    vec4 cmyk1 = rgb2cmyk1(c1);
    vec4 cmyk2 = rgb2cmyk1(c2);
    vec4 cmyk3 = rgb2cmyk1(c3);
    return cmyk2rgb1(cmyk1 + cmyk2 + cmyk3);
}

vec3 blendColorsCmyk2(vec3 c1, vec3 c2, vec3 c3) {
    vec4 cmyk1 = rgb2cmyk2(c1);
    vec4 cmyk2 = rgb2cmyk2(c2);
    vec4 cmyk3 = rgb2cmyk2(c3);
    return cmyk2rgb2(cmyk1 + cmyk2 + cmyk3);
}


vec2 rotateOffset(vec2 v, float angle) {
    return rotate(v-0.5, angle) + 0.5;
}

vec2 uvToTextureUV(vec2 uv) {
    float ratio = resolution.x / resolution.y;
    float textureRatio = channelResolution.x / channelResolution.y;
    vec2 tuv = textureRatio > ratio ? vec2(uv.x, uv.y / textureRatio) : vec2(uv.x * textureRatio, uv.y);
    return tuv + 0.5;
}

vec3 mixColors(vec3 c1, vec3 c2) {
    if(mixMethod == 0) {
        return (c1 + c2) / 2.0;
    } else if(mixMethod == 1) {
        return sqrt(0.5 * c1 * c1 + 0.5 * c2 * c2);
    } else if(mixMethod == 2) {
        return blendColorsCmyk1(c1, c2);
    } else if(mixMethod == 3) {
        return blendColorsCmyk2(c1, c2);
    } else {
        return 1.0 - sqrt( (1.0 - c1) * (1.0 - c1) + (1.0 - c2) * (1.0 - c2) );
    }
}

vec3 mixColors(vec3 c1, vec3 c2, vec3 c3) {
    if(mixMethod == 0) {
        return (c1 + c2 + c3) / 3.0;
    } else if(mixMethod == 1) {
        return sqrt( (c1 * c1 / 3.0) + (c2 * c2 / 3.0) + (c3 * c3 / 3.0));
    } else if(mixMethod == 2) {
        return blendColorsCmyk1(c1, c2, c3);
    } else if(mixMethod == 3) {
        return blendColorsCmyk2(c1, c2, c3);
    } else {
        return mixColors(mixColors(c1, c2), c3);
    }
}

int minDistanceIndex(float d1, float d2, float d3, float d4, float d5, float d6, float d7, float d8, float d9) {
    float minDistance = 1000000.0;
    int index = 0;
    if(minDistance > d1) {
        index = 0;
        minDistance = d1;
    }
    if(minDistance > d2) {
        index = 1;
        minDistance = d2;
    }
    if(minDistance > d3) {
        index = 2;
        minDistance = d3;
    }
    if(minDistance > d4) {
        index = 3;
        minDistance = d4;
    }
    if(minDistance > d5) {
        index = 4;
        minDistance = d5;
    }
    if(minDistance > d6) {
        index = 5;
        minDistance = d6;
    }
    if(minDistance > d7) {
        index = 6;
        minDistance = d7;
    }
    if(minDistance > d8) {
        index = 7;
        minDistance = d8;
    }
    if(minDistance > d9) {
        index = 8;
        minDistance = d9;
    }
    return index;
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
    
    float twoPi = 2.0*PI;
    vec3 angles = twoPi * vec3(redAngle, greenAngle, blueAngle) / 360.0;
    // vec2 uvRed = rotate(uv, angles.r);
    // vec2 uvGreen = rotate(uv, angles.g);
    // vec2 uvBlue = rotate(uv, angles.b);

    // float textureRatio = channelResolution.x / channelResolution.y;

    // vec2 textureUVred = textureRatio > ratio ? vec2(uvRed.x, uvRed.y / textureRatio) : vec2(uvRed.x * textureRatio, uvRed.y);
    // vec2 textureUVgreen = textureRatio > ratio ? vec2(uvGreen.x, uvGreen.y / textureRatio) : vec2(uvGreen.x * textureRatio, uvGreen.y);
    // vec2 textureUVblue = textureRatio > ratio ? vec2(uvBlue.x, uvBlue.y / textureRatio) : vec2(uvBlue.x * textureRatio, uvBlue.y);

    // vec2 textureUV = textureRatio > ratio ? vec2(uv.x, uv.y / textureRatio) : vec2(uv.x * textureRatio, uv.y);
    
    
    // float nLines = mouse.x;
    // float lineWidthPixel = 3.0;
    // textureUV += 0.5;
    
    // textureUVred += 0.5;
    // textureUVgreen += 0.5;
    // textureUVblue += 0.5;


    float maxSize = max(resolution.x, resolution.y) / min(resolution.x, resolution.y);
    float gridSize = maxSize / float(nLines);
    
    float pixelSize = 1.0 / min(float(resolution.x), float(resolution.y));
    float lineWidthNormalized = lineWidth * pixelSize;
    
    float lineAA = 1.0 * pixelSize;
    
    float lineDistRed = deltaToLine(rotate(uv, angles.r), gridSize, gridSize / 2.0);
    float lineDistGreen = deltaToLine(rotate(uv, angles.g), gridSize, gridSize / 2.0);
    float lineDistBlue = deltaToLine(rotate(uv, angles.b), gridSize, gridSize / 2.0);

    vec4 red = 1.0 - texture2D(channel, uvToTextureUV(uv + rotate(vec2(lineDistRed - (gridSize / 2.0), 0.0), -angles.r)));
    vec4 green = 1.0 - texture2D(channel, uvToTextureUV(uv + rotate(vec2(lineDistGreen - (gridSize / 2.0), 0.0), -angles.g)));
    vec4 blue = 1.0 - texture2D(channel, uvToTextureUV(uv + rotate(vec2(lineDistBlue - (gridSize / 2.0), 0.0), -angles.b)));
    
    vec4 thresholds = vec4(redThreshold, greenThreshold, blueThreshold, 0.0);

    red = rotateHue(red, hueRotationBefore);
    green = rotateHue(green, hueRotationBefore);
    blue = rotateHue(blue, hueRotationBefore);

    red = vec4(greaterThan(red, thresholds));
    green = vec4(greaterThan(green, thresholds));
    blue = vec4(greaterThan(blue, thresholds));

    red = rotateHue(red, -hueRotationBefore);
    green = rotateHue(green, -hueRotationBefore);
    blue = rotateHue(blue, -hueRotationBefore);

    float redMask = smoothstepLine(rotate(uv, angles.r), gridSize, lineWidthNormalized, lineAA);
    float greenMask = smoothstepLine(rotate(uv, angles.g), gridSize, lineWidthNormalized, lineAA);
    float blueMask = smoothstepLine(rotate(uv, angles.b), gridSize, lineWidthNormalized, lineAA);
    
    vec3 c1 = rotateHue(vec4(1.0, 0.0, 0.0, 1.0), hueRotationAfter).xyz;
    vec3 c2 = rotateHue(vec4(0.0, 1.0, 0.0, 1.0), hueRotationAfter).xyz;
    vec3 c3 = rotateHue(vec4(0.0, 0.0, 1.0, 1.0), hueRotationAfter).xyz;

    vec3 c12 = mixColors(c1, c2);
    vec3 c13 = mixColors(c1, c3);
    vec3 c23 = mixColors(c2, c3);
    vec3 c123 = mixColors(c1, c2, c3);

    vec3 white = vec3(1.0);
    vec3 black = vec3(0.0);

    vec3 rgb = 1.0 - vec3(red.r, green.g, blue.b);
    // gl_FragColor = 1.0 - vec4(rgb, 1.0);
    // gl_FragColor = vec4(rgb.r, 0.0, 0.0, 1.0);
 
    red = mix(vec4(0.0), rotateHue(vec4(1.0, 0.0, 0.0, 1.0), hueRotationAfter), red.r * redMask);
    green = mix(vec4(0.0), rotateHue(vec4(0.0, 1.0, 0.0, 1.0), hueRotationAfter), green.g * greenMask);
    blue = mix(vec4(0.0), rotateHue(vec4(0.0, 0.0, 1.0, 1.0), hueRotationAfter), blue.b * blueMask);

    // vec4 average = (red + green + blue) / 3.0;

    gl_FragColor = 1.0 - vec4(mixColors(red.xyz, green.xyz, blue.xyz), 1.0);

    /*
    float maxDistance = 1000000.0;

    float distanceWhite = colorDifferenceCIE94FromRGB(rgb, white);
    float distanceBlack = colorDifferenceCIE94FromRGB(rgb,  black);
    float distance1 = redMask < 0.5 ? colorDifferenceCIE94FromRGB(rgb, c1) : maxDistance;
    float distance2 = greenMask < 0.5 ? colorDifferenceCIE94FromRGB(rgb, c2) : maxDistance;
    float distance3 = blueMask < 0.5 ? colorDifferenceCIE94FromRGB(rgb, c3) : maxDistance;
    float distance12 = redMask < 0.5 && greenMask < 0.5 ? colorDifferenceCIE94FromRGB(rgb,  c12) : maxDistance;
    float distance13 = redMask < 0.5 && blueMask < 0.5  ? colorDifferenceCIE94FromRGB(rgb,  c13) : maxDistance;
    float distance23 = greenMask < 0.5 && blueMask < 0.5 ? colorDifferenceCIE94FromRGB(rgb,  c23) : maxDistance;
    float distance123 = redMask < 0.5 && greenMask < 0.5 && blueMask < 0.5 ? colorDifferenceCIE94FromRGB(rgb,  c123) : maxDistance;

    int index = minDistanceIndex(distanceWhite, distanceBlack, distance1, distance2, distance3, distance12, distance13, distance23, distance123);
    vec3 finalColor = white;
    
    if(index == 0) {
        finalColor = white;
    } else if(index == 1) {
        finalColor = black;
    } else if(index == 2) {
        finalColor = c1;
    } else if(index == 3) {
        finalColor = c2;
    } else if(index == 4) {
        finalColor = c3;
    } else if(index == 5) {
        finalColor = c12;
    } else if(index == 6) {
        finalColor = c13;
    } else if(index == 7) {
        finalColor = c23;
    } else if(index == 8) {
        finalColor = c123;
    }

    gl_FragColor = vec4(finalColor, 1.0);
    */
    
    // // FUN VERSION WITH COLOR HUE ROTATION
    // vec4 color = 1.0 - vec4(red.r, green.g, blue.b, 1.0);


    // vec4 thresholds = vec4(redThreshold, greenThreshold, blueThreshold, 0.0);

    // // vec4 color = texture2D(channel, uvToTextureUV(uv));
    
    // // // rotate image hue    
    // // vec4 chsv = rgb2hsv(color);
    // // chsv.x = mod(chsv.x + hueRotationAfter, 1.0);
    // // color = hsv2rgb(chsv);

    // vec4 thresholded = vec4(greaterThan(color, thresholds));

    // // // rotate back
    // // chsv = rgb2hsv(thresholded);
    // // chsv.x = mod(chsv.x - hueRotationAfter, 1.0);
    // // thresholded = hsv2rgb(chsv);

    // gl_FragColor = thresholded;











    // gl_FragColor = red;

    // // float threshold = 0.65;
    // vec4 thresholds = vec4(redThreshold, greenThreshold, blueThreshold, 0.0);
    // float twoPi = 2.0*PI;
    // vec3 angles = twoPi * vec3(redAngle, blueAngle, greenAngle) / 360.0;
    
    
    // /*
    // float gridSize = 0.001 + pow(10.0, mouse.x / resolution.x) * 0.001;
    // float lineWidth = 0.005;
    // gridSize = max(gridSize, lineWidth);
    // */    
    
    // vec2 uvRed = rotate(textureUV, angles.r);
    // vec2 uvGreen = rotate(textureUV, angles.g);
    // vec2 uvBlue = rotate(textureUV, angles.b); // Warning: removed the 0.75 of the following line without really knowing why it's there... (probably to offset the lines to minimize overlaps, but why 0.75 precisely?)
    // // vec2 uvBlue = rotate(textureUV + gridSize*0.75, angles.b);
    
    // float lineStepRed = smoothstepLine(uvRed, gridSize, lineWidthNormalized, lineAA);
    // float lineStepGreen = smoothstepLine(uvGreen, gridSize, lineWidthNormalized, lineAA);
    // float lineStepBlue = smoothstepLine(uvBlue, gridSize, lineWidthNormalized, lineAA);
    // vec4 lineStep = lines ? vec4(lineStepRed, lineStepGreen, lineStepBlue, 1.0) : vec4(1.0);
    // //vec4 lineStep = vec4(gridDistBlue+gridDistGreen, gridDistBlue + gridDistRed, gridDistRed + gridDistGreen, 1.0);
    // //vec4 lineStep = vec4(gridDistRed - gridDistBlue - gridDistGreen, gridDistGreen-gridDistBlue, gridDistBlue, 1.0);
    
    // vec2 pr = rotate(textureUV, angles.r);
    // vec2 pg = rotate(textureUV, angles.g);
    // vec2 pb = rotate(textureUV, angles.b);

    // float lineDistRed = distanceToLine(pr, gridSize, gridSize, pixelSize);
    // float lineDistGreen = distanceToLine(pg, gridSize, gridSize, pixelSize);
    // float lineDistBlue = distanceToLine(pb, gridSize, gridSize, pixelSize);

    // vec2 redDelta = rotate(vec2(-lineDistRed, 0.0), -angles.r);
    // vec2 greenDelta = rotate(vec2(-lineDistGreen, 0.0), -angles.g);
    // vec2 blueDelta = rotate(vec2(-lineDistBlue, 0.0), -angles.b);

    // float pixelRed = convertColor(texture2D(channel, textureUV + redDelta)).r;
    // float pixelGreen = convertColor(texture2D(channel, textureUV + greenDelta)).g;
    // float pixelBlue = convertColor(texture2D(channel, textureUV + blueDelta)).b;
    // vec4 color = lines ? vec4(pixelRed, pixelGreen, pixelBlue, 1.0) : convertColor(texture2D(channel, textureUV));
    // // vec4 pixel = vec4(pixelRed, pixelRed, pixelRed, 1.0);
    // // vec4 pixel = vec4(pixelRed, 1.0, 1.0, 1.0);
    // // vec4 pixel = textureLod(channel, textureUV, 2.0);
     

    // bool tr = invertRed ? color.r <= thresholds.r : color.r > thresholds.r;
    // bool tg = invertGreen ? color.g <= thresholds.g : color.g > thresholds.g;
    // bool tb = invertBlue ? color.b <= thresholds.b : color.b > thresholds.b;

    // vec4 thresholded = vec4(1.0) - vec4(tr, tg, tb, 0.0);

    // // vec4 thresholded = vec4(1.0) - vec4(greaterThan(color, thresholds));
    
    
    // // Set pixel color
    // /*
    // //vec4 pixel = texture(channel, textureUV);
    // if(textureUV.x < 0.0 || textureUV.x > 1.0 || textureUV.y < 0.0 || textureUV.y > 1.0) {
    //     pixel = vec4(0.0);
    // }
    // */

    // vec4 fragColor = vec4(1.0)-(thresholded * lineStep);
    // //fragColor =  pixel;
    
    
    // vec4 chsv = rgb2hsv(fragColor);
    // chsv.x = mod(chsv.x + hueRotationAfter, 1.0);
    
    // gl_FragColor = hsv2rgb(chsv);
}

`;
