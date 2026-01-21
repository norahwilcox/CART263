"use strict";

let shapeSize = 40; 
let gap = 2;        
let isCircle = true;

let shapeColor;

let spacing;

function setup() {
  createCanvas(500, 500);

  spacing = shapeSize + gap;

  generateRandomColor();
}

function draw() {
  background(0);
  noStroke();
  fill(shapeColor);
  
  rectMode(CENTER);

  for (let x = spacing / 2; x < width; x += spacing) {
    for (let y = spacing / 2; y < height; y += spacing) {

      if (isCircle) {
        ellipse(x, y, shapeSize);
      } else {
        rect(x, y, shapeSize);
      }
    }
  }
}

function generateRandomColor() {
  shapeColor = color(random(255), random(255), random(255));
}

function keyPressed() {
  if (keyCode === 32) {
    generateRandomColor();
  }
}

function mousePressed() {
  isCircle = !isCircle;
}
