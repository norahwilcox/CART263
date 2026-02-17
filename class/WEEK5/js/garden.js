window.onload = function () {
  // Our garden
  let garden = {
    // An array to store the individual flowers
    flowers: [],
    // How many flowers in the garden
    numFlowers: 20,

    /*grass object */
    grass: {
      // The color of the grass (background)
      grassColor: {
        r: 120,
        g: 180,
        b: 120,
      },
      //the grass element
      grassDiv: document.createElement("div"),
    },

    /*sky object */
    sky: {
      // The color of the sky (background)
      skyColor: {
        r: 83,
        g: 154,
        b: 240,
      },
      //the sky element
      skyDiv: document.createElement("div"),
    },

    sun: new Sun(10, 10, {
      r: 240,
      g: 206,
      b: 86
    })
  };

  function createAndRenderTheGarden() {
    /* note how we use dot notation....*/
    //sky
    garden.sky.skyDiv.classList.add("sky");
    garden.sky.skyDiv.style.background = `rgb(
        ${garden.sky.skyColor.r},
        ${garden.sky.skyColor.g},
        ${garden.sky.skyColor.b}
        )`;
    document.getElementsByTagName("main")[0].appendChild(garden.sky.skyDiv);

    //grass
    garden.grass.grassDiv.classList.add("grass");
    garden.grass.grassDiv.style.background = `rgb(
        ${garden.grass.grassColor.r},
        ${garden.grass.grassColor.g},
        ${garden.grass.grassColor.b}
        )`;
    document.getElementsByTagName("main")[0].appendChild(garden.grass.grassDiv);
    garden.sun.renderSun()
  }
  
  /* render the sun, sky and grass*/
  createAndRenderTheGarden(); // render the garden in order to make the flower

  // calls the constructor 
  //let flower = new Flower(); // new calls the constructor automactically so you never have to call flower.construct
  //flower.renderFlower(); // an object

  // Create our flowers by counting up to the number of the flowers
    for (let i = 0; i < garden.numFlowers; i++) {
      // NEW! Create a new flower
      let flower = new Flower();
      // Add the flower to the array of flowers
      garden.flowers.push(flower);
    }
  
    for (let i = 0; i < garden.numFlowers; i++) {
  
    // Add the flower to the array of flowers
    garden.flowers[i].renderFlower();
    }
  
  // add numFlowers at one time
  //for (let i = 0; i < garden.numFlowers; i++) {
          //garden.flowers.push(createFlower());// creates the flower
   // }
   
     //for (let i =0; i< garden.flowers.length; i++){
      // renderFlower(garden.flowers[i]);
  
  //}
  
  window.addEventListener("keydown", function handleKeyDown(event) {
    //call the handleKeyDown method in sun
    // could add specific key here
    garden.sun.updateSun(event);
      
  });
  
}
