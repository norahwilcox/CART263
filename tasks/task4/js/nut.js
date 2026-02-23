class Nut {
  // Create a new Dog object that moves to the right
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.vx = Math.random() * 5 + 1;
    this.vy = 0;
    this.nutBody = document.createElement("div");
  }

  // Display the nuts as a ellipse
  renderNut() {
    this.nutBody.classList.add("nut");
    this.nutBody.style.width = this.width + "px";
    this.nutBody.style.height = this.height + "px";
    this.nutBody.style.left = this.x + "px";
    this.nutBody.style.top = this.y + "px";
    this.nutBody.style.borderRadius = this.width + "px";
    //add to the DOM
    document.getElementsByClassName("grass")[0].appendChild(this.nutBody);
  }
}