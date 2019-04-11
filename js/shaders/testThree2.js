export let shader = `
precision mediump float;

varying vec2 vUV;

uniform vec2 screenResolution;

vec4 colors[2];

void main(void) {

    vec2 uv = gl_FragCoord.xy / screenResolution.xy;

    colors[0] = vec4(0.0);
    colors[1] = vec4(1.0);

    int index = int(floor(uv.y * 1.9));

    gl_FragColor = colors[index];
}`;