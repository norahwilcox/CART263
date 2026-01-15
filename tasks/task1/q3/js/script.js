"use strict";

let circle = {
    x: 200,
    y: 200,
    size: 70,
    fill: 200,
}
    
function setup() {
    console.log("go")
    createCanvas(400, 400);
}

function draw() {
    background(0);

    drawRect1
}

function drawRect1() { 
    push();
    noStroke();
    fill(90, 150, 159);
    rect(39, 60, 30);
    pop();
}

function drawRect2() { 
    push();
    noStroke();
    fill(30, 190, 200);
    rect(300, 200, 70);
    pop();
}

function drawRect3() { 
    push();
    noStroke();
    fill(70, 200, 100);
    rect(39, 60, 60);
    pop();
}

function moveRect() {
    if (mousePressed) {
    
}
}

function mousePressed() {
    
}