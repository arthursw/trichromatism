import * as shaders from './shadersThree.js';
// import * as shaders from './shadersBabylon.js';

var canvas = document.getElementById('paper-canvas');
paper.setup(canvas);


let raster = null
let drawing = new paper.Group()

let createSVGButton = null

let exportGroups = (groups)=> {

    var container = document.createElement('div');

    var params = { width: parameters.exportWidth, height: parameters.exportHeight };
    var two = new Two(params).appendTo(container);
    
    var rect = two.makeRectangle(0, 0, parameters.exportWidth, parameters.exportHeight);
    rect.fill = new paper.Color(parameters.colors.backgroundColor).toCSS()
    rect.noStroke();

    let blobs = []
    for(let group of groups) {
        for(let i=1 ; i<group.children.length ; i++) {
            let p = group.children[i]
            let p1 = group.matrix.inverseTransform(p.firstSegment.point)
            let p2 = group.matrix.inverseTransform(p.lastSegment.point)
            let line = two.makeLine(p1.x, p1.y, p2.x, p2.y)
            line.linewidth = p.strokeWidth;
            line.stroke = p.strokeColor.toCSS();
        }

        two.update();

        // let svg = exportProject.exportSVG({ asString: true });
        container.firstElementChild.setAttribute('xmlns', "http://www.w3.org/2000/svg")

        var svgString = container.innerHTML;

        // create an svg image, create a link to download the image, and click it

        let blob = new Blob([svgString], {type: 'image/svg+xml'});
        blobs.push(blob)
    }
    return blobs
}

