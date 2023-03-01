// git@github.com:jackvwh/ClickerSpil-kea.git

"use strict"

// HTML element variables
const virusCorona = document.querySelector("#virusCorona_container");
const virusCorona2 = document.querySelector("#virusCorona2_container");
const virusBlue = document.querySelector("#virusBlue_container");
const virusBlue2 = document.querySelector("#virusBlue2_container");
const virusRed = document.querySelector("#virusRed_container");
const virusRed2 = document.querySelector("#virusRed2_container");
const virusGreen = document.querySelector("#virusGreen_container");
const virusGreen2 = document.querySelector("#virusGreen2_container");
const virusPink = document.querySelector("#virusPink_container");
const virusPink2 = document.querySelector("#virusPink2_container");
const virusYellow = document.querySelector("#virusYellow_container");
const virusYellow2 = document.querySelector("#virusYellow2_container");
const virusYellow3 = document.querySelector("#virusYellow3_container");
const virusUpdate = document.querySelector("#update_container");
const virusUpdate2 = document.querySelector("#update2_container");
const virusUpdate3 = document.querySelector("#update3_container");

const WON = 10;
let points = 0;
let lives = 3;

// Animations
const animation = ["right", "left", "top"];
const clickAnimation = ["falling", "zoom_out", "zoom_in", "spiral", "fallover", "fade_out", "beam", ];
// empty object arrays for storing current animations and click
let currentAnimation = {};
let currentClick = {};

window.addEventListener("load", start);

