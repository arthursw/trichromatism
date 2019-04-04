export let screenWidth = window.innerWidth;
export let screenHeight = window.innerHeight;
export let screenAspectRatio = screenWidth / screenHeight;

// var stats;
var mesh;
// var camera;
// var cameraRig;
export var activeCamera, cameraPerspective, cameraOrtho;
// var cameraPerspectiveHelper, cameraOrthoHelper;

export var bounds = new THREE.Box2();

export var container = document.body;
export var scene, renderer;
var remanence = false;

let group = null;

// init();
// animate();

export function setActiveCamera(camera) {
    activeCamera = camera;
}

export function setRemanence(newRemanence) {
    remanence = newRemanence;
}

function buildEnvironment() {

    // Grid
    var size = 500, step = 50;
    var geometry = new THREE.Geometry();
    for ( var i = - size; i <= size; i += step ) {
        geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
        geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );
        geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
        geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );
    }
    var material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } );
    var line = new THREE.LineSegments( geometry, material );
    group.add( line );
    // Cubes
    var geometry = new THREE.BoxGeometry( 50, 50, 50 );
    var material = new THREE.MeshLambertMaterial( { color: 0xffffff, overdraw: 0.5 } );
    for ( var i = 0; i < 100; i ++ ) {
        var cube = new THREE.Mesh( geometry, material );
        cube.scale.y = Math.floor( Math.random() * 2 + 1 );
        cube.position.x = Math.floor( ( Math.random() * 1000 - 500 ) / 50 ) * 50 + 25;
        cube.position.y = ( cube.scale.y * 50 ) / 2;
        cube.position.z = Math.floor( ( Math.random() * 1000 - 500 ) / 50 ) * 50 + 25;
        group.add(cube);
    }
    // Lights
    var ambientLight = new THREE.AmbientLight( Math.random() * 0x10 );
    group.add( ambientLight );
    var directionalLight = new THREE.DirectionalLight( Math.random() * 0xffffff );
    directionalLight.position.x = Math.random() - 0.5;
    directionalLight.position.y = Math.random() - 0.5;
    directionalLight.position.z = Math.random() - 0.5;
    directionalLight.position.normalize();
    group.add( directionalLight );
    var directionalLight = new THREE.DirectionalLight( Math.random() * 0xffffff );
    directionalLight.position.x = Math.random() - 0.5;
    directionalLight.position.y = Math.random() - 0.5;
    directionalLight.position.z = Math.random() - 0.5;
    directionalLight.position.normalize();
    group.add( directionalLight );
}

