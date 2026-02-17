class Dog extends Animal { // class that defines objec "dog"
    // "extends" devires Dog from the Animal class
    // dog and alos an animal
    // Create a new Dog object that moves to the right
    constructor(x, y, width, height) {
      super(x, y, width, height) // the super class is animal and calls the constructor of the parenst (animal)
    //this.x = x;
    //this.y = y;
    //this.width = width;
    //this.height = height;
    this.vx = Math.random() * 5 + 1;
    this.vy = 0;
        this.animalBody = document.createElement("div");
        
        this.originalY = this.y;

    //ONLY in the Bird class : new variables
    this.angle = 0;
    this.sleepiness = 0.1;
  }

  // Move the Dog according to its velocity
    move() {
            //console.log("go");
      // osolation movement
    this.y=this.originalY + Math.sin(this.angle)*8
      this.angle += 0.05;
      // osolation plus the parent's movement
    this.veer();
    super.move(); // calling the parent's move
//     this.x += this.vx;
//     this.y += this.vy;
//     //update the actual div...
//     this.animalBody.style.left = this.x + "px";
//     this.animalBody.style.top = this.y + "px";
    }
    // p2
   // veer() causes the bird to randomly veer on the y axis
  veer() {
    let r = Math.random(); // math random gives numnber between 0 and 1
    //console.log("in veer "+r)
    if (r < this.sleepiness) {
      this.vy += randomRange(-.1, .1);
    }
  }

  // Wrap the dog if it reaches the right edge
//   wrap() {
//     if (this.x > window.innerWidth) {
//       this.x -= window.innerWidth;
//     }
//   }

  // Display the dog as a ellipse
    renderAnimal() {
      super.renderAnimal();
    this.animalBody.classList.add("animal");
    this.animalBody.style.width = this.width + "px";
    this.animalBody.style.height = this.height + "px";
    this.animalBody.style.left = this.x + "px";
    this.animalBody.style.top = this.y + "px";
    this.animalBody.style.borderRadius = this.width + "px";
    //add to the DOM
    document.getElementsByClassName("grass")[0].appendChild(this.animalBody);
  }
}