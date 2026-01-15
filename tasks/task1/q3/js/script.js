"use strict";

let rect1 = {
    x: 39,
    y: 60,
    s: 30,
    r: 30, 
    g: 190,
    b: 200
}

let rect2 = {
    x: 300,
    y: 200,
    s: 70,
    r: 30, 
    g: 190,
    b: 200
}
    
let rect3 = {
    x: 200,
    y: 150,
    ySpeed: 1,
    s: 60,
    r: 70, 
    g: 200,
    b: 100
}   
    
function setup() {
    console.log("go");
    createCanvas(400, 400);
 
}

function draw() {
    background(0);
    drawRect1();
    drawRect2();
    drawRect3();

       if (mouseIsPressed) {
        rect1.x = rect1.x + 10;
       }
    if (keyIsPressed) {
        if (keyCode === 32)
            rect2.x = rect2.x - 10;
    }

    rect3.y += rect3.ySpeed

    if (rect3.y === 400) {
        rect3.y = 0;
    }
}

function drawRect1() { 
    push();
    noStroke();
    fill(rect1.r, rect1.g, rect1.b);
    rect(rect1.x, rect1.y, rect1.s);
    pop();
}

function drawRect2() { 
    push();
    noStroke();
    fill(rect2.r, rect2.g, rect2.b);
    rect(rect2.x, rect2.y, rect2.s);
    pop();
}

function drawRect3() { 
    push();
    noStroke();
    fill(rect3.r, rect3.g, rect3.b);
    rect(rect3.x, rect3.y, rect3.s);
    pop();
}