function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    scene = new THREE.Scene();

    //

    // camera = new THREE.PerspectiveCamera( 50, 0.5 * screenAspectRatio, 1, 10000 );
    // camera.position.z = 2500;

    cameraPerspective = new THREE.PerspectiveCamera( 50, screenAspectRatio, 150, 1000 );
    
    // cameraPerspectiveHelper = new THREE.CameraHelper( cameraPerspective );
    // group.add( cameraPerspectiveHelper );

    //
    
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    cameraOrtho = new THREE.OrthographicCamera( screenWidth / - 2, screenWidth / 2, screenHeight / 2, screenHeight / - 2, 1, 1000 );
    // cameraOrtho = new THREE.OrthographicCamera( -0.5 * frustumSize * screenAspectRatio, 0.5 * frustumSize * screenAspectRatio, frustumSize / 2, frustumSize / - 2, 150, 1000 );
    window.cameraOrtho = cameraOrtho
    bounds.min.x = cameraOrtho.left
    bounds.min.y = cameraOrtho.bottom
    bounds.max.x = cameraOrtho.right
    bounds.max.y = cameraOrtho.top
    
    // cameraOrthoHelper = new THREE.CameraHelper( cameraOrtho );
    // group.add( cameraOrthoHelper );

    //

    activeCamera = cameraOrtho;
    // activeHelper = cameraPerspectiveHelper;


    // counteract different front orientation of cameras vs rig

    // cameraOrtho.rotation.y = Math.PI;
    // cameraPerspective.rotation.y = Math.PI;

    // cameraRig = new THREE.Group();

    // cameraRig.add( cameraPerspective );
    // cameraRig.add( cameraOrtho );

    // group.add( cameraRig );

    //

    // group = new THREE.Group()
    // scene.add(group)

    // mesh = new THREE.Mesh(
    //     new THREE.SphereBufferGeometry( 100, 16, 8 ),
    //     new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true } )
    // );
    // group.add( mesh );

    // var mesh2 = new THREE.Mesh(
    //     new THREE.SphereBufferGeometry( 50, 16, 8 ),
    //     new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } )
    // );
    // mesh2.position.y = 150;
    // mesh.add( mesh2 );

    // var mesh3 = new THREE.Mesh(
    //     new THREE.SphereBufferGeometry( 5, 16, 8 ),
    //     new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: true } )
    // );
    // mesh3.position.z = 150;
    // group.add(mesh3);
    // // cameraRig.add( mesh3 );

    // // cameraRig.position.y = 900;
    // // cameraRig.rotation.x += Math.PI / 2;

    // //

    // var geometry = new THREE.BufferGeometry();
    // var vertices = [];

    // for ( var i = 0; i < 10000; i ++ ) {

    //     vertices.push( THREE.Math.randFloatSpread( 2000 ) ); // x
    //     vertices.push( THREE.Math.randFloatSpread( 2000 ) ); // y
    //     vertices.push( THREE.Math.randFloatSpread( 2000 ) ); // z

    // }

    // geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

    // var particles = new THREE.Points( geometry, new THREE.PointsMaterial( { color: 0x888888, size: 3 } ) );
    // group.add( particles );

    // buildEnvironment()

    //
    
    renderer = new THREE.WebGLRenderer( { antialias: true, preserveDrawingBuffer: true } );

    // renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( screenWidth, screenHeight );
    container.appendChild( renderer.domElement );

    // renderer.autoClear = false;
    // renderer.autoClearColor = false;
    
    // renderer.setClearColor ( new THREE.Color(1, 1, 1), 1);
    renderer.clear();
    //

    // stats = new Stats();
    // container.appendChild( stats.dom );

    //

    window.addEventListener( 'resize', onWindowResize, false );
    document.addEventListener( 'keydown', onKeyDown, false );

    // group.visible = false
}

//

function onKeyDown( event ) {

    switch ( event.keyCode ) {

        case 37: /*left arrow*/

            // cameraRig.position.x -= 10;
            cameraPerspective.rotation.y -= 0.1;
            cameraOrtho.rotation.y -= 0.1;

            break;

        case 39: /*right arrow*/

            // cameraRig.position.x += 10;
            cameraPerspective.rotation.y += 0.1;
            cameraOrtho.rotation.y += 0.1;

            break;

        case 38: /*up arrow*/

            // cameraRig.position.y += 10;
            cameraPerspective.rotation.z += 0.1;
            cameraOrtho.rotation.z += 0.1;

            break;

        case 40: /*down arrow*/

            // cameraRig.position.y -= 10;
            cameraPerspective.rotation.z -= 0.1;
            cameraOrtho.rotation.z -= 0.1;

            break;

        case 79: /*O*/

            // cameraOrtho.position.set(cameraPerspective.position);
            // cameraOrtho.rotation.set(cameraPerspective.rotation)

            // activeCamera = cameraOrtho;

            // activeHelper = cameraOrthoHelper;

            break;

        case 80: /*P*/

            // activeCamera = cameraPerspective;
            // activeHelper = cameraPerspectiveHelper;

            break;

    }
    if(event.key == 'a') {
        cameraPerspective.position.y += 10;
    } else if(event.key == 'z') {
        cameraPerspective.position.y -= 10;
    }
    
    // console.log(event.code)
    // console.log(event.key == "z")
    // console.log(event.charCode)

}

//

