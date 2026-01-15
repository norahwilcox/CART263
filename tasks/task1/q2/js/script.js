"use strict";
    
function setup() {
    console.log("go")
    createCanvas(400, 400);

    drawEllipse(39, 60, 30, 30, 90, 150, 159);
    drawEllipse(300, 200, 70, 70, 30, 190, 200);
    drawEllipse(200, 150, 60, 60, 70, 200, 100);

}

function draw() {
}

function drawEllipse(x, y, w, h, r, g, b) { 
    push();
    noStroke();
    fill(r, g, b);
    ellipse(x, y, w, h);
    pop();
}