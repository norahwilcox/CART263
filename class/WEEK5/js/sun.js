class Sun {
    constructor(x,y, sunColor){ // paramaters x,y and colour
        // bind * members properties *
        this.x = x; // set properties bc you could have multiple suns
        this.y = y;
        this.sunColor = sunColor;
        this.vx = 1; //for movement on x (velocity)
        this.vy =1; //for movement on y
        this.sunDiv = document.createElement("div");
 }
    renderSun(){
    // //sun - IN the sky
    this.sunDiv.classList.add("sun");
    this.sunDiv.style.background = `rgb(${this.sunColor.r},${this.sunColor.g},${this.sunColor.b})`;
    // //append to the SKY div
    document.querySelector(".sky").appendChild(this.sunDiv);
    }

    updateSun() { // called a METHOD not a function, part of the class
        // pass info in and out
        //console.log("sun key")
        console.log("event key") // what key was pessed

    //LINEAR MOVEMENT
    //go up
    if (event.key === "w") {
      console.log("up");
      this.y -= this.vy;
      this.updateDivPos();
    }
    if (event.key === "a") {
      console.log("left");
      this.x -= this.vx;
      this.updateDivPos();
    }
    if (event.key === "s") {
      console.log("down");
      this.y += this.vy;
      this.updateDivPos();
    }
    if (event.key === "d") {
      console.log("right");
      this.x += this.vx;
      this.updateDivPos();
    }
    }
    updateDivPos() {
    this.sunDiv.style.left = this.x + "px";
    this.sunDiv.style.top = this.y + "px";

    }
}