function start() {
  console.log("APP.JS kører!");
   startAnimationer();
   eventListenerClick();
  //  eventListenerIteration();
}
function startAnimationer(){
  // Start animationer
  randomVirusAnimation.call(virusCorona);
  randomVirusAnimation.call(virusCorona2);
  randomVirusAnimation.call(virusBlue);
  randomVirusAnimation.call(virusBlue2);
  randomVirusAnimation.call(virusRed);
  randomVirusAnimation.call(virusRed2);
  randomVirusAnimation.call(virusGreen);
  randomVirusAnimation.call(virusGreen2);
  randomVirusAnimation.call(virusPink);
  randomVirusAnimation.call(virusPink2);
  randomVirusAnimation.call(virusYellow);
  randomVirusAnimation.call(virusYellow2);
  randomVirusAnimation.call(virusYellow3);
  randomVirusAnimation.call(virusUpdate);
  randomVirusAnimation.call(virusUpdate2);
  randomVirusAnimation.call(virusUpdate3);
 
}
function eventListenerClick(){
  // Registrer click og kald vilkårlig animation til element og gem i object currentAnimation
  virusCorona.addEventListener("click",randomVirusClickAnimation);
  virusCorona2.addEventListener("click", randomVirusClickAnimation);
  virusBlue.addEventListener("click",randomVirusClickAnimation);
  virusBlue2.addEventListener("click", randomVirusClickAnimation);
  virusRed.addEventListener("click", randomVirusClickAnimation);
  virusRed2.addEventListener("click", randomVirusClickAnimation);
  virusGreen.addEventListener("click", randomVirusClickAnimation);
  virusGreen2.addEventListener("click", randomVirusClickAnimation);
  virusPink.addEventListener("click", randomVirusClickAnimation);
  virusPink2.addEventListener("click", randomVirusClickAnimation);
  virusYellow.addEventListener("click", randomVirusClickAnimation);
  virusYellow2.addEventListener("click", randomVirusClickAnimation);
  virusYellow3.addEventListener("click", randomVirusClickAnimation);
  virusUpdate.addEventListener("click", randomVirusClickAnimation);
  virusUpdate2.addEventListener("click", randomVirusClickAnimation);   
  virusUpdate3.addEventListener("click", randomVirusClickAnimation);
}
function eventListenerIteration(){
  // restart 
  virusCorona.addEventListener("animationiteration",virusRestart);
  virusCorona2.addEventListener("animationiteration", virusRestart);
  virusBlue.addEventListener("animationiteration",virusRestart);
  virusBlue2.addEventListener("animationiteration", virusRestart);
  virusRed.addEventListener("animationiteration", virusRestart);
  virusRed2.addEventListener("animationiteration", virusRestart);
  virusGreen.addEventListener("animationiteration", virusRestart);
  virusGreen2.addEventListener("animationiteration", virusRestart);
  virusPink.addEventListener("animationiteration", virusRestart);
  virusPink2.addEventListener("animationiteration", virusRestart);
  virusYellow.addEventListener("animationiteration", virusRestart);
  virusYellow2.addEventListener("animationiteration", virusRestart);
  virusYellow3.addEventListener("animationiteration", virusRestart);
  virusUpdate.addEventListener("animationiteration", virusRestart);
  virusUpdate2.addEventListener("animationiteration", virusRestart);   
  virusUpdate3.addEventListener("animationiteration", virusRestart);
}
// random animation 
function randomVirusAnimation(){
  console.log("Animation being ADDED");
  const container = this;
  /*****  random container animation*/
  let i = Math.floor( (Math.random() * animation.length));
  container.classList.add(animation[i]);
  currentAnimation[container.id] = animation[i];
  console.log("saved " + animation[i] + " in currentAnimation Object key: " + container.id);
  console.log(currentAnimation);

  // random start position and speed selecting
  console.log("Start position and animation-duration being ADDED");

  if ( animation[i] === "top"){
    // create values for CSS properties
    let startTop = Math.floor((Math.random() * (70 - 30) + 30));
    let aniDuration = Math.floor( (Math.random() * (23 - 2) + 2));
    console.log("Style.left: " + startTop + " animation-duration: " + aniDuration);
    // add/change CSS properties 
    container.style.left = (startTop + "%");
    container.style.animationDuration = (aniDuration + "s");
  }
  else {
    // create values for CSS attributes
    let startSide = Math.floor( (Math.random() * (60 - 35) + 35));
    let aniDuration = Math.floor( (Math.random() * (23 - 2) + 2));
    console.log("Style.top: " + startSide + " animation-duration: " + aniDuration);
    // add/change CSS attributes
    container.style.top = (startSide + "%");
    container.style.animationDuration = (aniDuration + "s");
  }
}
// random CLICK ANIMATION
function randomVirusClickAnimation(){
  console.log("CLICK animation");
  const container = this;
  // fjern click
  container.removeEventListener("click", randomVirusClickAnimation);
  // Pause animation
  container.classList.add("paused");
  /*****  random clickAnimation */
  let i = Math.floor( (Math.random() * clickAnimation.length));
  // Adding CLICK animation to element
  container.querySelector("img").classList.add(clickAnimation[i]);
  currentClick[container.id] = clickAnimation[i];
  console.log("Added CLICK animation: ", clickAnimation[i]);
  console.log(currentClick);
  container.addEventListener("animationend", virusRestart);

  // check for lives decrement 
  if (container === virusUpdate|| container === virusUpdate2 || container === virusUpdate3){
    decrementLives();
  } 
  else {
    incrementPoints();
  }
}
// // general function to all animation restarts
function virusRestart() {
  console.log("virusRestart");
  const container = this;
  // fjern event der bringer os herind
  container.removeEventListener("animationend", virusRestart);
  // fjern CLICK animation
  container.querySelector("img").classList.remove(clickAnimation[container.id]);
  console.log("remove Click animation->", clickAnimation[container.id]);
  // fjern pause  
  container.classList.remove("paused");
  console.log("remove paused animation");
  // remove animation
  container.classList.remove(currentAnimation[container.id]);
  // remove CSS attribute
  container.removeAttribute("style");
  // genstart animation
  container.classList.remove(currentAnimation[container]);
  console.log("remove current class = " + currentAnimation[container.id] + " from " + container.id );
  // force reflow
  container.offsetWidth;
  console.log("Reflow element: " + container);
  // Add new animation
  randomVirusAnimation.call(this);
  console.log("New random class added = ", currentAnimation[container.id] + " to " + container.id);

  // gør det muligt at klikke på container igen
  // container.addEventListener("click", randomVirusAnimation);
  
  // console.log("add eventListener again on:", container);
}
function decrementLives(){
  console.log("decrementLives");
  console.log("Lives is -->", lives);
  displayDecrementWindows();
  lives--;
  console.log("Lives is now --->", lives);
  if ( lives <= 0){
    gameOver();
  }
}
function displayDecrementWindows(){
  console.log("displayDecrementWindows");
  console.log("Points= " + points + " and lives= " + lives);
  document.querySelector(`#health${lives}`).classList.remove("active_windows");
  document.querySelector(`#health${lives}`).classList.add("broken_windows");
}

function incrementPoints(){
  console.log("incrementPoints");
  points++;
  displayPoints();
  console.log("Points= " + points + " Lives= " + lives);
  if (points === WON){
    levelComplete();
  }
}
function displayPoints(){
  document.querySelector("#score").textContent = points;
}

