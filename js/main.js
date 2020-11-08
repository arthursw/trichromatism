import * as shaders from './shadersThree.js';
import { shader } from './shaders/trichromatismThree.js';
// import * as shaders from './shadersBabylon.js';

var canvas = document.getElementById('paper-canvas');
paper.setup(canvas);

let noSVGText = new paper.PointText(paper.view.bounds.center)
noSVGText.justification = 'center'
noSVGText.fillColor = 'black'
noSVGText.content = 'Click "Create SVG" to generate the vector drawing'
noSVGText.visible = false

let raster = null
let drawing = new paper.Group()

let shaderCanvasRaster = new paper.Raster()
let SVGcreated = false
let creatingSVG = false

let createSVGButton = null
let exportSVGButton = null

let parameters = {}

function exportSVG() {

    if(!SVGcreated) {
        alert('The SVG is not generated. Click "Create SVG" to create the vector drawing.')
        return
    }
    let bounds = new paper.Rectangle(0, 0, parameters.exportWidth, parameters.exportHeight)

    let background = new paper.Path.Rectangle(shaderCanvasRaster.bounds)
    
    background.fillColor = new paper.Color(parameters.colors.backgroundColor).toCSS()

    let group = new paper.Group()
    
    group.addChild(background.clone())

    for(let colorName in paths) {
        let colorGroup = new paper.Group()
        for(let path of paths[colorName]) {
            colorGroup.addChild(path.clone())
        }
        group.addChild(colorGroup)
    }

    group.fitBounds(bounds)
    

    group.remove()

    background.remove()

    var container = document.createElement('div');

    var params = { width: parameters.exportWidth, height: parameters.exportHeight };
    var two = new Two(params).appendTo(container);

    let blobs = []
    let i = 1
    for(let colorGroup of group.children) {
        
        if(parameters.exportLayersSeparately || colorGroup == group.firstChild) {
            var rect = two.makeRectangle(parameters.exportWidth/2, parameters.exportHeight/2, parameters.exportWidth, parameters.exportHeight);
            rect.fill = new paper.Color(parameters.colors.backgroundColor).toCSS()
            rect.noStroke();
        }
        if(colorGroup == group.firstChild) {
            continue
        }

        let lines = []
        let strokeColor = null
        for(let p of colorGroup.children) {
            let p1 = p.firstSegment.point
            let p2 = p.lastSegment.point
            let line = two.makeLine(p1.x, p1.y, p2.x, p2.y)
            line.linewidth = p.strokeWidth
            strokeColor = p.strokeColor.toCSS()
            line.stroke = strokeColor
            lines.push(line)
        }
        let twoGroup = two.makeGroup(lines)
        twoGroup.strokeColor = strokeColor
        twoGroup.id = 'color-' + i

        if(parameters.exportLayersSeparately || colorGroup == group.lastChild) {
            two.update()

            container.firstElementChild.setAttribute('xmlns', "http://www.w3.org/2000/svg")

            var svgString = container.innerHTML
            let oc = parameters.colors[i < 4 ? 'color'+i : 'backgroundColor']
            let colorCSS = new paper.Color([oc[0]/255, oc[1]/255, oc[2]/255])
            $(container).find('#color-'+i).attr('data-paper-data', colorCSS.toCSS())

            let blob = new Blob([svgString], {type: 'image/svg+xml'})
            blobs.push(blob)
            two.clear()
        }
        i++
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
}

function loadDefaultParameters() {
    parameters = {
        nLines: 195,
        lineWidth: 3,
        // lineAA: 0.01,
        minLineLength: 5,
        minHoleLength: 3,
        optimizeWithRaster: true,
        preprocessing: {
            hue: 0,
            saturation: 0,
            lightness: 0,
        },
        colors: {
            color1: [16,171,255], // Cyan
            color2: [215,0,139],  // Magenta
            color3: [255,210,0],  // Yellow
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
        exportHeight: 650
    }
    return parameters
}
loadDefaultParameters()

window.parameters = parameters;

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

function fract(f) {
    return f-Math.floor(f);
}

function mix(x, y, a) {
    a = clamp(a, 0, 1);
    return (1.0-a) * x + a * y;
}

function clamp(value, min, max) {
    return Math.max(Math.min(value, max), min);
}

function step(edge, value) {
    return value < edge ? 0.0 : 1.0;
}

// vec3 hsv2rgb(vec3 c) {
//     vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
//     vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
//     return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
// }

// c: [hue, saturation, value]
function hsv2rgb(c) {
    let K = [1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0];
    let px = Math.abs(fract(c[0] + K[0]) * 6.0 - K[3]);
    let py = Math.abs(fract(c[0] + K[1]) * 6.0 - K[3]);
    let pz = Math.abs(fract(c[0] + K[2]) * 6.0 - K[3]);
    let rx = c[2] * mix(K[0], clamp(px - K[0], 0.0, 1.0), c[1]);
    let ry = c[2] * mix(K[0], clamp(py - K[0], 0.0, 1.0), c[1]);
    let rz = c[2] * mix(K[0], clamp(pz - K[0], 0.0, 1.0), c[1]);
    return [rx, ry, rz];
}

// vec3 rgb2hsv(vec3 c) {
//     vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
//     vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
//     vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

//     float d = q.x - min(q.w, q.y);
//     float e = 1.0e-10;
//     return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
// }

// c: [red, green, blue]
function rgb2hsv(c) {
    let K = [0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0];
    let px = mix(c[2], c[1], step(c[2], c[1]));
    let py = mix(c[1], c[2], step(c[2], c[1]));
    let pz = mix(K[3], K[0], step(c[2], c[1]));
    let pw = mix(K[2], K[1], step(c[2], c[1]));

    let qx = mix(px, c[0], step(px, c[0]));
    let qy = mix(py, py, step(px, c[0]));
    let qz = mix(pw, pz, step(px, c[0]));
    let qw = mix(c[0], px, step(px, c[0]));

    let d = qx - Math.min(qw, qy);
    let e = 1.0e-10;

    let rx = Math.abs(qz + (qw - qy) / (6.0 + d + e));
    let ry = d / (qx + e);
    let rz = qx;
    return [rx, ry, rz];
}

function preprocess(cPaper) {
    let chsv = rgb2hsv(cPaper.components);
    chsv[0] = ( chsv[0] + parameters.preprocessing.hue ) % 1.0;
    chsv[1] += parameters.preprocessing.saturation;
    chsv[2] += parameters.preprocessing.lightness;
    let nc = hsv2rgb(chsv);
    return new paper.Color(nc[0], nc[1], nc[2]);
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
    
    if(!SVGcreated && noSVGText != null) {
        paper.project.activeLayer.addChild(noSVGText)
        noSVGText.visible = true
    }
    
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

function showPreview(callback) {
    raster.visible = true

    paper.project.activeLayer.removeChildren()
    paper.project.activeLayer.addChild(background)
    paper.project.activeLayer.addChild(raster)

    if(projectRaster) {
        projectRaster.visible = false
    }

    setTimeout(()=>{
        shaders.updateUniforms(parameters)
        if(callback != null) {
            callback()
        }
    }, 100)
    // createSVGButton.name('Create SVG')

    $('#shader-canvas').show()
    $('#paper-canvas').hide()
}


function stopSVG() {
    currentLine = null
    currentColorIndex = 0
    createSVGButton.name('Create SVG')
    $(progressionInput.domElement.parentElement.parentElement).hide()
    creatingSVG = false
}

function createSVG() {
    if(creatingSVG) {
        stopSVG()
        return
    }
    creatingSVG = true

    createSVGButton.name('Stop generating SVG')

    parameters.renderMode = 'Image'
    showPreview(()=> {

        let currentShowColors = parameters.showColors
        parameters.showColors = false
        updateUniforms()
        shaders.render()
        parameters.showColors = currentShowColors
    
        let shaderCanvasURL = document.getElementById('shader-canvas').toDataURL()
        let entireShaderCanvasRaster = new paper.Raster(shaderCanvasURL, paper.view.bounds.center)
        entireShaderCanvasRaster.onLoad = ()=> {
            let r = new paper.Rectangle(paper.view.viewToProject(raster.bounds.topLeft), paper.view.viewToProject(raster.bounds.bottomRight))
            let imageData = entireShaderCanvasRaster.getImageData(r)
            shaderCanvasRaster = new paper.Raster({ size: r.size, center: paper.view.bounds.center })
            shaderCanvasRaster.setImageData(imageData, new paper.Point(0, 0))
            
            shaderCanvasRaster.bounds.center = paper.view.bounds.center
            window.shaderCanvasRaster = shaderCanvasRaster
    
            entireShaderCanvasRaster.remove()
    
            SVGcreated = true
            if(noSVGText != null) {
                noSVGText.remove()
                noSVGText = null
            }
    
            showSVG()
            draw()
    
            $(exportSVGButton.domElement.parentElement.parentElement).show()
    
            // shaderCanvasRaster.scale(0.8)
    
            // $('#shader-canvas').hide()
            // $('#paper-canvas').show()
        }
        
    })
}

function vector3FromArray(a) {
    return new THREE.Vector3().fromArray(a);
}

function vector3FromColor(c) {
    return vector3FromArray(c.gl != null ? c.gl() : c._rgb ? c._rgb : c);
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
            // let index = getClosestColorIndex(preprocess(color))
            // newRaster.setPixel(j, i, parameters.paperColorArray[index])
            newRaster.setPixel(j, i, color)
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
        paperColorArray.push(new paper.Color(c.gl ? c.gl() : c._rgb ? c._rgb : c))
    }

    parameters.colorVectorArray = colorVectorArray
    parameters.paperColorArray = paperColorArray
}

function createPath(currentColorIndex, pathGroup) {
    let path = new paper.Path();
    path.strokeWidth = parameters.lineWidth;
    path.strokeColor = currentColorIndex < 3 ? parameters.paperColorArray[currentColorIndex] : 'black';
    path.blendMode = 'multiply'
    path.data.black = false
    pathGroup.addChild(path);
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
    // let pixelColorPreprocessed = preprocess(pixelColor)
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

    let rasterBounds = new paper.Path.Rectangle(raster.bounds)
    let crossings = lines.getCrossings(rasterBounds)
    let lineToCrossings = new Map()

    for(let crossing of crossings) {
        let ltc = lineToCrossings.get(crossing.path)
        if(ltc != null) {
            ltc.push(crossing)
        } else {
            lineToCrossings.set(crossing.path, [crossing])
        }
    }
    let cuttedLines = new paper.CompoundPath()
    for(let [line, crossings] of lineToCrossings) {
        if(crossings.length != 2) {
            console.error(line, 'line has ', crossings.length ,' crossings!')
            continue
        }
        let line = new paper.Path()
        line.add(crossings[0].point)
        line.add(crossings[1].point)
        cuttedLines.addChild(line)
    }
    lines.remove()
    lines = cuttedLines

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

function loadImage(dataURL) {
    raster.remove()
    var image = document.createElement('img');
    image.onload = function () {
        raster = new paper.Raster(image);
        raster.onLoad = rasterLoaded
    };
    image.src = dataURL;
}

function onDocumentDrop(event) {
	event.preventDefault();

	var file = event.dataTransfer.files[0];
	var reader = new FileReader();

	reader.onload = (event)=> loadImage(event.target.result)
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

let updateRenderMode = (value = parameters.renderMode)=> {
    if(value == 'SVG') {
        showSVG()
        return
    }
    showPreview()
    updateUniforms() 
}


let gui = null


function createGUI() {
    if(gui != null) {
        gui.destroy()
    }
    gui = new dat.GUI()
    window.gui = gui

    let divJ = $("<input data-name='file-selector' type='file' class='form-control' name='file'  accept='image/*' />")


    let loadImageButton = gui.add({loadImage: ()=>divJ.click()}, 'loadImage').name('Load image');

    divJ.insertAfter(loadImageButton.domElement.parentElement.parentElement)
    divJ.hide()
    divJ.change((event)=> {

        let files = event.dataTransfer != null ? event.dataTransfer.files : event.target.files

        for (let i = 0 ; i < files.length ; i++) {
            let file = files[i] != null ? files[i] : files.item(i)
            
            let imageType = /^image\//

            if (!imageType.test(file.type)) {
                continue
            }

            let reader = new FileReader()
            reader.onload = (event) => loadImage(reader.result)
            reader.readAsDataURL(file)

            break
        }
        
        divJ.val('')
    })


    gui.add(parameters, 'renderMode', ['Preview', 'Image', 'Thresholds', 'SVG']).onChange(updateRenderMode);
    gui.add(parameters, 'showColors').name('Show colors').onChange( ()=> updateUniforms() ).onFinishChange(()=> save(false));

    let preprocessingFolder = gui.addFolder('Preprocessing');

    preprocessingFolder.add(parameters.preprocessing, 'hue', 0, 1, 0.01).onChange( ()=> updateUniforms() ).onFinishChange(()=> save(false));
    preprocessingFolder.add(parameters.preprocessing, 'saturation', -1, 1, 0.01).onChange( ()=> updateUniforms() ).onFinishChange(()=> save(false));
    preprocessingFolder.add(parameters.preprocessing, 'lightness', -1, 1, 0.01).onChange( ()=> updateUniforms() ).onFinishChange(()=> save(false));

    let colorFolder = gui.addFolder('Colors');

    colorFolder.addColor(parameters.colors, 'color1').name('Color 1').onChange( ()=> updateColor() ).onFinishChange(()=> save(false));
    colorFolder.addColor(parameters.colors, 'color2').name('Color 2').onChange( ()=> updateColor() ).onFinishChange(()=> save(false));
    colorFolder.addColor(parameters.colors, 'color3').name('Color 3').onChange( ()=> updateColor() ).onFinishChange(()=> save(false));
    // colorFolder.addColor(parameters.colors, 'backgroundColor').name('Background color').onChange( ()=> updateColor() );
    colorFolder.add(parameters, 'useBlack').name('Use Black').onChange( ()=> updateUniforms() ).onFinishChange(()=> save(false));

    gui.add(parameters, 'nLines', 1, 1500, 1).onChange( ()=> updateUniforms() ).onFinishChange(()=> save(false));
    gui.add(parameters, 'lineWidth', 0.1, 20, 0.1).onChange( ()=> updateUniforms() ).onFinishChange(()=> save(false));
    // gui.add(parameters, 'lineAA').onChange( ()=> updateUniforms() ).onFinishChange(()=> save(false));
    gui.add(parameters, 'minLineLength', 0, 100, 1).onFinishChange(()=> save(false));
    gui.add(parameters, 'minHoleLength', 0, 100, 1).onFinishChange(()=> save(false));

    gui.add(parameters, 'mixWeight', 0.0, 3.0, 0.01).onChange( ()=> updateUniforms() ).onFinishChange(()=> save(false));



    let angleFolder = gui.addFolder('Angles');

    angleFolder.add(parameters.angles, 'red', 0, 360, 1).name('red angle').onChange( ()=> updateUniforms() ).onFinishChange(()=> save(false));
    angleFolder.add(parameters.angles, 'green', 0, 360, 1).name('green angle').onChange( ()=> updateUniforms() ).onFinishChange(()=> save(false));
    angleFolder.add(parameters.angles, 'blue', 0, 360, 1).name('blue angle').onChange( ()=> updateUniforms() ).onFinishChange(()=> save(false));
    // angleFolder.add(parameters.angles, 'black', 0, 360, 1).name('black angle').onChange( ()=> updateUniforms() ).onFinishChange(()=> save(false));

    // gui.add(parameters.thresholds, 'red', 0, 1, 0.01).name('red threshold').onChange( ()=> updateUniforms() ).onFinishChange(()=> save(false));
    // gui.add(parameters.thresholds, 'green', 0, 1, 0.01).name('green threshold').onChange( ()=> updateUniforms() ).onFinishChange(()=> save(false));
    // gui.add(parameters.thresholds, 'blue', 0, 1, 0.01).name('blue threshold').onChange( ()=> updateUniforms() ).onFinishChange(()=> save(false));

    // gui.add(parameters.invert, 'red').name('invert red').onChange( ()=> updateUniforms() ).onFinishChange(()=> save(false));
    // gui.add(parameters.invert, 'green').name('invert green').onChange( ()=> updateUniforms() ).onFinishChange(()=> save(false));
    // gui.add(parameters.invert, 'blue').name('invert blue').onChange( ()=> updateUniforms() ).onFinishChange(()=> save(false));
    // gui.add(parameters, 'optimizeWithRaster').onFinishChange(()=> save(false));

    createSVGButton = gui.add(parameters, 'createSVG').name('Create SVG');
    let progressionObject = {progression: '--'}
    let progressionInput = gui.add(progressionObject, 'progression').name('Progression');
    progressionInput.listen()
    $(progressionInput.domElement.parentElement.parentElement).hide()

    window.createSVGButton = createSVGButton
    gui.add(parameters, 'exportLayersSeparately').name('Export separately').onFinishChange(()=> save(false));
    gui.add(parameters, 'exportWidth').name('Export width').onFinishChange(()=> save(false));
    gui.add(parameters, 'exportHeight').name('Export height').onFinishChange(()=> save(false));
    exportSVGButton = gui.add({exportSVG: exportSVG}, 'exportSVG').name('Export SVG');
    $(exportSVGButton.domElement.parentElement.parentElement).hide()

    // let rectangle = new paper.Path.Rectangle(paper.view.bounds.expand(-40))
    // rectangle.fillColor = 'red'
    
    divJ = $("<input data-name='file-selector' type='file' class='form-control' name='file'  accept='application/json' />")

    let parametersFolder = gui.addFolder('Save / load parameters')
    let loadParametersButton = parametersFolder.add({loadParameters: ()=> divJ.click()}, 'loadParameters').name('Load parameters')

    divJ.insertAfter(loadParametersButton.domElement.parentElement.parentElement)
    divJ.hide()
    divJ.change((event)=> {
        let files = event.dataTransfer != null ? event.dataTransfer.files : event.target.files
    
        for (let i = 0; i < files.length; i++) {
            let file = files.item(i)
            
            let reader = new FileReader()
            reader.onload = (event) => onJsonLoad(event)
            reader.readAsText(file)
        }        
        divJ.val('')
    })

    let loadDefaultParametersAndUpdateGUI = ()=> {
        loadDefaultParameters()
        updateColor()
        createGUI()
    }
    parametersFolder.add({loadDefaultParameters: loadDefaultParametersAndUpdateGUI}, 'loadDefaultParameters').name('Load default parameters')

    parametersFolder.add({saveParameters: save}, 'saveParameters').name('Save parameters');
}

window.shaders = shaders

let projectRaster = null

let paths = { red:[], green: [], blue: [], black: [] }

function getPointOnRaster(point, raster) {
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
    let pathGroup = new paper.Group()

    let path = createPath(currentColorIndex, pathGroup);
    // let blackPath = createPath(3, pathGroup);
    // blackPath.data.black = true

    let length = currentLine.length
    let previousPath = null
    // let previousBlackPath = null
    let point = null

    for(let i=0 ; i<length ; i++) {

        point = currentLine.getPointAt(i)

        if(!shaderCanvasRaster.bounds.contains(point)) {
            if(path.segments.length == 1) {
                path.add(point)
                if(path.length < parameters.minLineLength) {
                    path.remove()
                }
            }
            if(i > length / 2) {
                break
            }
        }

        let color = shaderCanvasRaster.getPixel(getPointOnRaster(point, shaderCanvasRaster))
        let mc = mustColor(color, currentColorIndex)

        if(path.segments.length == 1 && mc != 1) {
            path.add(point)
            if(path.length < parameters.minLineLength) {
                path.remove()
            } else {
                previousPath = path
            }
            path = createPath(currentColorIndex, pathGroup)
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

    // Same thing with black paths:

    // for(let i=0 ; i<length ; i++) {

    //     point = currentLine.getPointAt(i);
        
    //     if(!shaderCanvasRaster.bounds.contains(point)) {
            
    //         let mustBreak = path.segments.length == 1

    //         if(path.segments.length == 1) {
    //             path.add(point)
    //             if(path.length < parameters.minLineLength) {
    //                 path.remove()
    //             }
    //         }

    //         if(blackPath.segments.length == 1) {
    //             blackPath.add(point)
    //             if(blackPath.length < parameters.minLineLength) {
    //                 blackPath.remove()
    //             }
    //         }

    //         if(mustBreak) {
    //             break
    //         }

    //         continue
    //     }

    //     // let color = raster.getPixel(getPointOnRaster(point, raster))
    //     let color = shaderCanvasRaster.getPixel(getPointOnRaster(point, shaderCanvasRaster))

    //     let mc = mustColor(color, currentColorIndex)

    //     // black path

    //     if(blackPath.segments.length == 1 && mc != -1) {
    //         blackPath.add(point)
    //         if(blackPath.length < parameters.minLineLength) {
    //             blackPath.remove()
    //             blackPath.data.removed = true
    //         } else {
    //             // if(path.segments.length == 1) {
    //             //     path.add(blackPath.firstSegment.point)

    //             //     if(path.length < parameters.minLineLength) {
    //             //         path.remove()
    //             //     } else {
    //             //         paths[indexToColorName[currentColorIndex]].push(path)
    //             //         previousPath = path
    //             //     }
    //             //     path = createPath(currentColorIndex);
    //             // }
    //             previousBlackPath = blackPath
    //         }
    //         blackPath = createPath(currentColorIndex);
    //         blackPath.data.black = true
    //         blackPath.strokeColor = 'black'
    //     } else if(blackPath.segments.length == 0 && mc == -1) {

    //         if(previousBlackPath && previousBlackPath.segments.length == 2 && previousBlackPath.lastSegment.point.getDistance(point) < parameters.minHoleLength) {
    //             blackPath.remove()
    //             blackPath.data.removed = true
    //             previousBlackPath.lastSegment.remove()
    //             blackPath = previousBlackPath
    //         } else {
    //             blackPath.add(point)
    //         }
    //     }

    //     // normal path

    //     // if(path.segments.length == 1 && mc == 0) {
    //     //     path.add(point)
    //     //     if(path.length < parameters.minLineLength) {
    //     //         path.remove()
    //     //     } else {
    //     //         paths[indexToColorName[currentColorIndex]].push(path)
    //     //         previousPath = path
    //     //     }
    //     //     path = createPath(currentColorIndex);
    //     // } else if(path.segments.length == 0 && mc != 0) {

    //     //     if(previousPath && previousPath.segments.length == 2 && previousPath.lastSegment.point.getDistance(point) < parameters.minHoleLength) {
    //     //         path.remove()
    //     //         previousPath.lastSegment.remove()
    //     //         path = previousPath
    //     //     } else {
    //     //         path.add(point)
    //     //     }
    //     // }

    //     if(path.segments.length == 1 && mc != 1) {
    //         path.add(point)
    //         if(path.length < parameters.minLineLength) {
    //             path.remove()
    //         } else {
    //             previousPath = path
    //         }
    //         path = createPath(currentColorIndex);
    //     } else if(path.segments.length == 0 && mc == 1) {

    //         if(previousPath && previousPath.segments.length == 2 && previousPath.lastSegment.point.getDistance(point) < parameters.minHoleLength) {
    //             path.remove()
    //             previousPath.lastSegment.remove()
    //             path = previousPath
    //         } else {
    //             path.add(point)
    //         }
    //     }
    // }

    if(path.segments.length == 1) {
        path.add(point)
    }
    // if(blackPath.segments.length == 1) {
    //     blackPath.add(point)
    // }

    for(let p of pathGroup.children) {
        if(p.segments.length == 2) {
            paths[indexToColorName[currentColorIndex]].push(p)
        }
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
        } else {
            createSVGButton.name('Create SVG')
            creatingSVG = false
            $(progressionInput.domElement.parentElement.parentElement).hide()
        }
    } else {
        $(progressionInput.domElement.parentElement.parentElement).show()
        let nLines = currentLine.parent.children.length
        progressionObject.progression = 'color ' + (currentColorIndex + 1) + '/3, '
        progressionObject.progression += 'line ' + currentLine.index + '/' + nLines
    }

    if(parameters.optimizeWithRaster) {
        projectRaster = paper.project.activeLayer.rasterize()
        window.projectRaster = projectRaster
    }
}

window.paths = paths


window.addEventListener( 'resize', ()=> {
    shaders.resize()
    paper.view.viewSize = new paper.Size(window.innerWidth, window.innerHeight)
    for(let child of paper.project.activeLayer.children) {
        child.position = paper.view.center
    }
    rasterLoaded()
    setTimeout( () => {
        updateRenderMode()
    }, 200)
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








function save(saveFile=true) {
    let json = JSON.stringify(parameters, null, '\t')
    localStorage.setItem('parameters', json)
    if(saveFile) {
        var blob = new Blob([json], {type: "application/json"})
        saveAs(blob, "parameters.json")
    }
}

function copyObjectProperties(target, source) {
    if(source == null) {
        return
    }
    for(let property in target) {
        if(target[property] instanceof Array) {
            target[property] = source[property].slice()
        }
        else if(typeof(target[property]) === 'object') {
            copyObjectProperties(target[property], source[property])
        } else if (source[property] != null) {
            if(typeof target[property] == typeof source[property]) {
                target[property] = source[property]
            }
        }
    }
}

function copyObjectPropertiesFromJSON(target, jsonSource) {
    if(jsonSource == null) {
        return
    }
    copyObjectProperties(target, JSON.parse(jsonSource))
}

function onJsonLoad(event) {
    if(event.target != null && event.target.result != null) {
        copyObjectPropertiesFromJSON(parameters, event.target.result)
        updateColor()
        createGUI()
    }
}

function loadLocalStorage() {
    copyObjectPropertiesFromJSON(parameters, localStorage.getItem('parameters'))
    updateColor()
}

loadLocalStorage()
createGUI()