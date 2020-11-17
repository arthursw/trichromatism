export let shader = `precision highp float;

varying vec2 vUV;

uniform sampler2D textureSampler;
uniform vec2 screenResolution;
uniform vec2 textureResolution;

uniform float time;
uniform vec4 mouse;
uniform vec4 angles;
uniform int nLines;
uniform float lineWidth;
// uniform float lineAA;
uniform float mixWeight;

uniform float redThreshold;
uniform float greenThreshold;
uniform float blueThreshold;

uniform bool invertRed;
uniform bool invertGreen;
uniform bool invertBlue;

uniform int renderMode;
uniform bool showColors;
uniform bool useBlack;

uniform float rgbOrHsv;
uniform float hueRotationBefore;
uniform float hueRotationAfter;

uniform float hue;
uniform float saturation;
uniform float lightness;

uniform vec3 colors[9];

int mixMethod = 0;

#define PI 3.1415926535897932384626433832795
#define TWO_PI 2.0 * PI


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

vec4 rotateHue(vec4 c, float angle) {
    vec4 chsv = rgb2hsv(c);
    chsv.x = mod(chsv.x + angle, 1.0);
    return hsv2rgb(chsv);
}

// vec3 mixColors(vec3 c1, vec3 c2) {
//     return sqrt(0.5 * c1 * c1 + 0.5 * c2 * c2);
// }

// vec3 mixColors(vec3 c1, vec3 c2, vec3 c3) {
//     return sqrt( (c1 * c1 / 3.0) + (c2 * c2 / 3.0) + (c3 * c3 / 3.0));
// }

vec4 rgb2cmyk(vec3 rgb) {

    float k = 1.0 - max(rgb.r, max(rgb.g, rgb.b) );
    float f = k < 1.0 ? 1.0 / (1.0 - k) : 0.0;
    float c = (1.0 - rgb.r - k) * f;
    float m = (1.0 - rgb.g - k) * f;
    float y = (1.0 - rgb.b - k) * f;

    return vec4(c, m, y, k);
}

vec3 cmyk2rgb(vec4 cmyk) {
    float c = cmyk.r;
    float m = cmyk.g;
    float y = cmyk.b;
    float k = cmyk.a;

    return vec3(k >= 1.0 || c >= 1.0 ? 0.0 : (1.0 - c) * (1.0 - k),
                k >= 1.0 || m >= 1.0 ? 0.0 : (1.0 - m) * (1.0 - k),
                k >= 1.0 || k >= 1.0 ? 0.0 : (1.0 - y) * (1.0 - k) );
}

vec4 mixColors(vec4 c1, vec4 c2) {
    if(mixWeight < 0.5) {
        return c1 * c2;
    }

    vec4 cmyk1 = rgb2cmyk(c1.rgb);
    vec4 cmyk2 = rgb2cmyk(c2.rgb);
    // vec4 m = (c1.a * cmyk1 + c2.a * cmyk2) / ( (c1.a + c2.a) * mixWeight );
    vec4 m = (c1.a * cmyk1 + c2.a * cmyk2) / mixWeight;
    return vec4(cmyk2rgb(m), 1.0);
}

vec4 mixColors(vec3 c1, vec3 c2) {
    return mixColors(vec4(c1, 1.0), vec4(c2, 1.0));
}

vec4 mixColors2(vec4 c1, vec4 c2, float a) {
    if(mixWeight < 0.5) {
        return c1 * (1.0 - a) + c1 * c2 * a;
    }
    return mixColors(c1, c2);
}

vec4 mixColors2(vec4 c1, vec3 c2, float a) {
    return mixColors2(c1, vec4(c2.xyz, a), a);
}

vec4 mixColors2(vec3 c1, vec3 c2, float a) {
    return mixColors2(vec4(c1, 1.0), vec4(c2.xyz, a), a);
}

float deltaToLine(vec2 uv, float gridSize, float offset) {
    return gridSize - mod(uv.x + offset, gridSize);
}

float distanceToLine(vec2 uv, float gridSize, float lineWidth, float offset) {
    float distToLine = mod(uv.x + offset, gridSize) - 0.5 * lineWidth;
    return abs(distToLine);
}

float smoothstepLine(vec2 uv, float gridSize, float lineWidth, float aaSize) {
    float distToLine = distanceToLine(uv, gridSize, lineWidth, lineWidth / 2.0 );
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

float getLineMaskForAngle(vec2 uv, float gridSize, float lineWidthNormalized, float lineAA, float angle) {
    return smoothstepLine(rotate(uv, angle), gridSize, lineWidthNormalized, lineAA);
}

vec4 preprocessing(vec4 c) {
    vec4 chsv = rgb2hsv(c);
    chsv.x = mod(chsv.x + hue, 1.0);
    chsv.y += saturation;
    chsv.z += lightness;
    return hsv2rgb(chsv);
}

vec4 getPixelForAngle(vec2 uv, float screenRatio, float gridSize, float angle) {

    float lineDist = deltaToLine(rotate(uv, angle), gridSize, gridSize / 2.0);

    vec2 uvOffset = uv + rotate(vec2(lineDist - (gridSize / 2.0), 0.0), -angle);
    vec2 uvTexture = screenRatio > 1. ? vec2(uvOffset.x / screenRatio, uvOffset.y) : vec2(uvOffset.x, uvOffset.y * screenRatio);

    vec4 pixel = preprocessing(texture2D(textureSampler, uvTexture + 0.5));
    if(pixel.a < 0.1) {
        pixel = vec4(1.0);
    }
    return pixel;
}

int getClosestColorIndex(vec3 pixel) {

    float minDistance = 1000000.0;

    int index = 0;
    
    float distance = colorDifferenceCIE94FromRGB(pixel, colors[0]);
    if(distance < minDistance) {
        index = 0;
        minDistance = distance;
    }
    distance = colorDifferenceCIE94FromRGB(pixel,  colors[1]);
    if(distance < minDistance) {
        index = 1;
        minDistance = distance;
    }
    distance = colorDifferenceCIE94FromRGB(pixel, colors[2]);
    if(distance < minDistance) {
        index = 2;
        minDistance = distance;
    }
    distance = colorDifferenceCIE94FromRGB(pixel, colors[3]);
    if(distance < minDistance) {
        index = 3;
        minDistance = distance;
    }
    distance = colorDifferenceCIE94FromRGB(pixel, colors[4]);
    if(distance < minDistance) {
        index = 4;
        minDistance = distance;
    }
    distance = colorDifferenceCIE94FromRGB(pixel,  colors[5]);
    if(distance < minDistance) {
        index = 5;
        minDistance = distance;
    }
    distance = colorDifferenceCIE94FromRGB(pixel,  colors[6]);
    if(distance < minDistance) {
        index = 6;
        minDistance = distance;
    }
    if(useBlack) {
        distance = colorDifferenceCIE94FromRGB(pixel,  colors[7]);
        if(distance < minDistance) {
            index = 7;
            minDistance = distance;
        }
    }
    distance = colorDifferenceCIE94FromRGB(pixel,  colors[8]);
    if(distance < minDistance) {
        index = 8;
        minDistance = distance;
    }
    return index;
}

int isClosestColor(vec3 pixel, int colorIndex) {
    int index = getClosestColorIndex(pixel);
    
    bool icc = index == colorIndex || 
            ( colorIndex == 0 && (index == 3 || index == 4 || index == 6) ) || 
            ( colorIndex == 1 && (index == 3 || index == 5 || index == 6) ) || 
            ( colorIndex == 2 && (index == 4 || index == 5 || index == 6) );
    return icc ? 1 : index == 7 ? -1 : 0;
}

vec2 getColorForAngle(vec2 uv, float screenRatio, float gridSize, float lineWidthNormalized, float lineAA, float angle, int colorIndex) {
    float mask = getLineMaskForAngle(uv, gridSize, lineWidthNormalized, lineAA, angle);
    vec4 pixel = getPixelForAngle(uv, screenRatio, gridSize, angle);
    int line = isClosestColor(pixel.xyz, colorIndex);
    // vec3 backgroundColor = colors[7];
    // return line ? colors[colorIndex] : backgroundColor;
    return vec2(float(line), mask);
}

vec4 applyColors(vec2 fragCoord, vec4 finalColor) {
    if(!showColors) {
        return finalColor;
    }
    float uvy = float(fragCoord.y) / 400.0;
    if(fragCoord.x < 40.0) {
        if(uvy < 0.1) {
            finalColor.rgb = colors[0];
        } else if(uvy < 0.2) {
            finalColor.rgb = colors[1];
        } else if(uvy < 0.3) {
            finalColor.rgb = colors[2];
        } else if(uvy < 0.4) {
            finalColor.rgb = colors[3]; // mixColors2(colors[0], colors[1], 1.0).rgb;
        } else if(uvy < 0.5) {
            finalColor.rgb = colors[4]; //mixColors2(colors[0], colors[2], 1.0).rgb;
        } else if(uvy < 0.6) {
            finalColor.rgb = colors[5]; //mixColors2(colors[1], colors[2], 1.0).rgb;
        } else if(uvy < 0.7) {
            finalColor.rgb = colors[6]; //mixColors2(mixColors2(colors[1], colors[2], 1.0).rgb, colors[3], 1.0).rgb;
        } else if(uvy < 0.8) {
            finalColor.rgb = colors[7];
        } else if(uvy < 0.9) {
            finalColor.rgb = colors[8];
        }
    }
    finalColor.a = 1.0;
    return finalColor;
}

// vec2 normalizeUV(vec2 uv) {
//     float screenRatio = screenResolution.x / screenResolution.y;
//     uv -= 0.5;
//     uv = screenRatio > 1. ? vec2(uv.x * screenRatio, uv.y) : vec2(uv.x, uv.y / screenRatio);
//     return uv;
// }

void main()
{
    float screenRatio = screenResolution.x / screenResolution.y;

    vec3 white = vec3(1.0);
    vec3 black = vec3(0.0);

    vec2 uv = gl_FragCoord.xy / screenResolution.xy;

    vec4 finalColor = vec4(white, 1.0);

    if(renderMode == 2) {
        finalColor = preprocessing(texture2D(textureSampler, uv));
        finalColor = applyColors(gl_FragCoord.xy, finalColor);
        gl_FragColor = finalColor;
        return;
    }
    if(renderMode == 1) {
        vec3 pixel = preprocessing(texture2D(textureSampler, uv)).xyz;
        int index = getClosestColorIndex(pixel);
        finalColor = vec4(colors[index], 1.0);
        finalColor = applyColors(gl_FragCoord.xy, finalColor);
        gl_FragColor = finalColor;
        return;
    }
    uv -= 0.5;
    uv = screenRatio > 1. ? vec2(uv.x * screenRatio, uv.y) : vec2(uv.x, uv.y / screenRatio);

    float maxSize = max(screenResolution.x, screenResolution.y) / min(screenResolution.x, screenResolution.y);
    float gridSize = maxSize / float(nLines);
    
    float pixelSize = 1.0 / float(min(screenResolution.x, screenResolution.y));
    float lineWidthNormalized = lineWidth * pixelSize;
    
    float lineAAps = 0.0001 * pixelSize;

    vec4 anglesRad = TWO_PI * (angles - 90.0) / 360.0;
    
    
    // vec4 pixel = getPixelForAngle(uv, screenRatio, gridSize, anglesRad.r);
    // gl_FragColor = pixel;
    // float mask = getLineMaskForAngle(uv, gridSize, lineWidthNormalized, lineAA, anglesRad.r);
    // gl_FragColor = vec4(mix(black, vec3(0.4, 0.1, 0.6), mask), 1.0);
    // return;

    // finalColor.a = 0.0;

    // vec2 color1 = getColorForAngle(uv, screenRatio, gridSize, lineWidthNormalized, lineAA, anglesRad.r, 0);
    // finalColor = color1.x > 0.5 ? mixColors(finalColor, vec4(colors[0], color1.y)) : useBlack && color1.x < -0.5 ? mixColors(finalColor, vec4(black, color1.y)) : finalColor;
    // vec2 color2 = getColorForAngle(uv, screenRatio, gridSize, lineWidthNormalized, lineAA, anglesRad.g, 1);
    // finalColor = color2.x > 0.5 ? mixColors(finalColor, vec4(colors[1], color2.y)) : useBlack && color2.x < -0.5 ? mixColors(finalColor, vec4(black, color2.y)) : finalColor;
    // vec2 color3 = getColorForAngle(uv, screenRatio, gridSize, lineWidthNormalized, lineAA, anglesRad.b, 2);
    // finalColor = color3.x > 0.5 ? mixColors(finalColor, vec4(colors[2], color3.y)) : useBlack && color3.x < -0.5 ? mixColors(finalColor, vec4(black, color3.y)) : finalColor;
    
    finalColor.a = 1.0;

    vec2 color1 = getColorForAngle(uv, screenRatio, gridSize, lineWidthNormalized, lineAAps, anglesRad.r, 0);
    finalColor = color1.x > 0.5 ? mixColors2(finalColor, colors[0], color1.y) : useBlack && color1.x < -0.5 ? mixColors2(finalColor, black, color1.y) : finalColor;
    vec2 color2 = getColorForAngle(uv, screenRatio, gridSize, lineWidthNormalized, lineAAps, anglesRad.g, 1);
    finalColor = color2.x > 0.5 ? mixColors2(finalColor, colors[1], color2.y) : useBlack && color2.x < -0.5 ? mixColors2(finalColor, black, color2.y) : finalColor;
    vec2 color3 = getColorForAngle(uv, screenRatio, gridSize, lineWidthNormalized, lineAAps, anglesRad.b, 2);
    finalColor = color3.x > 0.5 ? mixColors2(finalColor, colors[2], color3.y) : useBlack && color3.x < -0.5 ? mixColors2(finalColor, black, color3.y) : finalColor;
    
    finalColor.a = 1.0;

    finalColor = applyColors(gl_FragCoord.xy, finalColor);

    gl_FragColor = finalColor;
}`;