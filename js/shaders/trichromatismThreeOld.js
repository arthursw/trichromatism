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

uniform vec3 colors[9];

int mixMethod = 0;

#define PI 3.1415926535897932384626433832795


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

vec3 rotateHue(vec3 c, float angle) {
    vec3 chsv = rgb2hsv(c);
    chsv.x = mod(chsv.x + angle, 1.0);
    return hsv2rgb(chsv);
}

vec3 mixColors(vec3 c1, vec3 c2) {
    return sqrt(0.5 * c1 * c1 + 0.5 * c2 * c2);
}

vec3 mixColors(vec3 c1, vec3 c2, vec3 c3) {
    return sqrt( (c1 * c1 / 3.0) + (c2 * c2 / 3.0) + (c3 * c3 / 3.0));
}

void main()
{
    vec2 uv = gl_FragCoord.xy / screenResolution.xy;
    
    vec3 pixel = texture2D(textureSampler, uv).xyz;

    // vec3 white = vec3(1.0);
    // vec3 black = vec3(0.0);

    // // vec3 c1 = rotateHue(vec4(1.0, 0.0, 0.0, 1.0), hueRotationAfter).xyz;
    // // vec3 c2 = rotateHue(vec4(0.0, 1.0, 0.0, 1.0), hueRotationAfter).xyz;
    // // vec3 c3 = rotateHue(vec4(0.0, 0.0, 1.0, 1.0), hueRotationAfter).xyz;

    // vec3 c1 = vec3(1.0, 0.0, 0.0);
    // vec3 c2 = vec3(0.0, 1.0, 0.0);
    // vec3 c3 = vec3(0.0, 0.0, 1.0);

    // vec3 c12 = mixColors(c1, c2);
    // vec3 c13 = mixColors(c1, c3);
    // vec3 c23 = mixColors(c2, c3);
    // vec3 c123 = mixColors(mixColors(c1, c2), c3);

    // colors[0] = white;
    // colors[1] = black;
    // colors[2] = c1;
    // colors[3] = c2;
    // colors[4] = c3;
    // colors[5] = c12;
    // colors[6] = c13;
    // colors[7] = c23;
    // colors[8] = c123;
    
    vec3 finalColor = vec3(0.0);

    if(uv.x < 0.05) {
        finalColor = colors[int(floor(uv.y * 10.0)) % 9];
    } else if(uv.x < 0.1) {
        if(uv.y < 0.1) {
            finalColor = colors[0];
        } else if(uv.y < 0.2) {
            finalColor = colors[1];
        } else if(uv.y < 0.3) {
            finalColor = colors[2];
        } else if(uv.y < 0.4) {
            finalColor = colors[3];
        } else if(uv.y < 0.5) {
            finalColor = colors[4];
        } else if(uv.y < 0.6) {
            finalColor = colors[5];
        } else if(uv.y < 0.7) {
            finalColor = colors[6];
        } else if(uv.y < 0.8) {
            finalColor = colors[7];
        } else if(uv.y < 0.9) {
            finalColor = colors[8];
        } else {
            finalColor = colors[0];
        }
    }

    gl_FragColor = vec4(finalColor, 1.0);
}`;