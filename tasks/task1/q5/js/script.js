"use strict";

let counter = 0;

let radius = 20;
let ellipseAlpha = 20;

let square = {
  x: 50,
  y: 50,
  w: 50,
  h: 50,
  color: [255, 165, 0] 
};

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);

  displaySquare();

  if (counter >= 1 && counter <= 10) {

    let i = 0;
    let currentRadius = radius;
    let currentAlpha = ellipseAlpha;

    while (i < counter) {
      fill(255, currentAlpha);
      noStroke();
      ellipse(width / 2, height / 2, currentRadius * 2);

      currentRadius += 15;
      currentAlpha += 15;

      i++;
    }
  }
}

function displaySquare() {
  let isHovering = checkCollisionWithSquare();

  if (isHovering) {
    fill(255, 200, 100); 
  } else {
    fill(square.color);
  }

  noStroke();
  rect(square.x, square.y, square.w, square.h);
}

function checkCollisionWithSquare() {
  if (mouseX > square.x && mouseX < square.x + square.w && mouseY > square.y && mouseY < square.y + square.h) {
    return true;
  }
  return false;
}

function mousePressed() {
  if (checkCollisionWithSquare()) {
    counter++;
  }
}
