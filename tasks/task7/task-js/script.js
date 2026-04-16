/* LEAH  - WELCOME TO A CART 263 TASK to PRACTISE BASIC EVENTS  */

window.onload = setup;

function setup () {
    console.log("go task!");

 
/* GIVEN * : An object containing the current settings for drawing 
*  THESE  presets will need to be modified ... 
*/  
    let currentPresets = {
        color: "red",
        stroke: 1,
        shape: "square",
        borderRadius: "0px",
        isDrawing: true,
        drawingMode: "mouse-move",
      };

 /* GIVEN * : An object containing the current settings for text 
*  THESE  presets will need to be modified ... 
*/       
  let textPresets = {
    fSize:"12px"

  }


/* GIVEN *  a reference to the div in which we will allow for drawing ... 
*
*/
let pCanvas = document.getElementById("mouseCanvas");

/* GIVEN *  a reference to the div in which we will allow for text input ... 
*
*/
let typeArea = document.getElementById("typeArea");

/* GIVEN *  the event listener to detect if the mouse is moving in the div 
* with id `mouseCanvas`. The callback function is addAPoint
*
*/
  pCanvas.addEventListener("mousemove", addAPoint);


/* GIVEN *  this function when called will check if drawing 
* is true and the drawing mode is mouse-move then it will call the function to create a new point
*
*/

function addAPoint(event) {
    if (currentPresets.isDrawing === true && currentPresets.drawingMode === "mouse-move") {
      createNewDrawingPoint(event.clientX, event.clientY);
    }
  }


 /* GIVEN *  the event listener to detect if the mouse is being clicked in the div 
  * with id `mouseCanvas`
  * TO DO *
  * WILL HAVE DUAL FUNCTIONALITY (DEPENDENT ON THE DRAWING MODE)
  * EITHER WILL SWITCH DRAWING OFF (LIKE LIFTING UP YOUR PEN)
  * OR
  * WILL ADD A POINT TO THE CANVAS 
  
  */
  pCanvas.addEventListener("click", function (event) {
    if (currentPresets.drawingMode === "mouse-move") {
      //turn drawing on / off
      // TO DO
     
    }
    //the click is now the drawing mode :)
    else {
      // TO DO
    }
  });


/* GIVEN * function to create a new drawing point.
*
*/
function createNewDrawingPoint(mouseX, mouseY) {
    //get the mouse canvas
    let pCanvas = document.getElementById("mouseCanvas");
    // get the RENDERED coordinates
    let renderedCoordinates = pCanvas.getBoundingClientRect();

    //create a new DIV
    let newDiv = document.createElement("div");
    newDiv.classList.add("point");

    //calculate the point to draw on the canvas
    let offsetX = Math.floor(mouseX - renderedCoordinates.x);
    let offsetY = Math.floor(mouseY - renderedCoordinates.y);
 

    // set the left and top
    newDiv.style.left = offsetX + "px";
    newDiv.style.top = offsetY + "px";

    //add the dot to the canvas
    pCanvas.appendChild(newDiv);


    //set the stroke width
    newDiv.style.width = currentPresets.stroke + "px";
    newDiv.style.height = currentPresets.stroke + "px";

      /**** NOTE HOW THE PRESETS ARE USED TO ASSIGN THE STYLE */
    //also set the border radius
    newDiv.style.borderRadius = currentPresets.borderRadius;
    //color
    newDiv.style.background = currentPresets.color;
    //opacity
    newDiv.style.opacity = currentPresets.opacity;
  }

  /**************************BUTTONS FOR DRAWING************************* */

  /*A:: COLOR BUTTONS ********************************************/
  /* TO DO: 
  *  1: Access each color button and assign an event listener to listen for the click event
  *  2:Write a callback function - that when a specific color button is clicked,
  *  access its id - and use the id to set the current drawing color (currentPresets.color)
  *  3: Finally access all the current points drawn (hint: they all have the class name `point`)
     and change their current background color to the selected color.
  */
  let colorButtons= document.querySelectorAll(".color-button");
   
   /*B:: STROKE BUTTON ********************************************/
  /* TO DO: 
  *  1: Access the stroke button and assign an event listener to listen for the click event
  *  2: Write a callback function - that when the stroke button is clicked, access  the variable
  *   currentPresets.stroke - and check if it is < 10  - if it is add by 1, else set it to 1.
  *   Update the value in the button
  *  3: Finally access all the current points drawn (hint: they all have the class name `point`)
     and change their current stroke value to the updated value.
  */
   let strokeButton = document.querySelector("#change-stroke-button");

  /*C:: SHAPE BUTTON ********************************************/
  /* TO DO: 
  *  1: Access the shape and assign an event listener to listen for the click event
  *  2: Write a callback function - that when the shape button is clicked, access the variable
  *   currentPresets.shape - and check if it is "circle" or "square"  
  *   - if it is "square": set the currentPresets.shape  to "circle" and the opposite (circle to square)
  *   Update currentPresets.borderRadius to "0px" if the updated preset is square and to "5px" otherwise
  *   Update the value in the  shape button as well
  *  3: Finally access all the current points drawn (hint: they all have the class name `point`)
     and change their current border-radius value to the updated value.
  */
     let shapeButton = document.querySelector("#change-shape-button");


   /*D:: CHANGE DRAWING MODE ********************************************/
  /* TO DO: 
  *  1: Access the shape and assign an event listener to listen for the click event
  *  2: Write a callback function - that when the mode button is clicked, access the variable
  *   currentPresets.drawingMode - and check if it is "mouse-move" or "mouse-click"  
  *   - if it is "mouse-move": set the currentPresets.drawingMode  to "mouse-click" and the opposite (mouse-click to mouse-move)
  *   Update the value in the  shape button as well
  *  3: FILL IN THE CONDITION IN THE GIVEN EVENT listener for clicking the mouse and add the codeto add a point if the drawing mode is mouse-click
  *  OR 
  *   FILL IN THE CONDITION IN THE GIVEN EVENT listener for clicking the mouse and add the code to  toggle the drawing mode:
  *   turn drawing off it is on or on if it is off (when the drawing mode is mouse-move)
  */
  let modeButton = document.querySelector("#change-mode-button");

   /*E:: OPACITY BUTTON ********************************************/
  /* TO DO: 
  *  1: Access the opacity button and assign an event listener to listen for the click event
  *  2: Write a callback function - that when the opacity button is clicked, access  the variable
  *   currentPresets.opacity - and check if it is > 0.0  - if it is  then decrement it by 0.1, else set it to 1.0.
  *   Update the value in the button
  *  3: Finally access all the current points drawn (hint: they all have the class name `point`)
     and change their current opacity value to the updated value.
  */
     let opacityButton = document.querySelector("#change-opacity-button");

  /*F:: ERASE BUTTON ********************************************/
  /* TO DO: 
  *  1: Access the erase button and assign an event listener to listen for the click event
  *  2: Write a callback function - that when the erase button is clicked, 
  *  remove all points (hint: they all have the class name `point`) from the drawing div
  */
 /**************************TEXT INPUT ********************************/
  /*A:: THE EVENT LISTENER ********************************************/
  /* TO DO: 
  * 1: Add an event listener to the window, to listen for the keydown event
  * 2: Write a callback function - that will add the value of the pressed key to the text content
  * (hint: access the textContent attribute of the typeArea Element`)..
  * BONUS: only add to the text if the key typed is either a letter of the alphabet or a number or a space char
  * (hint: look up the what the keyCode attribute is for the key event)
 
  /**************************BUTTONS FOR TEXT************************* */
  /*A:: FONT SIZE ********************************************/
  /* TO DO: 
  *  1: Access the font-size button and assign an event listener to listen for the click event
  *  2: Write a callback function - that when the this button is clicked, access  the variable
  *   currentPresets.fSize - and check if it is < 32  - if it is add by 1, else set it to 12.
  *   Update the value in the button
  *  3: Finally access all the text that has been input (hint: access the textContent attribute of the typeArea Element`)
     and change the font size to the new font size.
  */
   let fontsizeButton = document.querySelector("#change-font-size-button");
   /*B:: UPPERCASE ********************************************/
  /* TO DO: 
  *  1: Access the uppercase button and assign an event listener to listen for the click event
  *  2: Write a callback function - that when the this button is clicked change all the input text to uppercase (hint: access the textContent attribute of the typeArea Element`)
  */
  let upperCaseButton = document.querySelector("#toUpper-button");

  /*C:: LOWER CASE ********************************************/
  /* TO DO: 
  *  1: Access the lowercase button and assign an event listener to listen for the click event
  *  2: Write a callback function - that when the this button is clicked change all the input text to lowercase (hint: access the textContent attribute of the typeArea Element`)
  */
 let lowerCaseButton = document.querySelector("#toLower-button");
 
 /*D:: ERASE BUTTON ********************************************/
  /* TO DO: 
  *  1: Access the erase button and assign an event listener to listen for the click event
  *  2: Write a callback function - that when the erase button is clicked, 
  *  remove all text (hint: access the textContent attribute of the typeArea Element`)
  */
 /*E:: SELECT AND CHANGE TEXT COLOR BUTTON ********************************************/
 /* TO DO: 
  *  1: Access the color input and assign an event listener to listen for the change event
  *  2: Write a callback function - that when a color is selected,access all the text that has been input (hint: access the textContent attribute of the typeArea Element`)
     and change the color to the new color.
  */

  /*F:: EMOJI BUTTONS ********************************************/
  /* TO DO: 
  *  1: Access each emoji button and assign an event listener to listen for the click event
  *  2:Write a callback function - that when a specific emoji button is clicked, that specific emoji
  *  will be added to the inputted text hint: access the textContent attribute of the typeArea Element`)
  */
  let allEmojis = document.querySelectorAll(".emoji-button")  
   
} //end setup
