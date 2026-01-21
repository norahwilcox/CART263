"use strict";

const textObj = {
  content: "test",
  size: 28,
  color: 255
};

const spacing = 25;

function setup() {
  createCanvas(500, 500);
  background(0);

  textAlign(CENTER, CENTER);
  textSize(textObj.size);
  fill(textObj.color);

  text(textObj.content, width / 2, height / 2);

  for (let i = 0; i <= 9; i++) {
    text(i, spacing + i * spacing, spacing);
  }

  for (let i = 1; i <= 15; i++) {
    text(i, spacing, spacing + i * spacing);
  }
}

function draw() {
  
}