function gameOver(){
  console.log("GameOver");
  document.querySelector("#game_over").classList.remove("hidden");
  end();
}

function levelComplete(){
  console.log("levelComplete");
  document.querySelector("#level_complete").classList.remove("hidden");
  end();
}

function end() {
  console.log("JavaScript SLUTTER!");
    // slut animationer
    virusCorona.classList.remove(currentAnimation[corona]);
    virusCorona2.classList.remove(currentAnimation[corona2]);
    virusBlue.classList.remove(currentAnimation[blue]);
    virusBlue2.classList.remove(currentAnimation[blue2]);
    virusRed.classList.remove(currentAnimation[red]);
    virusRed2.classList.remove(currentAnimation[red2]);
    virusGreen.classList.remove(currentAnimation[green]);
    virusGreen2.classList.remove(currentAnimation[green2]);
    virusPink.classList.remove(currentAnimation[pink]);
    virusPink2.classList.remove(currentAnimation[pink2]);
    virusYellow.classList.remove(currentAnimation[yellow]);
    virusYellow2.classList.remove(currentAnimation[yellow2]);
    virusYellow3.classList.remove(currentAnimation[yellow3]);
    virusUpdate.classList.remove(currentAnimation[update]);
    virusUpdate2.classList.remove(currentAnimation[update2]);
    virusUpdate3.classList.remove(currentAnimation[update3]);

    // remove CSS attributes
    virusCorona.removeAttribute("style");
    virusCorona.removeAttribute("style");
    virusBlue.removeAttribute("style");
    virusBlue2.removeAttribute("style");
    virusRed.removeAttribute("style");
    virusRed2.removeAttribute("style");
    virusGreen.removeAttribute("style");
    virusGreen2.removeAttribute("style");
    virusPink.removeAttribute("style");
    virusPink2.removeAttribute("style");
    virusYellow.removeAttribute("style");
    virusYellow2.removeAttribute("style");
    virusYellow3.removeAttribute("style");
    virusUpdate.removeAttribute("style");
    virusUpdate2.removeAttribute("style");
    virusUpdate3.removeAttribute("style");

    // Fjern click 
    virusCorona.removeEventListener("click", randomVirusClickAnimation);
    virusCorona2.removeEventListener("click", randomVirusClickAnimation);
    virusBlue.removeEventListener("click", randomVirusClickAnimation);
    virusBlue2.removeEventListener("click", randomVirusClickAnimation);
    virusRed.removeEventListener("click", randomVirusClickAnimation);
    virusRed2.removeEventListener("click", randomVirusClickAnimation);
    virusGreen.removeEventListener("click", randomVirusClickAnimation);
    virusGreen2.removeEventListener("click", randomVirusClickAnimation);
    virusPink.removeEventListener("click", randomVirusClickAnimation);
    virusPink2.removeEventListener("click", randomVirusClickAnimation);
    virusYellow.removeEventListener("click", randomVirusClickAnimation);
    virusYellow2.removeEventListener("click", randomVirusClickAnimation);
    virusYellow3.removeEventListener("click", randomVirusClickAnimation);
    virusUpdate.removeEventListener("click", randomVirusClickAnimation);
    virusUpdate2.removeEventListener("click", randomVirusClickAnimation);
    virusUpdate3.removeEventListener("click", randomVirusClickAnimation);

    // restart 
  virusCorona.removeEventListener("animationiteration",virusRestart);
  virusCorona2.removeEventListener("animationiteration", virusRestart);
  virusBlue.removeEventListener("animationiteration",virusRestart);
  virusBlue2.removeEventListener("animationiteration", virusRestart);
  virusRed.removeEventListener("animationiteration", virusRestart);
  virusRed2.removeEventListener("animationiteration", virusRestart);
  virusGreen.removeEventListener("animationiteration", virusRestart);
  virusGreen2.removeEventListener("animationiteration", virusRestart);
  virusPink.removeEventListener("animationiteration", virusRestart);
  virusPink2.removeEventListener("animationiteration", virusRestart);
  virusYellow.removeEventListener("animationiteration", virusRestart);
  virusYellow2.removeEventListener("animationiteration", virusRestart);
  virusYellow3.removeEventListener("animationiteration", virusRestart);
  virusUpdate.removeEventListener("animationiteration", virusRestart);
  virusUpdate2.removeEventListener("animationiteration", virusRestart);   
  virusUpdate3.removeEventListener("animationiteration", virusRestart);
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

  