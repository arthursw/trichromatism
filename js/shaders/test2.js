export let shader = `precision highp float;

varying vec2 vUV;

uniform sampler2D textureSampler;
vec3 colors[8];

void main(void) {
    
    int i = 0;
    vec3 white = vec3(1.0);
    colors[i++] = white;
    colors[i++] = vec3(0.0);
    colors[i++] = vec3(1.0, 0.0, 0.0);
    colors[i++] = vec3(0.0, 1.0, 0.0);
    float uvx = vUV.x;
    float uvy = vUV.y;
    
    gl_FragColor = texture2D(textureSampler, vUV);
    if(uvx < 0.4) {
        float y = uvy ;
        gl_FragColor = vec4(colors[int(floor(y * 3.9))], 1.0);
    }
    
}`;
