import * as shaders from './shaders.js';

let parameters = {
    nLines: 100,
    lineWidth: 15,
    angles: {
        red: 45,
        green: 90,
        blue: 135
    },
    thresholds: {
        red: 0.5,
        green: 0.5,
        blue: 0.5,
    },
    invert: {
        red: false,
        green: false,
        blue: false,
    },
    rgbOrHsv: 0,
    hueRotationBefore: 0,
    hueRotationAfter: 0,
    lines: true,
    createSVG: displayGeneratingAndDraw,
    exportSVG: ()=> {
        
        let svg = paper.project.exportSVG( { asString: true });

        // create an svg image, create a link to download the image, and click it
        let blob = new Blob([svg], {type: 'image/svg+xml'});
        let url = URL.createObjectURL(blob);
        let link = document.createElement("a");
        document.body.appendChild(link);
        link.download = 'result.svg';
        link.href = url;
        link.click();
        document.body.removeChild(link);

    },
}

var canvas = document.getElementById('canvas');
paper.setup(canvas);


let raster = new paper.Raster('indien3.jpg');

let drawing = new paper.Group()

function displayGeneratingAndDraw() {
	// if(generatingText == null) {
	// 	generatingText = new paper.Group()
	// 	let text = new paper.PointText({
	// 		point: paper.view.center,
	// 		content: 'Generating lines...',
	// 		fillColor: 'black',
	// 		fontFamily: 'Courier New',
	// 		fontSize: 25,
	// 		justification: 'center'
	// 	})
	// 	generatingText.addChild(text)
	// 	let textBackground = new paper.Path.Rectangle(text.bounds)
	// 	textBackground.fillColor = 'white'
	// 	generatingText.addChild(textBackground)
	// 	textBackground.sendToBack()
	// }
	
	// generatingText.bringToFront()
	// generatingText.visible = true
	// setTimeout(()=> {
	// 	draw()
	// }, 250)
    draw()
}

function createPath(colorName) {
    let path = new paper.Path();
    path.strokeWidth = 1;
    path.strokeColor = colorName;
    drawing.addChild(path);
    return path;
}


function drawLines(raster, colorName) {

    let width = raster.bounds.width
    let height = raster.bounds.height
    let centerX = raster.bounds.center.x
    let centerY = raster.bounds.center.y
    let maxSize = Math.max(width, height) * Math.sqrt(2);
    let step = maxSize / parameters.nLines;
    let lines = new paper.CompoundPath();
    for(let i=0 ; i<=parameters.nLines ; i++) {
        let line = new paper.Path();
        line.add(new paper.Point(centerX - maxSize / 2, i * step + centerY - maxSize / 2))
        line.add(new paper.Point(centerX + maxSize / 2, i * step + centerY - maxSize / 2))
        lines.addChild(line);
    }
    lines.position.x += width / 2
    lines.position.y += height / 2
    // lines.pivot = raster.bounds.center
    lines.rotation = parameters.angles[colorName];
    
    let rasterRectangle = new paper.Rectangle(0, 0, raster.width, raster.height)
    let imageData = raster.getImageData(rasterRectangle);

    let offset = colorName == 'red' ? 0 : colorName == 'green' ? 1 : colorName == 'blue' ? 2 : 0;
    
    let threshold = 255/4

    for(let line of lines.children) {
        let length = line.length

        let path = createPath(colorName);

        for(let i=0 ; i<length ; i++) {
            let point = line.getPointAt(i);
            if(!rasterRectangle.contains(point)) {
                continue
            }

            // let pi = Math.round(point.y - raster.bounds.top)
            // let pj = Math.round(point.x - raster.bounds.left)

            // if(pi < 0 || pj < 0 || pi >= raster.height || pj >= raster.width) {
            //     continue
            // }

            // let pixelIndex = pi*raster.width*4+pj+offset
            // let pixelIndex = pj*raster.height*4+pi+offset
            // console.log(pi, pj, pixelIndex, imageData.data.length, imageData.data[pixelIndex])
            let color = raster.getPixel(point)

            // let color = imageData.data[pixelIndex];

            if(color[colorName] > parameters.thresholds[colorName] && path.segments.length == 0) {
                path.add(point)
            } else if(color[colorName] < parameters.thresholds[colorName] && path.segments.length == 1) {
                path.add(point)
                path = createPath(colorName);
            }

            // if(color > threshold && path.segments.length == 0) {
            //     path.add(point)
            // } else if(color < threshold && path.segments.length == 1) {
            //     path.add(point)
            //     path = createPath(colorName);
            // }
        }
    }

    lines.remove()
}

