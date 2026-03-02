window.onload = function () {
    // get the canvas
    let canvas = document.getElementById("testCanvas");
    //get the context
    let context = canvas.getContext("2d");
    
    // CREATE SQUARE
    // let rectSize = 50;
    // //a draw a rect:
    // context.fillStyle = "rgba(255, 0, 0, 255)" // library is the canvas API
    // // draw a rect
    // context.fillRect(canvas.width / 2, canvas.height / 2, rectSize, rectSize);
    // // cut out a rect inside, basically a boolean operation
    // context.clearRect(canvas.width / 2 + rectSize/4, canvas.height / 2 + rectSize/4, rectSize/2, rectSize/2);

    // CREATE CIRCLES
    // context.fillStyle = "#8ED6FF"; // change the color we are using
    // let xPos = canvas.width / 3;
    // let yPos = canvas.height / 2;
    // let radius = 40;
    // let startAngle = 0;
    // let endAngle = Math.PI * 2; //full rotation
    // context.strokeStyle = "#FF0000"; // change the color we are using
    
    // context.arc(xPos, yPos, radius, startAngle, endAngle, true); // post creating the shape
    // context.fill(); // set the fill
    // context.lineWidth = 2; //change stroke
    // context.stroke(); //set the stroke
    
    // context.beginPath(); // like push and pop, needed to create a complete shape
    // context.arc(xPos,yPos,radius,startAngle,endAngle, true);
    // context.fill(); // set the fill
    // context.lineWidth=2; //change stroke
    // context.stroke();//set the stroke
    // context.closePath();

    //SECOND
    // context.strokeStyle = "#0000FF"; // change the color we are using
    // context.beginPath();
    // context.arc(xPos+200,yPos,radius,startAngle,endAngle, true);
    // context.fill(); // set the fill
    // context.lineWidth=2; //change stroke
    // context.stroke();//set the stroke
    // context.closePath();

    // AN IRREGULAR SHAPE
// let lineLength = 100;
// let x1 = canvas.width/2;
// let y1 =canvas.height/2;
// let x2= x1+lineLength;
// let y2 = y1-lineLength;
// let x3 = x1-lineLength;

    // CREATING A SHAPE WITH PATHS
    // context.beginPath(); //start a path
    // context.moveTo(x1,y1); //where to start drawing
    // context.lineTo(x2,y1); //lineTo(where to go from last...)
    // context.lineTo(x2,y2); //lineTo(where to go from last...)
    // context.lineTo(x3,y2); //lineTo(where to go from last...)
    // context.lineTo(x1,y1); //lineTo(where to go from last...)
    // context.strokeStyle = "#FFFFFF"; // change the color we are using
    // context.fillStyle = "#bb25d5ff"
    // context.lineWidth =2;
    // context.stroke();
    // context.fill();
    // context.closePath(); //end a path ...
    
    function createFlower(xPos,yPos,radius, colors){
        drawSinglePetal(xPos,yPos+3*radius/2,radius,colors[0])
        drawSinglePetal(xPos,yPos-3*radius/2,radius,colors[0])
        drawSinglePetal(xPos-3*radius/2,yPos,radius,colors[0])
        drawSinglePetal(xPos+3*radius/2,yPos,radius,colors[0])
        drawSinglePetal(xPos,yPos,radius,colors[1])
    }

    function drawSinglePetal(x,y,r,fillColor){
        context.fillStyle = fillColor; // change the color we are using
        context.strokeStyle = fillColor; // change the color we are using
        context.beginPath();
        context.arc(x,y,r,startAngle,endAngle, true);
        context.fill(); // set the fill
        context.lineWidth=2; //change stroke
        context.stroke();//set the stroke
        context.closePath();
    }
    
    //call function to create a flower
    let startAngle = 0;
    let endAngle = Math.PI * 2; //full rotation
    createFlower(canvas.width / 2,canvas.height / 2, 60,["#ff0088ff","rgb(187, 231, 254)"])

    requestAnimationFrame(animate);
    function animate(){
        console.log("go")
        requestAnimationFrame(animate);
    }

    let r1 = 30;
    let counter = 0;
    requestAnimationFrame(animate);
    function animate() {
        //console.log("go")
        context.clearRect(0, 0, canvas.width, canvas.height);
        //we will make a scaling animation:
        //math.sin goes from [-1,1]*30 == -30,30
        //then if we add 30 to the min ==0 and to the max will be 60 :)
        let newSize = Math.sin(counter) * r1 + r1;
        createFlower(canvas.width / 2, canvas.height / 2, newSize, [
            "#ff0088ff",
            "#ce4990ff",
        ]);
        counter += 0.01;
        requestAnimationFrame(animate);
    }
};


    

    