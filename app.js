// git@github.com:jackvwh/ClickerSpil-kea.git

"use strict"

const WON = 10;
let points = 0;
let lives = 3;

// HTML element variables
const virusCorona = document.querySelector("#virusCorona_container");
const virusBlue = document.querySelector("#virusBlue_container");
const virusRed = document.querySelector("#virusRed_container");
const virusGreen = document.querySelector("#virusGreen_container");
const virusUpdate = document.querySelector("#update_container");

// object key varibles to create object key/value pairs
const corona = "corona";
const blue = "blue";
const red = "red";
const green = "green";
const update = "update";

const container = {corona:"#virusCorona_container", blue:"#virusBlue_container",red:"#virusRed_container",green:"#virusGreen_container", update:"#update_container"}
const sprites = {corona:"#virusCorona_sprite", blue:"#virusBlue_sprite",red:"#virusRed_sprite",green:"#virusGreen_sprite", update:"#update_sprite"}
const animation = ["fastLeft1", "fastLeft2", "fastLeft3", "slowLeft1", "slowLeft2", "slowLeft3", "slowRight1", "slowRight2", "slowRight3", "fastRight1", "fastRight2", "fastRight3", "fastTop1", "fastTop2", "fastTop3", "slowTop1", "slowTop2", "slowTop3"];
const clickAnimation = ["falling", "zoom_out", "zoom_in", "spiral", "fallover"];

// empty object array for storing current animations
let currentAnimation = {};

window.addEventListener("load", start);

function start() {
  console.log("APP.JS kører!");
    // Start animationer
    // virusCorona.classList.add("fastLeft2");
    virusCorona.classList.add(randomVirusAnimation(corona));
    virusBlue.classList.add(randomVirusAnimation(blue));
    virusRed.classList.add(randomVirusAnimation(red));
    virusGreen.classList.add(randomVirusAnimation(green));
    virusUpdate.classList.add(randomVirusAnimation(update));

    // Registrer click og kald vilkårlig animation til element og gem i object currentAnimation
    virusCorona.addEventListener("click", function(){randomVirusClickAnimation(sprites.corona, container.corona, corona)});
    virusBlue.addEventListener("click", function(){randomVirusClickAnimation(sprites.blue, container.blue, blue)});
    virusRed.addEventListener("click", function(){randomVirusClickAnimation(sprites.red, container.red, red)});
    virusGreen.addEventListener("click", function(){randomVirusClickAnimation(sprites.green, container.green, green)});
    virusUpdate.addEventListener("click", function(){randomVirusClickAnimation(sprites.update, container.update, update)});
}
// random animation 
function randomVirusAnimation(current){
  console.log("random animation");
  // console.log("random animation added");
  /*****  random container animation*/
  let i = Math.floor( (Math.random() * animation.length));
  currentAnimation[current] = animation[i];

  console.log("saved " + animation[i] + " in currentAnimation Object key: " + current);
  console.log(currentAnimation);

  return animation[i];
}
// random CLICK ANIMATION
function randomVirusClickAnimation(sprite, container, current){
  console.log("click random animations");
  // fjern click
  document.querySelector(container).removeEventListener("click", function() {randomVirusClickAnimation(sprite, container, current)});

  // check for lives decrement 
  if (sprite === "#update_sprite"){
    decrementLives();
  } 
  else {
    incrementPoints();
  }
// remove animation
  document.querySelector(container).classList.remove(currentAnimation[current]);

  document.querySelector(container).classList.add("paused");
  /*****  random clickAnimation */
  let i = Math.floor( (Math.random() * clickAnimation.length));
  document.querySelector(sprite).classList.add(clickAnimation[i]);

  
  virusRestart(sprite, container, clickAnimation[i], current); 
}

// // general function to all animation restarts
function virusRestart(sprite, container, clickAnimation, current) {
  console.log("virusRestart");
  // fjern event der bringer os herind
  document.querySelector(container).removeEventListener("animationend", function(){virusRestart(sprite, container, clickAnimation, current)});
  // fjern forsvind-animation
  document.querySelector(sprite).classList.remove(clickAnimation);
  console.log("remove Click animation->", clickAnimation);
  // fjern pause  
  document.querySelector(container).classList.remove("paused");
  console.log("remove paused animation");
  // genstart animation og indsæt ny random animation
  document.querySelector(container).classList.remove(currentAnimation[current]);
  console.log("remove current class = " + currentAnimation[current] + " from " + container );

  document.querySelector(container).offsetWidth;
  console.log("Reflow element: " + container);

  document.querySelector(container).classList.add(randomVirusAnimation(current));
  console.log("New random class added = ", currentAnimation[current] + " to " + container);

  // gør det muligt at klikke på container igen
  document.querySelector(container).addEventListener("click", function() {randomVirusClickAnimation(sprite, container, current);});
  console.log("add eventListener again on:", container);
}
function decrementLives(){
  console.log("decrement");
  displayDecrementWindows();
  lives--;
  if ( lives <= 0){
    gameOver();
  }
}

function displayDecrementWindows(){
  console.log(points, lives)
  console.log("displayDecrementWindows");
  document.querySelector(`#health${lives}`).classList.remove("active_windows");
  document.querySelector(`#health${lives}`).classList.add("broken_windows");
}
function incrementPoints(){
  console.log("incrementPoints");
  points++;
  displayPoints();

  if (points === WON){
    levelComplete();
  }
}

function displayPoints(){
  document.querySelector("#score").textContent = points;
}

// function decrementPoints(){
//   console.log("decrementPoints");
//   points--;
//   displayPoints();
// }

function gameOver(){
  console.log("GameOVer");
  document.querySelector("#game_over").classList.remove("hidden")

  end();
}

