"use strict";

let rect1 = {
    x: 0,
    y: 0,
    w: 133,
    h: 400,
    r: 154, 
    g: 214,
    b: 205
}

let rect2 = {
    x: 133,
    y: 0,
    w: 133,
    h: 400,
    r: 85, 
    g: 178,
    b: 194
}
    
let rect3 = {
    x: 266,
    y: 0,
    w: 133,
    h: 400,
    r: 80, 
    g: 100,
    b: 122
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

    if (mouseX > 0 && mouseX < 133) {
        rect1.r = 255;
        rect1.g = 255;
        rect1.b = 255;
    } else {
        rect1.r = 154;
        rect1.g = 214;
        rect1.b = 205;
    }

      if (mouseX > 133 && mouseX < 266) {
        rect2.r = 255;
        rect2.g = 255;
        rect2.b = 255;
    } else {
        rect2.r = 85;
        rect2.g = 178;
        rect2.b = 194;
      }
    
    if (mouseX > 266 && mouseX < 400) {
        rect3.r = 255;
        rect3.g = 255;
        rect3.b = 255;
    } else {
        rect3.r = 80;
        rect3.g = 100;
        rect3.b = 122;
    }
  }


function drawRect1() { 
    push();
    noStroke();
    fill(rect1.r, rect1.g, rect1.b);
    rect(rect1.x, rect1.y, rect1.w, rect1.h);
    pop();
}

function drawRect2() { 
    push();
    noStroke();
    fill(rect2.r, rect2.g, rect2.b);
    rect(rect2.x, rect2.y, rect2.w, rect2.h);
    pop();
}

function drawRect3() { 
    push();
    noStroke();
    fill(rect3.r, rect3.g, rect3.b);
    rect(rect3.x, rect3.y, rect3.w, rect3.h);
    pop();
}