let parameters = {
    nLines: 195,
    lineWidth: 3,
    minLineLength: 5,
    minHoleLength: 3,
    optimizeWithRaster: true,
    preprocessing: {
        hue: 0,
        saturation: 0,
        lightness: 0,
    },
    colors: {
        color1: [16,171,255],
        color2: [215,0,139],
        color3: [255,210,0],
        backgroundColor: [255, 255, 255],
    },
    colorArray: [],
    colorVectorArray: [],
    paperColorArray: [],
    angles: {
        red: 45,
        green: 2*45,
        blue: 3*45,
        black: 4*45,
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
    renderMode: 'Preview',
    showColors: true,
    useBlack: false,
    mixWeight: 1.15,
    createSVG: createSVG,
    thresholdRaster: thresholdRaster,
    exportLayersSeparately: true,
    exportWidth: 1000,
    exportHeight: 650,
    exportSVG: ()=> {

        let bounds = new paper.Rectangle(0, 0, parameters.exportWidth, parameters.exportHeight)

        let background = new paper.Path.Rectangle(raster.bounds)
        background.fillColor = new paper.Color(parameters.colors.backgroundColor).toCSS()

        let groups = []
        
        if(parameters.exportLayersSeparately) {
        
            for(let colorName in paths) {

                let group = new paper.Group()
                group.addChildren(background)
                group.addChildren(paths[colorName])

                group.fitBounds(bounds)

                groups.push(group)

                group.remove()
            }

        } else {
            let group = new paper.Group()
            group.addChild(background)

            for(let colorName in paths) {
                group.addChildren(paths[colorName])
            }

            group.fitBounds(bounds)

            groups.push(group)
            group.remove()
        }

        var container = document.createElement('div');

        var params = { width: parameters.exportWidth, height: parameters.exportHeight };
        var two = new Two(params).appendTo(container);
        
        let blobs = []
        for(let group of groups) {
            
            var rect = two.makeRectangle(parameters.exportWidth/2, parameters.exportHeight/2, parameters.exportWidth, parameters.exportHeight);
            rect.fill = new paper.Color(parameters.colors.backgroundColor).toCSS()
            rect.noStroke();

            for(let i=1 ; i<group.children.length ; i++) {
                let p = group.children[i]

                let p1 = p.firstSegment.point
                let p2 = p.lastSegment.point
                let line = two.makeLine(p1.x, p1.y, p2.x, p2.y)
                line.linewidth = p.strokeWidth;
                line.stroke = p.strokeColor.toCSS();
            }

            two.update();

            container.firstElementChild.setAttribute('xmlns', "http://www.w3.org/2000/svg")

            var svgString = container.innerHTML;

            let blob = new Blob([svgString], {type: 'image/svg+xml'});
            blobs.push(blob)
            two.clear()
        }
        
        if(parameters.exportLayersSeparately) {

            var zip = new JSZip();

            var img = zip.folder("trichromatism");
            
            let i = 0
            for(let blob of blobs) {
                img.file('color' + i + '.svg', blob, {base64: true});
                i++
            }

            zip.generateAsync({type:"blob"})
            .then(function(content) {
                saveAs(content, "trichromatism.zip");
            });

        } else {

            let url = URL.createObjectURL(blobs[0]);
            let link = document.createElement("a");
            document.body.appendChild(link);
            link.download = 'result.svg';
            link.href = url;
            link.click();
            document.body.removeChild(link);
        }


    },
}


function rgb2xyz(rgb) {
    rgb[0] = rgb[0] > 0.04045 ? Math.pow( ( rgb[0] + 0.055 ) / 1.055, 2.4) : rgb[0] / 12.92;
    rgb[1] = rgb[1] > 0.04045 ? Math.pow( ( rgb[1] + 0.055 ) / 1.055, 2.4) : rgb[1] / 12.92;
    rgb[2] = rgb[2] > 0.04045 ? Math.pow( ( rgb[2] + 0.055 ) / 1.055, 2.4) : rgb[2] / 12.92;

    rgb[0] *= 100.0;
    rgb[1] *= 100.0;
    rgb[2] *= 100.0;

    return [rgb[0] * 0.4124 + rgb[1] * 0.3576 + rgb[2] * 0.1805, 
            rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722, 
            rgb[0] * 0.0193 + rgb[1] * 0.1192 + rgb[2] * 0.9505];
}


function xyz2lab(xyz) {
    xyz[0] = xyz[0] / 94.811;
    xyz[1] = xyz[1] / 100.000;
    xyz[2] = xyz[2] / 107.304;
    
    xyz = [ xyz[0] > 0.008856 ? Math.pow( xyz[0], 1.0/3.0) : (7.787 * xyz[0]) + (16.0 / 116.0),
            xyz[1] > 0.008856 ? Math.pow( xyz[1], 1.0/3.0) : (7.787 * xyz[1]) + (16.0 / 116.0),
            xyz[2] > 0.008856 ? Math.pow( xyz[2], 1.0/3.0) : (7.787 * xyz[2]) + (16.0 / 116.0) ];

    return [ (116.0 * xyz[1]) - 16.0, 500.0 * (xyz[0] - xyz[1]), 200.0 * (xyz[1] - xyz[2]) ];
}

function rgb2lab(rgb) {
    let xyz = rgb2xyz(rgb);
    let lab = xyz2lab(xyz);
    return lab;
}

function colorDifferenceCIE94FromLab(cieLab1, cieLab2) {

    // Just to make it more readable
    let cL1 = cieLab1[0];
    let ca1 = cieLab1[1];
    let cb1 = cieLab1[2];

    let cL2 = cieLab2[0];
    let ca2 = cieLab2[1];
    let cb2 = cieLab2[2];

    let c1 = Math.sqrt(ca1 * ca1 + cb1 * cb1);
    let c2 = Math.sqrt(ca2 * ca2 + cb2 * cb2);
    
    let dL = cL2 - cL1;

    let dC = c2 - c1;

    let dE = Math.sqrt( (cL1 - cL2) * (cL1 - cL2) + (ca1 - ca2) * (ca1 - ca2) + (cb1 - cb2) * (cb1 - cb2) );

    let dH = (dE * dE) - (dL * dL) - (dC * dC);

    dH = dH > 0.0 ? Math.sqrt(dH) : 0.0;

    let kL = 1.0;
    let kC = 1.0;
    let kH = 1.0;
    let k1 = 0.045;
    let k2 = 0.015;

    let sL = 1.0;
    let sC = 1.0 + ( k1 * c1 ); // sX
    let sH = 1.0 + ( k2 * c1 ); // sH

    let dLw = dL / (kL * sL);
    let dCw = dC / (kC * sC);
    let dHw = dH / (kH * sH);

    let deltaE94 = Math.sqrt(dLw * dLw + dCw * dCw + dHw * dHw);

    return deltaE94;
}

function paperColorToArray(color) {
    return [color.red, color.green, color.blue, color.alpha]
}

function colorDifferenceCIE94FromRGB(rgb1, rgb2) {
    let lab1 = rgb2lab(paperColorToArray(rgb1));
    let lab2 = rgb2lab(paperColorToArray(rgb2));
    return colorDifferenceCIE94FromLab(lab1, lab2);
}

let colorGroup = new paper.Group()
let background = new paper.Path.Rectangle(paper.view.bounds)
background.fillColor = 'white'
background.sendToBack()

function showSVG() {

    raster.visible = false

    paper.project.activeLayer.removeChildren()
    
    if(projectRaster) {
        projectRaster.visible = true
        paper.project.activeLayer.addChild(projectRaster)
    }
    
    // if(parameters.showColors) {
    //     colorGroup.visible = true
    //     paper.project.activeLayer.addChild(colorGroup)
    //     showColors()
    // }
    // createSVGButton.name('Preview')

    $('#shader-canvas').hide()
    $('#paper-canvas').show()
}

function showPreview() {
    raster.visible = true

    paper.project.activeLayer.removeChildren()
    paper.project.activeLayer.addChild(background)
    paper.project.activeLayer.addChild(raster)

    if(projectRaster) {
        projectRaster.visible = false
    }

    setTimeout(()=>shaders.updateUniforms(parameters), 100)
    // createSVGButton.name('Create SVG')

    $('#shader-canvas').show()
    $('#paper-canvas').hide()
}

function createSVG() {

    showSVG()
    draw()

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
}

function vector3FromArray(a) {
    return new THREE.Vector3().fromArray(a);
}

function vector3FromColor(c) {
    return vector3FromArray(c.gl());
}

// function mixColors(c1, c2) {
//     let c1cmyk = c1.cmyk()
//     let c2cmyk = c2.cmyk()
//     return chroma(c1cmyk[0] + c2cmyk[0], c1cmyk[1] + c2cmyk[1], c1cmyk[2] + c2cmyk[2], c1cmyk[3] + c2cmyk[3], 'cmyk');
// }

function mixColors(c1, c2) {
    let c1cmyk = c1.cmyk()
    let c2cmyk = c2.cmyk()
    return chroma( (c1cmyk[0] + c2cmyk[0]) / parameters.mixWeight, (c1cmyk[1] + c2cmyk[1]) / parameters.mixWeight, (c1cmyk[2] + c2cmyk[2]) / parameters.mixWeight, (c1cmyk[3] + c2cmyk[3]) / parameters.mixWeight, 'cmyk');
}

function mixColors3(c1, c2, c3) {
    return mixColors(mixColors(c1, c2), c3);
}

function getColorArray() {
    let color1 = chroma(parameters.colors.color1)
    let color2 = chroma(parameters.colors.color2)
    let color3 = chroma(parameters.colors.color3)
    let c1 = color1
    let c2 = color2
    let c3 = color3
    let c12 = mixColors(color1, color2)
    let c13 = mixColors(color1, color3)
    let c23 = mixColors(color2, color3)
    let c123 = mixColors3(color1, color2, color3)
    let black = chroma('black')
    let white = chroma('white')
    return [c1, c2, c3, c12, c13, c23, c123, black, white];
}

function thresholdRaster() {
    let newRaster = raster.clone()
    newRaster.width /= 4
    newRaster.height /= 4
    for(let i=0 ; i<newRaster.height ; i++) {
        for(let j=0 ; j<newRaster.width ; j++) {
            let color = newRaster.getPixel(j, i)
            let index = getClosestColorIndex(color)
            newRaster.setPixel(j, i, parameters.paperColorArray[index])
        }
    }
    newRaster.visible = true
    newRaster.width *= 4
    newRaster.height *= 4
    paper.project.activeLayer.addChild(newRaster)

    window.newRaster = newRaster
}

window.thresholdRaster = thresholdRaster

function showColors() {
    colorGroup.removeChildren()
    
    let x = paper.view.bounds.left
    let y = paper.view.bounds.bottom

    for(let c of parameters.colorArray) {
        y -= 40
        let colorRectangle = new paper.Path.Rectangle(x, y, 40, 40)

        colorRectangle.fillColor = c.css()

        colorGroup.addChild(colorRectangle)
    }
}

function updateColorArrays() {

    let colorVectorArray = []
    let paperColorArray = []

    for(let c of parameters.colorArray) {
        colorVectorArray.push(vector3FromColor(c))
        paperColorArray.push(new paper.Color(c.gl()))
    }

    parameters.colorVectorArray = colorVectorArray
    parameters.paperColorArray = paperColorArray
}

function createPath(currentColorIndex) {
    let path = new paper.Path();
    path.strokeWidth = parameters.lineWidth;
    path.strokeColor = parameters.paperColorArray[currentColorIndex];
    path.blendMode = 'multiply'
    path.data.black = false
    // drawing.addChild(path);
    return path;
}

let lines = new paper.CompoundPath();
let rasterRectangle = null;

let currentColorIndex = 0;
let currentLine = null;
let currentPixelOnLine = 0;


function getClosestColorIndex(pixelColor) {
    let minDistance = Number.MAX_VALUE
    let distance = 0
    let closestColorIndex = 0
    let index = 0
    for(let color of parameters.paperColorArray) {
        if(index == 7 && !parameters.useBlack) {
            index++
            continue
        }
        // let distance = chroma.deltaE(color, pixelColor)
        let distance = colorDifferenceCIE94FromRGB(pixelColor, color)
        if(distance < minDistance) {
            minDistance = distance
            closestColorIndex = index
        }
        index++
    }
    return closestColorIndex
}

function mustColor(pixelColor, colorIndex) {
    let closestColorIndex = getClosestColorIndex(pixelColor)
    let black = closestColorIndex == 7
    if(parameters.useBlack && black) {
        return -1
    }
    let white = closestColorIndex == 8
    if(white) {
        return 0
    }
    let mc = closestColorIndex == colorIndex || (
            colorIndex == 0 && ( closestColorIndex == 3 || closestColorIndex == 4 || closestColorIndex == 6 ) ||
            colorIndex == 1 && ( closestColorIndex == 3 || closestColorIndex == 5 || closestColorIndex == 6 ) ||
            colorIndex == 2 && ( closestColorIndex == 4 || closestColorIndex == 5 || closestColorIndex == 6 ) )
    return mc ? 1 : 0
}


function drawLines() {


    let width = raster.bounds.width
    let height = raster.bounds.height
    let centerX = raster.bounds.center.x
    let centerY = raster.bounds.center.y
    
    let maxSize = Math.max(width, height) * Math.sqrt(2);
    let maxViewSize = Math.max(paper.view.bounds.width, paper.view.bounds.height)
    let step = maxViewSize / parameters.nLines;
    // let step = maxSize / parameters.nLines;
    let nSteps = Math.floor(maxSize / step);

    lines.removeChildren()

    for(let i=0 ; i<=nSteps ; i++) {
        let line = new paper.Path();
        line.add(new paper.Point(centerX - maxSize / 2, i * step + centerY - maxSize / 2))
        line.add(new paper.Point(centerX + maxSize / 2, i * step + centerY - maxSize / 2))
        lines.addChild(line);
    }

    // lines.position.x += width / 2
    // lines.position.y += height / 2
    // lines.pivot = raster.bounds.center

    lines.rotation = parameters.angles[currentColorIndex == 0 ? 'red' : currentColorIndex == 1 ? 'green' : currentColorIndex == 2 ? 'blue' : 'black'];
   

    
    // if(!lines.bounds.contains(rasterRectangle)) {
        
    //     console.log('lines bounds', lines.bounds)
    //     console.log('raster bounds', rasterRectangle)
    //     console.log('paper view bounds', paper.view.bounds)
        
    //     console.log('error')
    //     return
    // }
    // return

    // let imageData = raster.getImageData(rasterRectangle);

    // let offset = colorName == 'red' ? 0 : colorName == 'green' ? 1 : colorName == 'blue' ? 2 : 0;
    
    // let threshold = 255/4

    currentLine = lines.firstChild
    currentPixelOnLine = 0

    // for(let line of lines.children) {
    //     let length = line.length

    //     let path = createPath(colorName);

    //     for(let i=0 ; i<length ; i++) {
    //         let point = line.getPointAt(i);
    //         if(!rasterRectangle.contains(point)) {
    //             continue
    //         }

    //         // let pi = Math.round(point.y - raster.bounds.top)
    //         // let pj = Math.round(point.x - raster.bounds.left)

    //         // if(pi < 0 || pj < 0 || pi >= raster.height || pj >= raster.width) {
    //         //     continue
    //         // }

    //         // let pixelIndex = pi*raster.width*4+pj+offset
    //         // let pixelIndex = pj*raster.height*4+pi+offset
    //         // console.log(pi, pj, pixelIndex, imageData.data.length, imageData.data[pixelIndex])
    //         let color = raster.getPixel(point)

    //         // let color = imageData.data[pixelIndex];

    //         if(color[colorName] > parameters.thresholds[colorName] && path.segments.length == 0) {
    //             path.add(point)
    //         } else if(color[colorName] < parameters.thresholds[colorName] && path.segments.length == 1) {
    //             path.add(point)
    //             path = createPath(colorName);
    //         }

    //         // if(color > threshold && path.segments.length == 0) {
    //         //     path.add(point)
    //         // } else if(color < threshold && path.segments.length == 1) {
    //         //     path.add(point)
    //         //     path = createPath(colorName);
    //         // }
    //     }
    // }

    // lines.remove()
}

function draw() {
	// if(generatingText != null) {
	// 	generatingText.visible = false
	// }

	// compoundPath.removeChildren();

    drawing.removeChildren();

    if(parameters.optimizeWithRaster && projectRaster != null) {
        paper.project.clear()
        projectRaster = paper.project.activeLayer.rasterize()
        paper.project.activeLayer.addChild(projectRaster)
    }

    for(let colorName in paths) {
        paths[colorName] = []
    }

    currentColorIndex = 0;
    drawLines();

}

function rasterLoaded() {
    raster.fitBounds(paper.view.bounds)
    shaders.updateTexture(raster)
    setTimeout(()=>shaders.updateUniforms(parameters), 100)
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
		};
		image.src = event.target.result;
	};
	reader.readAsDataURL(file);
}

