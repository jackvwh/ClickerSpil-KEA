// git@github.com:jackvwh/ClickerSpil-kea.git

/**********
 * 
game elements behind game foreground? unclickable on the right bc of it
restart is being called after end() is run
points and lives dont increments or decrements respectfully suddenly
sometimes classes are not removed proberly
*********/
"use strict"

// HTML elements
const elements = {
  virusCorona: document.querySelector("#virusCorona_container"),
  virusCorona2: document.querySelector("#virusCorona2_container"),
  virusBlue: document.querySelector("#virusBlue_container"),
  virusBlue2: document.querySelector("#virusBlue2_container"),
  virusRed: document.querySelector("#virusRed_container"),
  virusRed2: document.querySelector("#virusRed2_container"),
  virusGreen: document.querySelector("#virusGreen_container"),
  virusGreen2: document.querySelector("#virusGreen2_container"),
  virusPink: document.querySelector("#virusPink_container"),
  virusPink2: document.querySelector("#virusPink2_container"),
  virusYellow: document.querySelector("#virusYellow_container"),
  virusYellow2: document.querySelector("#virusYellow2_container"),
  virusYellow3: document.querySelector("#virusYellow3_container"),
  virusUpdate: document.querySelector("#update_container"),
  virusUpdate2: document.querySelector("#update2_container"),
  virusUpdate3: document.querySelector("#update3_container"),
}
const WON = 10;
let points = 0;
let lives = 3;

// Animations
const animation = ["right", "left", "top"];
const clickAnimation = ["falling", "zoom_out", "zoom_in", "spiral", "fallover", "fade_out", "beam", ];
// empty object arrays for storing current animations and current click animations
let currentAnimation = {};
let currentClick = {};

window.addEventListener("load", ready);

function ready() {
  console.log("JavaScript ready!");
  document.querySelector("#btn_start").addEventListener("click", start);
}
function start() {
  console.log("GAME STARTING!");
  // skjul startskærm
  document.querySelector("#start").classList.add("hidden");

  startAnimationer();
  eventListenerClick();
  // eventListenerIteration();
}
function startAnimationer(){
  console.log("start animations");
  // Start animationer
  for (let i in elements){
    randomVirusAnimation.call(elements[i]);
  }
}
function eventListenerClick(){
  // Registrer click
  for (let i in elements){
    elements[i].addEventListener("click",randomVirusClickAnimation);
  }
}
function eventListenerIteration(){
  // restart position after each iteration 
  for (let i in elements){
    elements[i].addEventListener("animationiteration",virusRestart);
  }
}
// Add random duration and start position 
function addRandomDurationAndLeft(){
  const container = this;
   // create random values for CSS properties
   let startTop = Math.floor((Math.random() * (70 - 30) + 30));
   let animationDuration = Math.floor( (Math.random() * (23 - 2) + 2));
   console.log("Style.left: " + startTop + " animation-duration: " + animationDuration);
   // add random CSS properties to element 
   container.style.left = (startTop + "%");
   container.style.animationDuration = (animationDuration + "s");
}
// Add random duration and start position 
function addRandomDurationAndTop(){
  const container = this;
  // create random values for CSS attributes
  let startSide = Math.floor( (Math.random() * (60 - 35) + 35));
  let animationDuration = Math.floor( (Math.random() * (23 - 2) + 2));
  console.log("Style.top: " + startSide + " animation-duration: " + animationDuration);
  // add/change CSS attributes
  container.style.top = (startSide + "%");
  container.style.animationDuration = (animationDuration + "s");
}
// random animation 
function randomVirusAnimation(){
  console.log("Animation being ADDED");
  console.log(this);
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
      addRandomDurationAndLeft.call(this);
  }
  else {
      addRandomDurationAndTop.call(this);
  }
}
// random CLICK ANIMATION
function randomVirusClickAnimation(){
  console.log("CLICK animation");
  const container = this;
  console.log(this)
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
  // check for lives decrement or points increment
  if (container === elements.virusUpdate|| container === elements.virusUpdate2 || container === elements.virusUpdate3){
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
  container.querySelector("img").classList.remove(currentClick[container.id]);
  console.log("remove Click animation->", currentClick[container.id]);
  // fjern pause  
  container.classList.remove("paused");
  console.log("remove paused animation");
  // remove animation
  container.classList.remove(currentAnimation[container.id]);
  // remove CSS attribute
  container.removeAttribute("style");
  // genstart animation
  container.classList.remove(currentAnimation[container.id]);
  console.log("remove current class = " + currentAnimation[container.id] + " from " + container.id );
  // force reflow
  container.offsetWidth;
  console.log("Reflow element: " + container.id);
  // Add new animation
  randomVirusAnimation.call(this);
  console.log("New random class added = ", currentAnimation[container.id] + " to " + container.id);

  // gør det muligt at klikke på container igen
  container.addEventListener("click", randomVirusAnimation);
  console.log("add eventListener again on:", container.id);
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
  for (let i in elements){
    // remove classes
    elements[i].classList.remove(currentAnimation[elements[i].id]);
     // remove style attributes
    elements[i].removeAttribute("style");
    // remove eventlisteners
    elements[i].removeEventListener("click", randomVirusClickAnimation);
    elements[i].removeEventListener("animationiteration",virusRestart);
  }
  // Vis startskærm
  document.querySelector("#start").classList.remove("hidden");
}
