import * as fragmentShader from './shaders/trichromatism.js';
import * as vertexShader from './shaders/vertex.js';

var dynamicTexture = null;
var mesh = null;
var shaderMaterial = null;
var scene = null;

var createScene = async function(engine, paperCanvas) {
    
    scene = new BABYLON.Scene(engine);
    // var camera = new BABYLON.ArcRotateCamera("Camera", 0, Math.PI / 2, 12, BABYLON.Vector3.Zero(), scene);

    // camera.attachControl(canvas, false);
    // camera.lowerRadiusLimit = 1;
    // camera.minZ = 1.0;
    
    var camera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(0,0,-1), scene);
    camera.setTarget(new BABYLON.Vector3(0,0,0));
    // Activate the orthographic projection
    camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;

    //These values are required for using an orthographic mode,
    // and represents the coordinates of the square containing all the camera view.
    // this.size is the size of our arena
    camera.orthoLeft = - window.innerWidth / 2;
    camera.orthoRight = window.innerWidth / 2;
    camera.orthoTop =  window.innerHeight / 2;
    camera.orthoBottom = - window.innerHeight / 2;
    

    // let fragmentShader = await import('./shaders/trichromatism.js');
    // // let fragmentShader = await import('./shaders/test2.js');
    // let vertexShader = await import('./shaders/vertex.js');

    BABYLON.Effect.ShadersStore["trichromatismFragmentShader"] = fragmentShader.shader.trim();
    BABYLON.Effect.ShadersStore["trichromatismVertexShader"] = vertexShader.shader.trim();

    shaderMaterial = new BABYLON.ShaderMaterial("shader", scene, {
        vertex: "trichromatism",
        fragment: "trichromatism",
    },
        {
            attributes: ["position", "normal", "uv"],
            uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
        });

    // var plane = BABYLON.MeshBuilder.CreatePlane("plane", {height:200, width: 100, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);

    mesh = BABYLON.MeshBuilder.CreatePlane("mesh", {width: window.innerWidth, height: window.innerHeight, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
    
    // var mesh = BABYLON.Mesh.CreatePlane("mesh", 1000, scene);
    // mesh.rotate(BABYLON.Axis.Y, Math.PI*.5);
        
    dynamicTexture = new BABYLON.Texture("http://i.imgur.com/HP1V7TJ.png", scene);

    // dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", paperCanvas, scene);
    // dynamicTexture.update();
    shaderMaterial.setTexture("textureSampler", dynamicTexture);
    shaderMaterial.setFloat("time", 0);
    shaderMaterial.setVector2("screenResolution", new BABYLON.Vector2(window.innerWidth, window.innerHeight));
    shaderMaterial.setVector2("textureResolution", new BABYLON.Vector2(window.innerWidth, window.innerHeight));
    
    shaderMaterial.backFaceCulling = false;

    mesh.material = shaderMaterial;
    
    var time = 0;
    
    scene.registerBeforeRender(function () {

        shaderMaterial.setFloat("time", time);
        time += 0.02;

    });
    
    console.log(paper.view.bounds)
    console.log(paper.view.pixelRatio)

    return scene;

};

export async function initialize(paperCanvas) {
    

    var canvas = document.getElementById("shader-canvas");

    
    var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
    var scene = await createScene(engine, paperCanvas);

    engine.runRenderLoop(function () {
        if (scene) {
            scene.render();
        }
    });

    // Resize
    window.addEventListener("resize", function () {
        engine.resize();
    });


}

export function updateUniforms(parameters) {
    if(shaderMaterial == null) {
        return;
    }

    shaderMaterial.setInt('nLines', parameters.nLines);
    shaderMaterial.setFloat('lineWidth', parameters.lineWidth);
    shaderMaterial.setInt('rgbOrHsv', parameters.rgbOrHsv);
    shaderMaterial.setFloat('hueRotationBefore', parameters.hueRotationBefore);
    shaderMaterial.setFloat('hueRotationAfter', parameters.hueRotationAfter);
    shaderMaterial.setFloat('redAngle', parameters.angles.red);
    shaderMaterial.setFloat('greenAngle', parameters.angles.green);
    shaderMaterial.setFloat('blueAngle', parameters.angles.blue);
    shaderMaterial.setFloat('redThreshold', parameters.thresholds.red);
    shaderMaterial.setFloat('greenThreshold', parameters.thresholds.green);
    shaderMaterial.setFloat('blueThreshold', parameters.thresholds.blue);
    shaderMaterial.setInt('invertRed', parameters.invert.red);
    shaderMaterial.setInt('invertGreen', parameters.invert.green);
    shaderMaterial.setInt('invertBlue', parameters.invert.blue);
    shaderMaterial.setInt('lines', parameters.lines);
}


export function updateTexture(raster) {
    if(dynamicTexture) {
         // constructor(url: Nullable<string>, 
         //     scene: Nullable<Scene>, 
         //     noMipmap: boolean = false,
         //      invertY: boolean = true, 
         //      samplingMode: number = Texture.TRILINEAR_SAMPLINGMODE, 
         //      onLoad: Nullable<() => void> = null, 
         //      onError: Nullable<(message?: string, exception?: any) => void> = null, 
         //      buffer: Nullable<string | ArrayBuffer | HTMLImageElement | Blob> = null, deleteBuffer: boolean = false, format?: number) {

        dynamicTexture = new BABYLON.Texture(raster.toDataURL(), scene); //, false, true, BABYLON.Texture.TRILINEAR_SAMPLINGMODE, null, null, image);
        shaderMaterial.setTexture("textureSampler", dynamicTexture);
        shaderMaterial.setVector2("textureResolution", new BABYLON.Vector2(raster.width, raster.height));
    }
}

export function resize() {


};

export function mouseMove(event) {

}

export function keyDown(event) {
    if(event.key == ' ') {
    }
}

export function keyUp(event) {

}