function levelComplete(){
  console.log("levelCompletted");
  document.querySelector("#level_complete").classList.remove("hidden")
  end();
}

function end() {
  console.log("JavaScript SLUTTER!");
    // slut animationer
    virusCorona.classList.remove(currentAnimation.corona);
    virusBlue.classList.remove(currentAnimation[blue]);
    virusRed.classList.remove(currentAnimation[red]);
    virusGreen.classList.remove(currentAnimation[green]);
    virusUpdate.classList.remove(currentAnimation[update]);

    // Fjern click 
    virusCorona.removeEventListener("click", function(){randomVirusClickAnimation(sprites.corona, container.corona, corona)});
    virusBlue.removeEventListener("click", function(){randomVirusClickAnimation(sprites.blue, container.blue, blue)});
    virusRed.removeEventListener("click", function(){randomVirusClickAnimation(sprites.red, container.red, red)});
    virusGreen.removeEventListener("click", function(){randomVirusClickAnimation(sprites.green, container.green, green)});
    virusUpdate.removeEventListener("click", function(){randomVirusClickAnimation(sprites.update, container.update, update)});
}


// function clickVirusCorona() {
//     console.log("Click Virus corona");
//     const virus = "#virusCorona_container";
//     const virusSprite = "#virusCorona_sprite";
//     const clickFunc = clickVirusCorona;
//     // Forhindr gentagne clicks
//     document.querySelector("#virusCorona_container").removeEventListener("click", clickVirusCorona);
    
//     // Stop coin container
//     document.querySelector("#virusCorona_container").classList.add("paused");
  
//     // sæt forsvind-animation på coin
//     document.querySelector("#virusCorona_sprite").classList.add("zoom_in");
  
//     // når forsvind-animation er færdig
//     document.querySelector("#virusCorona_container").addEventListener("animationend", function() {virusGoneZoomIn(virus, virusSprite, clickFunc)});
    
//     incrementPoints();
//   }
//   function clickUpdate() {
//     console.log("Click update");
//     const virus = "#update_container";
//     const virusSprite = "#update_sprite"
//     const clickFunc = clickUpdate;
//     // Forhindr gentagne clicks
//     document.querySelector("#update_container").removeEventListener("click", clickUpdate);
    
//     // Stop coin container
//     document.querySelector("#update_container").classList.add("paused");
  
//     // sæt forsvind-animation på coin
//     document.querySelector("#update_sprite").classList.add("zoom_in");
  
//     // når forsvind-animation er færdig: updateGone
//     // document.querySelector("#update_container").addEventListener("animationend", updateGone);
//     document.querySelector("#update_container").addEventListener("animationend", function() {virusGoneZoomIn(virus, virusSprite, clickFunc)});
    
//     decrementLives() ;
//   }

//   function clickVirusBlue() {
//     console.log("Click blue");
//     const virus = "#virusBlue_container";
//     const virusSprite = "#virusBlue_sprite"
//     const clickFunc = clickVirusBlue;
//     // Forhindr gentagne clicks
//     document.querySelector("#virusBlue_container").removeEventListener("click", clickVirusBlue);
    
//     // Stop coin container
//     document.querySelector("#virusBlue_container").classList.add("paused");
  
//     // sæt forsvind-animation på coin
//     document.querySelector("#virusBlue_sprite").classList.add("zoom_in");
  
//     // når forsvind-animation er færdig: coinGone
//     document.querySelector("#virusBlue_container").addEventListener("animationend", function() {virusGoneZoomIn(virus, virusSprite, clickFunc);});

//     decrementLives();
//   }
  
//   function virusGoneZoomIn(virus, virusSprite, clickFunc) {
//     console.log("virusGoneZoomIn");
//     // fjern event der bringer os herind
//     document.querySelector(virus).removeEventListener("animationend", virusGoneZoomIn);
//     // fjern forsvind-animation
//     document.querySelector(virusSprite).classList.remove("zoom_in");
//     // fjern pause  
//     document.querySelector(virus).classList.remove("paused");
//     // genstart fastLeft animation
//     document.querySelector(virus).classList.remove("slowRight1");
//     document.querySelector(virus).offsetWidth;
//     document.querySelector(virus).classList.add("slowRight1");
//     // gør det muligt at klikke på coin igen
//     document.querySelector(virus).addEventListener("click", clickFunc);
//   }

  // function incrementLives(){
  //   console.log("increment");
  //   lives++;
  //   console.log(lives);
  //   displayDecrementWindows();
  // }

// Function to increment windows lives

  // function displayIncrementwindows(){
  //   console.log(points, lives)
  //   console.log("displayIncrementHeart");
  //   document.querySelector(`#health${lives}`).classList.remove("broken_windows");
  //   document.querySelector(`#health${lives}`).classList.add("active_windows");
  // }

  // function virusGoneZoomOut() {
  //   // fjern event der bringer os herind
  //   document.querySelector("#virusCorona_container").removeEventListener("animationend", virusGoneZoomOut);
  
  //   // fjern forsvind-animation
  //   document.querySelector("#virusCorona_sprite").classList.remove("zoom_out");
    
  //   // fjern pause
  //   document.querySelector("#virusCorona_container").classList.remove("paused");
  
  //   // genstart fastLeft animation
  //   document.querySelector("#virusCorona_container").classList.remove("fastLeft1");
  //   document.querySelector("#virusCorona_container").offsetWidth;
  //   document.querySelector("#virusCorona_container").classList.add("fastLeft1");
  
  //   // gør det muligt at klikke på coin igen
  //   document.querySelector("#virusCorona_container").addEventListener("click", clickVirusCorona);  
  // }

  