document.addEventListener('drop', onDocumentDrop, false);
document.addEventListener('dragover', onDocumentDrag, false);
document.addEventListener('dragleave', onDocumentDrag, false);

function updateColor() {
    parameters.colorArray = getColorArray()
    updateColorArrays()
    updateUniforms()
}

updateColor()

var gui = new dat.GUI();

gui.add(parameters, 'renderMode', ['Preview', 'Image', 'Thresholds', 'SVG']).onChange( (value)=> { 
    if(value == 'SVG') {
        showSVG()
        return
    }
    showPreview()
    updateUniforms() 
} );
gui.add(parameters, 'showColors').name('Show colors').onChange( ()=> updateUniforms() );

let preprocessingFolder = gui.addFolder('Preprocessing');

preprocessingFolder.add(parameters.preprocessing, 'hue', 0, 1, 0.01).onChange( ()=> updateUniforms() );
preprocessingFolder.add(parameters.preprocessing, 'saturation', -1, 1, 0.01).onChange( ()=> updateUniforms() );
preprocessingFolder.add(parameters.preprocessing, 'lightness', -1, 1, 0.01).onChange( ()=> updateUniforms() );

let colorFolder = gui.addFolder('Colors');

colorFolder.addColor(parameters.colors, 'color1').name('Color 1').onChange( ()=> updateColor() );
colorFolder.addColor(parameters.colors, 'color2').name('Color 2').onChange( ()=> updateColor() );
colorFolder.addColor(parameters.colors, 'color3').name('Color 3').onChange( ()=> updateColor() );
// colorFolder.addColor(parameters.colors, 'backgroundColor').name('Background color').onChange( ()=> updateColor() );
colorFolder.add(parameters, 'useBlack').name('Use Black').onChange( ()=> updateUniforms() );

