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

    push();
    noStroke();
    fill(circle.fill);
    ellipse(circle.x, circle.y, circle.size);
    pop();

    push();
    noStroke();
    fill(circle.fill - 80);
    ellipse(circle.x -80, circle.y -70, circle.size + 50);
    pop();

    push();
    noStroke();
    fill(circle.fill + 30);
    ellipse(circle.x + 30, circle.y + 80, circle.size - 20);
    pop();
}