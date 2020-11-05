import * as fragmentShader from './shaders/trichromatismThree.js';
import * as vertexShader from './shaders/vertexThree.js';
import { scene, renderer, bounds, cameraOrtho, renderThreeJS, initializeThreeJS, container, resizeThreeJS } from './three-scene.js'

let elapsedSeconds = 0
var uniforms, material, mesh

let initialized = false

let width = window.innerWidth
let height = window.innerHeight

let parameters = null

let shaderName = null

let texture = null
let canvas = null

let group = null
let imageSize = new paper.Point()

function renderModeToInt() {
    return parameters.renderMode == 'Preview' ? 0 : parameters.renderMode == 'Image' ? 2 : 1;
}
function createUniforms() {
    if(uniforms) {
        return uniforms
    }

    width = window.innerWidth
    height = window.innerHeight

    uniforms = {
        time: { type: "f", value: Date.now() },
        screenResolution: { type: "v2", value: new THREE.Vector2(width, height) },
        colors: { type: "v3v", value: parameters.colorVectorArray },
        mouse: { type: "v4", value: new THREE.Vector4(0, 0) },
        textureSampler: { value: texture },
        textureResolution: new THREE.Uniform(new THREE.Vector2(canvas ? canvas.height / 2 : 0, canvas ? canvas.width / 2 : 0)),
        nLines: { type: "i", value: parameters.nLines },
        lineWidth: { type: "f", value: parameters.lineWidth },
        // lineAA: { type: "f", value: parameters.lineAA },
        rgbOrHsv: { type: "f", value: parameters.rgbOrHsv },
        hueRotationBefore: { type: "f", value: parameters.hueRotationBefore },
        hueRotationAfter: { type: "f", value: parameters.hueRotationAfter },
        angles: { type: "v4", value:  new THREE.Vector4(parameters.angles.red, parameters.angles.green, parameters.angles.blue, parameters.angles.black) },
        useBlack: { type: "b", value: parameters.useBlack },
        showColors: { type: "b", value: parameters.showColors },
        redThreshold: { type: "f", value: parameters.thresholds.red },
        greenThreshold: { type: "f", value: parameters.thresholds.green },
        blueThreshold: { type: "f", value: parameters.thresholds.blue },
        invertRed: { type: "b", value: parameters.invert.red },
        invertGreen: { type: "b", value: parameters.invert.green },
        invertBlue: { type: "b", value: parameters.invert.blue },
        renderMode: {type: "i", value: renderModeToInt()},
        mixWeight: {type: "f", value: parameters.mixWeight},
        hue: {type: "f", value: parameters.preprocessing.hue},
        saturation: {type: "f", value: parameters.preprocessing.saturation},
        lightness: {type: "f", value: parameters.preprocessing.lightness},
    };

    return uniforms
}

async function createMaterial(fragmentShader) {

    // vertexShader = await import('./shaders/vertexThree.js')

    uniforms = createUniforms()

    material = new THREE.ShaderMaterial( {
        uniforms: uniforms,
        // extensions: { derivatives: true },
        vertexShader: vertexShader.shader.trim(),
        fragmentShader: fragmentShader.trim(),
        side: THREE.DoubleSide
    });

    // material = new THREE.MeshBasicMaterial({color: 0x00ff00})

    return material
}

export async function initialize(newCanvas, newParameters) {
    await activate('trichromatismThree', newParameters)
    setCanvas(newCanvas)
}

export async function init() {

    initializeThreeJS();

    // fragmentShader = await import('./shaders/trichromatism.js')
    // fragmentShader = await import('./shaders/trichromatismThree.js')
    // fragmentShader = await import('./shaders/testThree2.js')
    
    material = await createMaterial(fragmentShader.shader)

    width = window.innerWidth;
    height = window.innerHeight;

    mesh = new THREE.Mesh( new THREE.PlaneGeometry( width, height ), material);
    // mesh = new THREE.Mesh(geometry, material);

    mesh.position.z = -1
    window.mesh = mesh
    scene.add( mesh );

    uniforms.screenResolution.value.x = width;
    uniforms.screenResolution.value.y = height;
    initialized = true;

}