gui.add(parameters, 'nLines', 1, 500, 1).onChange( ()=> updateUniforms() );
gui.add(parameters, 'lineWidth', 1, 20, 1).onChange( ()=> updateUniforms() );
gui.add(parameters, 'minLineLength', 0, 100, 1);
gui.add(parameters, 'minHoleLength', 0, 100, 1);

gui.add(parameters, 'mixWeight', 0.0, 3.0, 0.01).onChange( ()=> updateUniforms() );



let angleFolder = gui.addFolder('Angles');

angleFolder.add(parameters.angles, 'red', 0, 360, 1).name('red angle').onChange( ()=> updateUniforms() );
angleFolder.add(parameters.angles, 'green', 0, 360, 1).name('green angle').onChange( ()=> updateUniforms() );
angleFolder.add(parameters.angles, 'blue', 0, 360, 1).name('blue angle').onChange( ()=> updateUniforms() );
// angleFolder.add(parameters.angles, 'black', 0, 360, 1).name('black angle').onChange( ()=> updateUniforms() );

// gui.add(parameters.thresholds, 'red', 0, 1, 0.01).name('red threshold').onChange( ()=> updateUniforms() );
// gui.add(parameters.thresholds, 'green', 0, 1, 0.01).name('green threshold').onChange( ()=> updateUniforms() );
// gui.add(parameters.thresholds, 'blue', 0, 1, 0.01).name('blue threshold').onChange( ()=> updateUniforms() );

