setup_E();
/** THEME: SARCASM  */
function setup_E() {
  console.log("in e");
  /**************************************************** */
  //get the buttons
  activateButtons(`#TEAM_E`, "ani_canvE", aniA, aniB, aniC, aniD);

  /**************** ANI A ************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN A INSIDE HERE */
  /**************** ANI A ************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:)
   * 1: create a creative, visual pattern using text, divs as shapes, images ...
   * 2: add in mouseclick event listener(s) somewhere to make the sketch interactive
   *
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function  -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/

  function aniA(parentCanvas) {
    console.log("in ani-A -teamE");

      let circles = []; //empty array of circles

      //call to setup the animation before running
      setupSketch();
      //add event listener to the button

    function setupSketch() {
      //offset
      let offset = 40;
    
      for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
          let circle = document.createElement("div");
          circle.classList.add("TEAM_E_circle");

          let offset = 40;
          circle.style.width = "18px";
          circle.style.height = "18px";
          circle.style.left = offset + i * 20 + "px";
          circle.style.top = offset + j * 20 + "px";

          // store grid position
          circle.dataset.x = i;
          circle.dataset.y = j;

          parentCanvas.appendChild(circle);
          circles.push(circle);

          // click listener
          circle.addEventListener("click", () => rippleEffect(i, j));
        }
      }
    }

  function rippleEffect(cx, cy) {
    const maxRadius = 30; // how far the wave spreads

    circles.forEach(circle => {
    let x = parseInt(circle.dataset.x);
    let y = parseInt(circle.dataset.y);

    // distance from clicked circle
    let dist = Math.abs(cx - x) + Math.abs(cy - y);

    if (dist <= maxRadius) {
      setTimeout(() => {
      circle.classList.remove("ripple"); // reset
      void circle.offsetWidth;           // force reflow
      circle.classList.add("ripple"); }, dist * 40); // delay creates wave effect
      }
    });
  } 
}

    /****************ANI B ************************************ */
    /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN B INSIDE HERE */
    /****************ANI B ************************************ */
    /**************** TASK *******************************************
     * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:).
     * 1: create a creatve, visual pattern using text, divs as shapes, images ... 
     * 2: add in mouseover event listener(s) somewhere to make the sketch interactive
     *
     * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
     * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
     * this is so that your styles are not overriden by other teams.
     * NOTE::: All your code is to be added here inside this function -
     * remember you can define other functions inside....
     * Do not change any code above or the HTML markup.
     * **/

    function aniB(parentCanvas) {
      console.log("in anti-B -teamE");

    }

    /****************ANI C ************************************ */
    /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN C INSIDE HERE */
    /****************ANI C************************************ */
    /**************** TASK *******************************************
     * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:)
     * 1: use the PROVIDED keyup/down callbacks `windowKeyDownRef` and/or `windowKeyUpnRef` to handle keyboard events
     * 2: create an interactive pattern/sketch based on keyboard input. Anything goes.
     * 
     * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
     * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
     * this is so that your styles are not overriden by other teams.
     * NOTE::: All your code is to be added here inside this function -
     * remember you can define other functions inside....
     * Do not change any code above or the HTML markup.
     * **/

    /* TASK: make an interactive pattern .. colors, shapes, sizes, text, images....
     * using  ONLY key down and/or keyup -- any keys::
     */

    function aniC(parentCanvas) {
      console.log("in ani-C -teamE");
    
      /*** THIS IS THE CALLBACK FOR KEY DOWN (* DO NOT CHANGE THE NAME *..) */
      windowKeyDownRef = function (e) {
        //code for key down in here
        console.log(e);
        console.log("c-down");
      };

      /*** THIS IS THE CALLBACK FOR KEY UP (*DO NOT CHANGE THE NAME..) */
      windowKeyUpRef = function (e) {
        console.log(e);
        console.log("c-up");
      };
      //DO NOT REMOVE
      window.addEventListener("keydown", windowKeyDownRef);
      window.addEventListener("keyup", windowKeyUpRef);
    }

    /****************ANI D************************************ */
    /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN D INSIDE HERE */
    /****************ANI D************************************ */
    /**************** TASK *******************************************
     * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:).
     * 1: create a creative, visual pattern using text, divs as shapes, images ...
     * 2: add in animation using requestAnimationFrame somewhere to make the sketch animate :)
     *
     * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
     * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
     * this is so that your styles are not overriden by other teams.
     * NOTE::: All your code is to be added here inside this function -
     * remember you can define other functions inside....
     * Do not change any code above or the HTML markup.
     * **/
    function aniD(parentCanvas) {
      console.log("in ani-D -teamE");

    }
  }