export async function loadFile(shaderName) {
    // fragmentShader = await import('./shaders/' + shaderName + '.js')

    fileChanged(fragmentShader.shader)
}

export async function fileChanged(fragmentShader) {
	mesh.material = await createMaterial(fragmentShader)
    
    resizeThreeJS()

}

export async function activate(newShaderName, newParameters) {
    parameters = newParameters

    $(paper.view.element).hide()
    // paper.project.clear()

    shaderName = newShaderName

	if(!initialized) {
		await init(shaderName)
        
	}
}

export function setCanvas(newCanvas) {
    canvas = newCanvas
    texture = new THREE.CanvasTexture(canvas, THREE.UVMapping)
    texture.needsUpdate = true

    window.texture = texture
    if(uniforms) {
        uniforms.textureSampler.value = texture
        uniforms.textureResolution.value = new THREE.Vector2(canvas.width, canvas.height)
    }
}

export function updateTexture() {
    if(texture) {
        texture.needsUpdate = true
    }
}

export function updateUniforms(parameters) {
    if(uniforms == null) {
        return;
    }
    uniforms.nLines.value = parameters.nLines
    uniforms.lineWidth.value = parameters.lineWidth
    // uniforms.lineAA.value = parameters.lineAA

    uniforms.rgbOrHsv.value = parameters.rgbOrHsv
    uniforms.hueRotationBefore.value = parameters.hueRotationBefore
    uniforms.hueRotationAfter.value = parameters.hueRotationAfter

    uniforms.angles.value = new THREE.Vector4(parameters.angles.red, parameters.angles.green, parameters.angles.blue, parameters.angles.black)
    uniforms.useBlack.value = parameters.useBlack
    uniforms.showColors.value = parameters.showColors

    uniforms.redThreshold.value = parameters.thresholds.red
    uniforms.greenThreshold.value = parameters.thresholds.green
    uniforms.blueThreshold.value = parameters.thresholds.blue

    uniforms.invertRed.value = parameters.invert.red
    uniforms.invertGreen.value = parameters.invert.green
    uniforms.invertBlue.value = parameters.invert.blue

    uniforms.renderMode.value = renderModeToInt()
    
    uniforms.mixWeight.value = parameters.mixWeight

    uniforms.hue.value = parameters.preprocessing.hue
    uniforms.saturation.value = parameters.preprocessing.saturation
    uniforms.lightness.value = parameters.preprocessing.lightness

    uniforms.colors.value = parameters.colorVectorArray

    updateTexture()
}

export function deactivate() {

    paper.project.clear()
    $(paper.view.element).hide()


    if(shaderName == 'fractal') {
        deactivateFractal()
    }
}

export function render() {

	if(renderer == null || uniforms == null || canvas == null) {
		return
	}


    if(uniforms) {
        uniforms.time.value = Date.now();
    }
    renderThreeJS();
}

export function resize() {
    if(mesh.geometry.vertices.length >= 4) {
        mesh.geometry.vertices[0].x = bounds.min.x
        mesh.geometry.vertices[0].y = bounds.max.y
        mesh.geometry.vertices[1].x = bounds.max.x
        mesh.geometry.vertices[1].y = bounds.max.y
        mesh.geometry.vertices[3].x = bounds.max.x
        mesh.geometry.vertices[3].y = bounds.min.y
        mesh.geometry.vertices[2].x = bounds.min.x
        mesh.geometry.vertices[2].y = bounds.min.y
        mesh.geometry.verticesNeedUpdate = true
    }
    
    if(uniforms != null) {
        let sizeX = bounds.max.x - bounds.min.x
        let sizeY = bounds.max.y - bounds.min.y
        uniforms.screenResolution.value.x = sizeX;
        uniforms.screenResolution.value.y = sizeY;
    }

};

export function mouseMove(event) {
    let x = event.clientX / window.innerWidth
    
    if(uniforms) {
        uniforms.mouse.value.x = event.clientX;
        uniforms.mouse.value.y = window.innerHeight - event.clientY;
    }

}

export function keyDown(event) {
    if(event.key == ' ') {
        pause = !pause
    }
}

export function keyUp(event) {

}

