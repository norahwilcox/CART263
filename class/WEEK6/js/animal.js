class Animal {
  // Create a new Animal object t
  constructor(x, y, width, height) { // passing properties that will be with every animal
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    // NOTE: We don't know how a generic animal will move
    // so we set its velocity to 0
    this.vx = 0;
    this.vy = 0;
    this.animalBody = document.createElement("div");
  }

  // Move the Animal according to its velocity
  move() {
    this.x += this.vx;
    this.y += this.vy;
    //update the actual div...
    this.animalBody.style.left = this.x + "px";
    this.animalBody.style.top = this.y + "px";
  }

  // Wrap the animal if it reaches the right edge
  wrap() {
    if (this.x > window.innerWidth) {
      this.x -= window.innerWidth;
    }
  }

  // Display the animal 
  renderAnimal() {
    // We will leave this empty because we don't display a generic
    // animal! Instead, we leave this up to the subclasses.
  }
}

 function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    }