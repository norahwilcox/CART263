class Bird extends Animal{
  // Create a new bird object that moves to the right

  constructor(x, y,width,height) {
    // Call the Animal's constructor()
    // Remember, it's called super() when we call it from a subclass
    super(x, y);
   // Set our properties to the specific bird values
    this.width = width;
    this.height = height;
    this.vx = Math.random() * 5 + 1;
    this.vy = 0;
    this.animalBody = document.createElement("div");

    this.originalY = this.y;

    //ONLY in the Bird class : new variables
    this.angle = 0;
    this.sleepiness = 0.1;
  }
  // override A - p1
   // Move the Animal according to its velocity
  move() {
    //console.log("go");
      // osolation movement
    this.y=this.originalY + Math.sin(this.angle)*8
      this.angle += 0.05;
      // osolation plus the parent's movement
    this.veer();
    super.move(); // calling the parent's move
}
// p2
   // veer() causes the bird to randomly veer on the y axis
  veer() {
    let r = Math.random();
    //console.log("in veer "+r)
    if (r < this.sleepiness) {
      this.vy += randomRange(-.1, .1);
    }
  }
    
    wrap() {

     // reset y velocity    
    if (this.x > window.innerWidth) {
      //reset
      this.vy = 0;
    }
        super.wrap();
    }
// Display the bird as a ellipse
  renderAnimal() {
    // Remember to call the superclass' version of this method!
    super.renderAnimal();
    this.animalBody.classList.add("animal");
    this.animalBody.style.width = this.width + "px";
    this.animalBody.style.height = this.height + "px";
    this.animalBody.style.left = this.x + "px";
    this.animalBody.style.top = this.y + "px";
    this.animalBody.style.borderRadius = this.width + "px";
    this.animalBody.style.backgroundColor = `rgb(106, 90, 205)`;
    document.getElementsByClassName("sky")[0].appendChild(this.animalBody);

  }
}

 /*
Math.random() generates a random decimal between 0 (inclusive) and 1 (exclusive).
Multiply the result by (max – min + 1) to scale it to the desired range, 
then add min to shift it to the correct starting value.
Use Math.floor() to round down to the nearest integer, 
ensuring the result is within the specified range.
*/

 function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    }