import { scene, renderer, bounds, cameraOrtho, renderThreeJS, initializeThreeJS, container, resizeThreeJS } from './three-scene.js'

let elapsedSeconds = 0
var uniforms, material, mesh

let initialized = false

let width = window.innerWidth
let height = window.innerHeight

let parameters = null
let vertexShader = null
let fragmentShader = null
let shaderName = null

let texture = null
let canvas = null

let group = null
let imageSize = new paper.Point()

function createUniforms() {
    if(uniforms) {
        return uniforms
    }

    width = window.innerWidth
    height = window.innerHeight

    uniforms = {
        time: { type: "f", value: Date.now() },
        resolution: { type: "v2", value: new THREE.Vector2(width, height) },
        mouse: { type: "v4", value: new THREE.Vector4(0, 0) },
        channel: { value: texture },
        channelResolution: new THREE.Uniform(new THREE.Vector2(canvas ? canvas.height / 2 : 0, canvas ? canvas.width / 2 : 0)),
        nLines: { type: "i", value: parameters.nLines },
        lineWidth: { type: "f", value: parameters.lineWidth },
        redAngle: { type: "f", value: parameters.angles.red },
        greenAngle: { type: "f", value: parameters.angles.green },
        blueAngle: { type: "f", value: parameters.angles.blue },
        redThreshold: { type: "f", value: parameters.thresholds.red },
        greenThreshold: { type: "f", value: parameters.thresholds.green },
        blueThreshold: { type: "f", value: parameters.thresholds.blue },
        lines: {type: "b", value: parameters.lines},
    };

    return uniforms
}

async function createMaterial(fragmentShader) {

    vertexShader = await import('./shaders/vertex.js')

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

export async function initialize(shaderName) {
    initializeThreeJS();


    fragmentShader = await import('./shaders/' + shaderName + '.js')
    
    material = await createMaterial(fragmentShader.shader)

    width = window.innerWidth;
    height = window.innerHeight;

    mesh = new THREE.Mesh( new THREE.PlaneGeometry( width, height ), material);
    // mesh = new THREE.Mesh(geometry, material);

    mesh.position.z = -1
    window.mesh = mesh
    scene.add( mesh );

    uniforms.resolution.value.x = width;
    uniforms.resolution.value.y = height;
    initialized = true;

}

export async function loadFile(shaderName) {
    fragmentShader = await import('./shaders/' + shaderName + '.js')

    fileChanged(fragmentShader.shader)
}

export async function fileChanged(fragmentShader) {
	mesh.material = await createMaterial(fragmentShader)
    
    resizeThreeJS()

}

export function activate(newShaderName, newParameters) {
    parameters = newParameters

    $(paper.view.element).hide()
    // paper.project.clear()

    shaderName = newShaderName

	if(!initialized) {
		initialize(shaderName)
        
	} else {
        if(shaderName) {
            loadFile(shaderName)
        }
	}
}

export function setCanvas(newCanvas) {
    canvas = newCanvas
    texture = new THREE.CanvasTexture(canvas, THREE.UVMapping)
    texture.needsUpdate = true
    window.texture = texture
    // if(uniforms) {
    //     uniforms.channel.value = texture
    //     uniforms.channelResolution.value = new THREE.Vector2(canvas.width, canvas.height)
    // }
}

export function updateTexture() {
    texture.needsUpdate = true
}

export function updateUniforms(parameters) {
    uniforms.nLines.value = parameters.nLines
    uniforms.lineWidth.value = parameters.lineWidth
    uniforms.redAngle.value = parameters.angles.red
    uniforms.greenAngle.value = parameters.angles.green
    uniforms.blueAngle.value = parameters.angles.blue
    
    uniforms.redThreshold.value = parameters.thresholds.red
    uniforms.greenThreshold.value = parameters.thresholds.green
    uniforms.blueThreshold.value = parameters.thresholds.blue

    uniforms.lines.value = parameters.lines

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
        console.log('cancel render')
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
        uniforms.resolution.value.x = sizeX;
        uniforms.resolution.value.y = sizeY;
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

document.addEventListener('resizeThreeJS', resize, false)