function onWindowResize() {
    
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    screenAspectRatio = screenWidth / screenHeight;

    renderer.setSize( screenWidth, screenHeight );

    // camera.screenAspectRatio = 0.5 * screenAspectRatio;
    // camera.updateProjectionMatrix();

    cameraPerspective.screenAspectRatio = screenAspectRatio;
    cameraPerspective.updateProjectionMatrix();

    // cameraOrtho.left = - 0.5 * frustumSize * screenAspectRatio;
    // cameraOrtho.right = 0.5 * frustumSize * screenAspectRatio;
    // cameraOrtho.top = frustumSize / 2;
    // cameraOrtho.bottom = - frustumSize / 2;
    cameraOrtho.left = - 0.5 * screenWidth;
    cameraOrtho.right = 0.5 * screenWidth;
    cameraOrtho.top = 0.5 * screenHeight;
    cameraOrtho.bottom = - 0.5 * screenHeight;
    cameraOrtho.updateProjectionMatrix();

    bounds.min.x = cameraOrtho.left
    bounds.min.y = cameraOrtho.bottom
    bounds.max.x = cameraOrtho.right
    bounds.max.y = cameraOrtho.top

    document.dispatchEvent(new CustomEvent('resizeThreeJS', { detail: { width: screenWidth, height: screenHeight } }));
}

//

function animate() {

    requestAnimationFrame( animate );

    render();
    // stats.update();

}


function render() {

    var r = Date.now() * 0.0005;

    // mesh.position.x = 700 * Math.cos( r );
    // mesh.position.z = 700 * Math.sin( r );
    // mesh.position.y = 700 * Math.sin( r );

    // mesh.children[ 0 ].position.x = 70 * Math.cos( 2 * r );
    // mesh.children[ 0 ].position.z = 70 * Math.sin( r );

    if ( activeCamera === cameraPerspective ) {

        // cameraPerspective.fov = 35 + 30 * Math.sin( 0.5 * r );
        // cameraPerspective.far = mesh.position.length();
        cameraPerspective.updateProjectionMatrix();

        // cameraPerspectiveHelper.update();
        // cameraPerspectiveHelper.visible = true;

        // cameraOrthoHelper.visible = false;

    } else {

        // cameraOrtho.far = mesh.position.length();
        // cameraOrtho.updateProjectionMatrix();

        // cameraOrthoHelper.update();
        // cameraOrthoHelper.visible = true;

        // cameraPerspectiveHelper.visible = false;

    }

    // cameraRig.lookAt( mesh.position );
    // cameraRig.rotation.x += 0.1;

    if(!remanence) {
        // renderer.clear();
    }

    // activeHelper.visible = false;

    // renderer.setViewport( 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT );
    renderer.render( scene, activeCamera );

    // activeHelper.visible = true;

    // renderer.setViewport( SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2, SCREEN_HEIGHT );
    // renderer.render( scene, camera );

}





let initialized = false;

// let width = window.innerWidth;
// let height = window.innerHeight;

export async function initializeThreeJS() {
    // camera = new THREE.Camera();
    // camera.position.z = 1;
    // scene = new THREE.Scene();
    // renderer = new THREE.WebGLRenderer();
    // container.appendChild( renderer.domElement );
    // renderer.setSize( width, height );
    if(initialized) {
        return
    }
    init();
    initialized = true;
}

// export function activate(shaderName) {
// 	if(!initialized) {
// 		initializeThreeJS(shaderName)
// 	} else {
// 		$(renderer.domElement).show()
// 	}
// }

// export function deactivate() {
// 	$(renderer.domElement).hide()
// }

export function renderThreeJS() {
	if(renderer == null) {
		return
	}
    render()

    // const tmpHeight = window.innerHeight;
    // const tmpWidth = window.innerWidth;
    // if (tmpHeight !== height || tmpWidth !== width) {
    //     height = tmpHeight;
    //     width = tmpWidth;
    //     resizeThreeJS(width, height);
    // }

    // renderer.render( scene, camera );
}

export function resizeThreeJS() {

	// width = window.innerWidth;
	// height = window.innerHeight;
 //    renderer.setSize(width, height);
    
 //    document.dispatchEvent(new CustomEvent('resizeThreeJS', { detail: { width: width, height: height } }));
};