// gui.add(parameters.invert, 'red').name('invert red').onChange( ()=> updateUniforms() );
// gui.add(parameters.invert, 'green').name('invert green').onChange( ()=> updateUniforms() );
// gui.add(parameters.invert, 'blue').name('invert blue').onChange( ()=> updateUniforms() );
// gui.add(parameters, 'optimizeWithRaster');
createSVGButton = gui.add(parameters, 'createSVG').name('Create SVG');

gui.add(parameters, 'exportLayersSeparately').name('Export separately');
gui.add(parameters, 'exportSVG').name('Export SVG');

// let rectangle = new paper.Path.Rectangle(paper.view.bounds.expand(-40))
// rectangle.fillColor = 'red'


window.shaders = shaders

let projectRaster = null

let paths = { red:[], green: [], blue: [], black: [] }

function getPointOnRaster(point) {
    let halfSize = raster.size.multiply(0.5)
    return raster.viewMatrix.inverseTransform(point).add(halfSize)
}

function isBlack(color) {
    return color.red < 0.01 && color.green < 0.01 && color.blue < 0.01
}

let indexToColorName = ['red', 'green', 'blue', 'black']


function animate() {
    requestAnimationFrame( animate )
    
    if(raster.visible) {
        shaders.render()
        return
    }
    if(currentLine == null) {
        return
    }

    if(parameters.optimizeWithRaster && projectRaster != null) {
        paper.project.clear()
        paper.project.activeLayer.addChild(projectRaster)
    }

    let path = createPath(currentColorIndex);
    let blackPath = createPath(currentColorIndex);
    blackPath.data.black = true
    blackPath.strokeColor = 'black'

    let length = currentLine.length
    let previousPath = null
    let previousBlackPath = null

    for(let i=0 ; i<length ; i++) {

        let point = currentLine.getPointAt(i);
        
        if(!raster.bounds.contains(point)) {
            
            let mustBreak = path.segments.length == 1

            if(path.segments.length == 1) {
                path.add(point)
                if(path.length < parameters.minLineLength) {
                    path.remove()
                } else {
                    paths[indexToColorName[currentColorIndex]].push(path)
                }
            }

            if(blackPath.segments.length == 1) {
                blackPath.add(point)
                if(blackPath.length < parameters.minLineLength) {
                    blackPath.remove()
                } else {
                    paths['black'].push(blackPath)
                }
            }

            if(mustBreak) {
                break
            }

            continue
        }

        let color = raster.getPixel(getPointOnRaster(point))

        let mc = mustColor(color, currentColorIndex)


        // black path

        if(blackPath.segments.length == 1 && mc != -1) {
            blackPath.add(point)
            if(blackPath.length < parameters.minLineLength) {
                blackPath.remove()
            } else {
                paths['black'].push(blackPath)
                // if(path.segments.length == 1) {
                //     path.add(blackPath.firstSegment.point)

                //     if(path.length < parameters.minLineLength) {
                //         path.remove()
                //     } else {
                //         paths[indexToColorName[currentColorIndex]].push(path)
                //         previousPath = path
                //     }
                //     path = createPath(currentColorIndex);
                // }
                previousBlackPath = blackPath
            }
            blackPath = createPath(currentColorIndex);
            blackPath.data.black = true
            blackPath.strokeColor = 'black'
        } else if(blackPath.segments.length == 0 && mc == -1) {

            if(previousBlackPath && previousBlackPath.segments.length == 2 && previousBlackPath.lastSegment.point.getDistance(point) < parameters.minHoleLength) {
                blackPath.remove()
                previousBlackPath.lastSegment.remove()
                blackPath = previousBlackPath
            } else {
                blackPath.add(point)
            }
        }

        // normal path

        // if(path.segments.length == 1 && mc == 0) {
        //     path.add(point)
        //     if(path.length < parameters.minLineLength) {
        //         path.remove()
        //     } else {
        //         paths[indexToColorName[currentColorIndex]].push(path)
        //         previousPath = path
        //     }
        //     path = createPath(currentColorIndex);
        // } else if(path.segments.length == 0 && mc != 0) {

        //     if(previousPath && previousPath.segments.length == 2 && previousPath.lastSegment.point.getDistance(point) < parameters.minHoleLength) {
        //         path.remove()
        //         previousPath.lastSegment.remove()
        //         path = previousPath
        //     } else {
        //         path.add(point)
        //     }
        // }

        if(path.segments.length == 1 && mc != 1) {
            path.add(point)
            if(path.length < parameters.minLineLength) {
                path.remove()
            } else {
                paths[indexToColorName[currentColorIndex]].push(path)
                previousPath = path
            }
            path = createPath(currentColorIndex);
        } else if(path.segments.length == 0 && mc == 1) {

            if(previousPath && previousPath.segments.length == 2 && previousPath.lastSegment.point.getDistance(point) < parameters.minHoleLength) {
                path.remove()
                previousPath.lastSegment.remove()
                path = previousPath
            } else {
                path.add(point)
            }
        }
    }

    if(path.segments.length == 1) {
        path.add(point)
    }
    if(blackPath.segments.length == 1) {
        blackPath.add(point)
    }

    currentLine = currentLine.nextSibling
    currentPixelOnLine = 0

    // while(path.segments.length < 2 && currentLine != null) {

    //     let point = currentLine.getPointAt(currentPixelOnLine);
    //     animator.position = point;

    //     currentPixelOnLine++;
        
    //     if(currentPixelOnLine > currentLine.length) {
    //         if(path.segments.length == 1) {
    //             path.add(currentLine.lastSegment.point)
    //         }
    //         currentLine = currentLine.nextSibling
    //         currentPixelOnLine = 0
    //         break
    //     }

    //     if(!rasterRectangle.contains(point)) {
    //         continue
    //     }

    //     let color = raster.getPixel(point)

    //     let mc = mustColor(chroma(color.components, 'gl'), currentColorIndex)

    //     // if(path.strokeColor.red == 0 && path.strokeColor.green == 0 && path.strokeColor.blue == 0 && mc > -0.5) {
    //     //     path.add(point)
    //     // } else {

    //     //     if(mc == 0 && path.segments.length == 1) {
    //     //         path.add(point)
    //     //     } else if(mc == 1 && path.segments.length == 0) {
    //     //         path.add(point)
    //     //     } else if(mc == -1 && path.segments.length == 0) {
    //     //         path.add(point)
    //     //         path.strokeColor = 'black'
    //     //     }
    //     // }

    //     if(mc == 0 && path.segments.length == 1) {
    //         // console.log('add 2nd: ', point)
    //         path.add(point)
    //     } else if(mc == 1 && path.segments.length == 0) {
    //         // console.log('add 1st: ', point)
    //         path.add(point)
    //     }

    //     // if(color[currentColor] > parameters.thresholds[currentColor] && path.segments.length == 0) {
    //     //     path.add(point)
    //     // } else if(color[currentColor] < parameters.thresholds[currentColor] && path.segments.length == 1) {
    //     //     path.add(point)
    //     // }

    //     if(currentPixelOnLine > currentLine.length) {
    //         if(path.segments.length == 1) {
    //             path.add(currentLine.lastSegment.point)
    //         }
    //         currentLine = currentLine.nextSibling
    //         currentPixelOnLine = 0
    //     }
    // }

    if(currentLine == null) {
        currentColorIndex++
        if(currentColorIndex < 3) {
            drawLines()
        }
    }

    if(parameters.optimizeWithRaster) {
        projectRaster = paper.project.activeLayer.rasterize()
    }
}

window.projectRaster = projectRaster


window.addEventListener( 'resize', ()=> {

    background.remove()
    background = new paper.Path.Rectangle(paper.view.bounds)
    background.fillColor = 'white'
    background.sendToBack()
}, false );



$(document).ready(()=> {
    shaders.initialize(paper.view.element, parameters)
    raster = new paper.Raster('bike.jpg');
    raster.on('load', rasterLoaded);
    animate()
    setTimeout(()=>{
        shaders.updateTexture(raster)
        updateUniforms()}, 1000)
})