function draw() {
	// if(generatingText != null) {
	// 	generatingText.visible = false
	// }

	// compoundPath.removeChildren();

    drawing.removeChildren();

    drawLines(raster, 'red');
    drawLines(raster, 'green');
    drawLines(raster, 'blue');

}

function rasterLoaded() {
    

	// if(preview != null) {
	// 	preview.remove();
	// }
	// preview = raster.clone();
	// let maxContainerSize = paper.view.bounds.width < paper.view.bounds.height ? paper.view.bounds.width : paper.view.bounds.height;

 //    let ratio = preview.width / preview.height;
 //    let size = maxContainerSize / 8;
 //    if(preview.width > preview.height) {
 //        preview.height = size;
 //        preview.width = preview.height * ratio;
 //    } else {
 //        preview.width = size;
 //        preview.height = preview.width / ratio;
 //    }

	// preview.position = paper.view.bounds.topLeft.add(preview.bounds.size.multiply(0.5));



    // let maxSizeOfRaster = Math.max(raster.width, raster.height);
    // let maxSizeAllowed = 500;
    
    // if(maxSizeOfRaster > maxSizeAllowed) {
    //     let ratio = raster.width / raster.height;
    //     if(raster.width > raster.height) {
    //         raster.height = maxSizeAllowed;
    //         raster.width = raster.height * ratio;
    //     } else {
    //         raster.width = maxSizeAllowed;
    //         raster.height = raster.width / ratio;
    //     }
    // }

	// raster.remove();
	// displayGeneratingAndDraw();

    raster.fitBounds(paper.view.bounds)
    shaders.updateTexture()
}

function updateUniforms() {
    shaders.updateUniforms(parameters)
}

function onDocumentDrag(event) {
	event.preventDefault();
}

function onDocumentDrop(event) {
	event.preventDefault();

	var file = event.dataTransfer.files[0];
	var reader = new FileReader();

    raster.remove()

	reader.onload = function (event) {
		var image = document.createElement('img');
		image.onload = function () {
			raster = new paper.Raster(image);
            raster.onLoad = rasterLoaded
            shaders.updateTexture()
		};
		image.src = event.target.result;
	};
	reader.readAsDataURL(file);
}

document.addEventListener('drop', onDocumentDrop, false);
document.addEventListener('dragover', onDocumentDrag, false);
document.addEventListener('dragleave', onDocumentDrag, false);


var gui = new dat.GUI();

gui.add(parameters, 'createSVG');
gui.add(parameters, 'exportSVG');
gui.add(parameters, 'lines').onChange( ()=> updateUniforms() );
gui.add(parameters, 'nLines', 1, 500, 1).onChange( ()=> updateUniforms() );
gui.add(parameters, 'lineWidth', 1, 20, 1).onChange( ()=> updateUniforms() );
gui.add(parameters, 'rgbOrHsv', 0, 1, 0.01).onChange( ()=> updateUniforms() );
gui.add(parameters, 'hueRotationBefore', 0, 1, 0.01).onChange( ()=> updateUniforms() );
gui.add(parameters, 'hueRotationAfter', 0, 1, 0.01).onChange( ()=> updateUniforms() );
gui.add(parameters.angles, 'red', 0, 360, 1).name('red angle').onChange( ()=> updateUniforms() );
gui.add(parameters.angles, 'green', 0, 360, 1).name('green angle').onChange( ()=> updateUniforms() );
gui.add(parameters.angles, 'blue', 0, 360, 1).name('blue angle').onChange( ()=> updateUniforms() );
gui.add(parameters.thresholds, 'red', 0, 1, 0.01).name('red threshold').onChange( ()=> updateUniforms() );
gui.add(parameters.thresholds, 'green', 0, 1, 0.01).name('green threshold').onChange( ()=> updateUniforms() );
gui.add(parameters.thresholds, 'blue', 0, 1, 0.01).name('blue threshold').onChange( ()=> updateUniforms() );

gui.add(parameters.invert, 'red').name('invert red').onChange( ()=> updateUniforms() );
gui.add(parameters.invert, 'green').name('invert green').onChange( ()=> updateUniforms() );
gui.add(parameters.invert, 'blue').name('invert blue').onChange( ()=> updateUniforms() );

// let rectangle = new paper.Path.Rectangle(paper.view.bounds.expand(-40))
// rectangle.fillColor = 'red'

shaders.activate('trichromatism', parameters)
shaders.setCanvas(paper.view.element)

function animate() {
    requestAnimationFrame( animate )
    shaders.render()
}
animate()
window.shaders = shaders
raster.on('load', rasterLoaded);
shaders.updateTexture()