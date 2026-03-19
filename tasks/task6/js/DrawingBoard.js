class DrawingBoard {
  /* Constructor */
  constructor(canvas, context,drawingBoardId) {
    this.canvas = canvas;
    this.context = context;
    this.objectsOnCanvas = [];
    let self = this;
    this.drawingBoardId = drawingBoardId;
    //each element has a mouse clicked and a mouse over
    this.canvas.addEventListener("click", function (e) {
      self.clickCanvas(e);
    });

    this.canvas.addEventListener("mousemove", function (e) {
      self.overCanvas(e);
    });

    document.addEventListener("keydown", (e) => {
      if (e.code === "Space" && this.drawingBoardId ==="partA") {
      this.clearObjects();
      }
    });
  }

  overCanvas(e) {
    //console.log("over");
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);
    console.log(this.mouseOffsetX, this.mouseOffsetY);
    //differentiate which canvas

    //you can remove the console.logs /// 
    if(this.drawingBoardId ==="partA"){
      console.log("in A")

      // added for loop to loop through objects and update their postion
      for (let i = 0; i < this.objectsOnCanvas.length; i++) {
        this.objectsOnCanvas[i].x = this.mouseOffsetX;
        this.objectsOnCanvas[i].y = this.mouseOffsetY;
      }
    }
    if(this.drawingBoardId ==="partB"){
      console.log("in B")
    }
    if(this.drawingBoardId ==="partC"){
      console.log("in C")
    }
    if(this.drawingBoardId ==="partD"){
      console.log("in D")
   }
  }

  clickCanvas(e) {
   // console.log("clicked");
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);
    //console.log(this.mouseOffsetX, this.mouseOffsetY);
     
  let radius = Math.random() * 30 + 10;
  let fillColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
  let strokeColor = `hsl(${Math.random() * 360}, 70%, 40%)`;

    //differentiate which canvas
   //you can remove the console.logs /// 
    if(this.drawingBoardId ==="partA"){
      console.log("in A")

      // Create new circle
      let newCircle = new CircularObj(
        this.mouseOffsetX,
        this.mouseOffsetY,
        radius,
        fillColor,
        strokeColor,
        this.context
      );
      // Add to array
      this.addObj(newCircle);
    }

    if(this.drawingBoardId ==="partB"){
      console.log("in B")
    }
    if(this.drawingBoardId ==="partC"){
      console.log("in C")
    }
    if(this.drawingBoardId ==="partD"){
      console.log("in D")
      }
  }
  /* method to add obj to canvas */
  addObj(objToAdd) {
    this.objectsOnCanvas.push(objToAdd);
  }

clearObjects() {
  this.objectsOnCanvas = [];
}
  
  /* method to add display objects on canvas */
  display() {
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].display();
    }
  }

  /* method to add animate objects on canvas */
  animate() {
    // moved outside of for loop
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].update();
     this.objectsOnCanvas[i].display();
    }
  }

  run(videoElement){
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].update(videoElement);
      this.objectsOnCanvas[i].display();
    }
  }
}


