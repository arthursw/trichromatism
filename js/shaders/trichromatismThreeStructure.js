export let shader = `precision highp float;

varying vec2 vUV;

uniform sampler2D textureSampler;
uniform vec2 screenResolution;
uniform vec2 textureResolution;

uniform float time;
uniform vec4 mouse;
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

// vec3 colors[9];
struct Colors
{
    vec3 c0;
    vec3 c1;
    vec3 c2;
    vec3 c3;
    vec3 c4;
    vec3 c5;
    vec3 c6;
    vec3 c7;
    vec3 c8;
    vec3 c9;
};

Colors colors = Colors(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));

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

vec3 mixColors(vec3 c1, vec3 c2) {
    return sqrt(0.5 * c1 * c1 + 0.5 * c2 * c2);
}

vec3 mixColors(vec3 c1, vec3 c2, vec3 c3) {
    return sqrt( (c1 * c1 / 3.0) + (c2 * c2 / 3.0) + (c3 * c3 / 3.0));
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

vec4 getPixelForAngle(vec2 uv, float screenRatio, float gridSize, float angle) {

    float lineDist = deltaToLine(rotate(uv, angle), gridSize, gridSize / 2.0);

    vec2 uvOffset = uv + rotate(vec2(lineDist - (gridSize / 2.0), 0.0), -angle);
    vec2 uvTexture = screenRatio > 1. ? vec2(uvOffset.x / screenRatio, uvOffset.y) : vec2(uvOffset.x, uvOffset.y * screenRatio);

    vec4 pixel = texture2D(textureSampler, uvTexture + 0.5);
    
    return pixel;
}

bool isClosestColor(vec3 pixel, Colors colors, int colorIndex) {

    float minDistance = 1000000.0;

    int index = 0;
    
    float distance = colorDifferenceCIE94FromRGB(pixel, colors.c0);
    if(distance < minDistance) {
        index = 0;
        minDistance = distance;
    }
    distance = colorDifferenceCIE94FromRGB(pixel,  colors.c1);
    if(distance < minDistance) {
        index = 1;
        minDistance = distance;
    }
    distance = colorDifferenceCIE94FromRGB(pixel, colors.c1);
    if(distance < minDistance) {
        index = 2;
        minDistance = distance;
    }
    distance = colorDifferenceCIE94FromRGB(pixel, colors.c1);
    if(distance < minDistance) {
        index = 3;
        minDistance = distance;
    }
    distance = colorDifferenceCIE94FromRGB(pixel, colors.c1);
    if(distance < minDistance) {
        index = 4;
        minDistance = distance;
    }
    distance = colorDifferenceCIE94FromRGB(pixel,  colors.c1);
    if(distance < minDistance) {
        index = 5;
        minDistance = distance;
    }
    distance = colorDifferenceCIE94FromRGB(pixel,  colors.c1);
    if(distance < minDistance) {
        index = 6;
        minDistance = distance;
    }
    distance = colorDifferenceCIE94FromRGB(pixel,  colors.c1);
    if(distance < minDistance) {
        index = 7;
        minDistance = distance;
    }
    distance = colorDifferenceCIE94FromRGB(pixel,  colors.c1);
    if(distance < minDistance) {
        index = 8;
        minDistance = distance;
    }
    
    return index == colorIndex || ( colorIndex == 0 && (index == 3 || index == 4 || index == 6) ) || ( colorIndex == 1 && (index == 3 || index == 5 || index == 6) ) || ( colorIndex == 2 && (index == 4 || index == 5 || index == 6) ) ||;
}

// vec3 getColorForAngle(vec2 uv, float screenRatio, float gridSize, float lineWidthNormalized, float lineAA, float angle, vec3 colors[9], int colorIndex) {
//     float mask = getLineMaskForAngle(uv, gridSize, lineWidthNormalized, lineAA, angle);
//     vec4 pixel = getPixelForAngle(uv, screenRatio, gridSize, angle);
//     bool line = mask > 0.5 && isClosestColor(pixel.xyz, colors, colorIndex);
//     vec3 backgroundColor = colors[8];
//     return line ? colors[colorIndex] : backgroundColor;
// }

vec3 showColors(vec2 uv, Colors colors, vec3 finalColor) {
    if(uv.x < 0.05) {
        if(uv.y < 0.1) {
            finalColor = colors.c0;
        } else if(uv.y < 0.2) {
            finalColor = colors.c1;
        } else if(uv.y < 0.3) {
            finalColor = colors.c2;
        } else if(uv.y < 0.4) {
            finalColor = colors.c3;
        } else if(uv.y < 0.5) {
            finalColor = colors.c4;
        } else if(uv.y < 0.6) {
            finalColor = colors.c5;
        } else if(uv.y < 0.7) {
            finalColor = colors.c6;
        } else if(uv.y < 0.8) {
            finalColor = colors.c7;
        } else if(uv.y < 0.9) {
            finalColor = colors.c8;
        } else {
            finalColor = colors.c0;
        }
    }
    return finalColor;
}

void main()
{
    float screenRatio = screenResolution.x / screenResolution.y;
    float textureRatio = textureResolution.x / textureResolution.y;

    vec2 uv = gl_FragCoord.xy / screenResolution.xy - 0.5;
    uv = screenRatio > 1. ? vec2(uv.x * screenRatio, uv.y) : vec2(uv.x, uv.y / screenRatio);

    vec3 white = vec3(1.0);
    vec3 black = vec3(0.0);
    vec3 backgroundColor = white;

    vec3 c1 = rotateHue(vec4(1.0, 0.0, 0.0, 1.0), hueRotationAfter).xyz;
    vec3 c2 = rotateHue(vec4(0.0, 1.0, 0.0, 1.0), hueRotationAfter).xyz;
    vec3 c3 = rotateHue(vec4(0.0, 0.0, 1.0, 1.0), hueRotationAfter).xyz;

    vec3 c12 = mixColors(c1, c2);
    vec3 c13 = mixColors(c1, c3);
    vec3 c23 = mixColors(c2, c3);
    vec3 c123 = mixColors(mixColors(c1, c2), c3);

    colors.c0 = c1;
    colors.c1 = c2;
    colors.c2 = c3;
    colors.c3 = c12;
    colors.c4 = c13;
    colors.c5 = c23;
    colors.c6 = c123;
    colors.c7 = black;
    colors.c8 = white;

    float maxSize = max(screenResolution.x, screenResolution.y) / min(screenResolution.x, screenResolution.y);
    float gridSize = maxSize / float(nLines);
    
    float pixelSize = 1.0 / min(float(screenResolution.x), float(screenResolution.y));
    float lineWidthNormalized = lineWidth * pixelSize;
    
    float lineAA = 1.0 * pixelSize;

    vec3 angles = TWO_PI * vec3(redAngle, greenAngle, blueAngle) / 360.0;
    
    float angle = angles.r;

    // vec3 color0 = getColorForAngle(uv, screenRatio, gridSize, lineWidthNormalized, lineAA, colors, angle, 0);
    // vec3 color1 = getColorForAngle(uv, screenRatio, gridSize, lineWidthNormalized, lineAA, colors, angle, 1);
    // vec3 color2 = getColorForAngle(uv, screenRatio, gridSize, lineWidthNormalized, lineAA, colors, angle, 2);


    // vec3 finalColor = mixColors(color0, color1, color2);

    // finalColor = showColors(uv, colors, finalColor);

    gl_FragColor = vec4(c1, 1.0);
}`;