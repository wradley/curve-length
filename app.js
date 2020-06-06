
// let elP1 = document.getElementById("pt1");
let elP2 = document.getElementById("pt2");
let elP3 = document.getElementById("pt3");
let pt2Moving = false;
let pt3Moving = false;
elP2.onmousedown = () => { pt2Moving = true; }
elP3.onmousedown = () => { pt3Moving = true; }
window.onmouseup = () => { pt2Moving = false; pt3Moving = false; }
let lenOut = document.getElementById("length-output");
// let elP4 = document.getElementById("pt4");

let smallestDimension = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;
let maxPixelWidth = smallestDimension * 0.75;
let maxPixelHeight = smallestDimension * 0.75;
let pixelWidth = 1000;
let pixelHeight = 1000;
let width = 22.0;
let height = 22.0;
document.getElementById("width-input").value = width;
document.getElementById("height-input").value = height;
document.getElementById("width-input").onchange = calculateCanvasDimensions;
document.getElementById("height-input").onchange = calculateCanvasDimensions;

let toPixels = 0;
let p2 = {x: 0, y: 0};
let p3 = {x: 0, y: 0};

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
canvas.onmousemove = function(e) {
    if (pt2Moving) {
        p2.x = e.offsetX / toPixels;
        p2.y = e.offsetY / toPixels;
        draw();
    }
    if (pt3Moving) {
        p3.x = e.offsetX / toPixels;
        p3.y = e.offsetY / toPixels;
        draw();
    }
}

calculateCanvasDimensions();

function calculateCanvasDimensions() {
    width = document.getElementById("width-input").value;
    height = document.getElementById("height-input").value;
    //console.log('w, h: ' + width + ', ' + height);

    if (width / height > 1) {
        pixelWidth = maxPixelWidth;
        pixelHeight = height / width * pixelWidth;
    }
    else {
        pixelHeight = maxPixelHeight;
        pixelWidth = width / height * pixelHeight;
    }

    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
    canvas.style.width = pixelWidth + 'px';
    canvas.style.height = pixelHeight + 'px';

    p2 = {x: 0, y: height/2};
    p3 = {x: width, y: height/2};
    
    draw();
}


function draw() {
    ctx.lineWidth = 3;
    //ctx.scale(pixelWidth, pixelHeight);
    ctx.clearRect(0, 0, pixelWidth, pixelHeight);
    ctx.beginPath();
    toPixels = canvas.clientHeight / height;

    let p1 = {x: 0, y: 0}
    //p2 = {x: 0, y: height/2};
    //p3 = {x: width, y: height/2};
    //console.log(p2);
    let p4 = {x: width, y: height};

    let curve = new Bezier(
        p1,
        p2,
        p3,
        p4
    );

    let coords = curve.getLUT();

    // for (let i = 0; i < coords.length; ++i) {
    //     let x = coords[i].x * toPixels;
    //     let y = coords[i].y * toPixels;
    //     ctx.beginPath();
    //     ctx.arc(x, y, 3, 0, 2 * Math.PI);
    //     ctx.stroke();
    // }
    //console.log(curve.length());
    lenOut.innerText = curve.length().toFixed(4);

    ctx.moveTo(p1.x * toPixels, p1.y * toPixels);
    ctx.bezierCurveTo(p2.x * toPixels, p2.y * toPixels, p3.x * toPixels, p3.y * toPixels, p4.x * toPixels, p4.y * toPixels);
    ctx.stroke();

    //ctx.setLineDash([5, 15]);
    ctx.lineWidth = 1;
    ctx.moveTo(p1.x * toPixels, p1.y * toPixels);
    ctx.lineTo(p2.x * toPixels, p2.y * toPixels);
    ctx.stroke();

    ctx.moveTo(p3.x * toPixels, p3.y * toPixels);
    ctx.lineTo(p4.x * toPixels, p4.y * toPixels);
    ctx.stroke();

    elP2.style.left = p2.x * toPixels + canvas.offsetLeft - 5 + 'px';
    elP2.style.top  = p2.y * toPixels + canvas.offsetTop - 5 + 'px';
    elP3.style.left = p3.x * toPixels + canvas.offsetLeft - 5 + 'px';
    elP3.style.top  = p3.y * toPixels + canvas.offsetTop - 5 + 'px';
}