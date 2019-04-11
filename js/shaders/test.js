export let shader = `
#ifdef GL_ES
    precision mediump float;
#endif

varying vec2 vUV;

uniform sampler2D textureSampler;
uniform vec2 screenResolution;
uniform vec2 textureResolution;

void main(void) {

    vec2 uv = gl_FragCoord.xy / screenResolution.xy - 0.5;                    // [-0.5, 0.5]

    float screenRatio = screenResolution.x / screenResolution.y;
    float textureRatio = textureResolution.x / textureResolution.y;

    vec2 textureUV = textureRatio > screenRatio ? vec2(uv.x, uv.y * textureRatio / screenRatio) : vec2(uv.x / textureRatio * screenRatio, uv.y);

    gl_FragColor = texture2D(textureSampler, textureUV + 0.5);
}`;
