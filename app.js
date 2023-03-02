// git@github.com:jackvwh/ClickerSpil-kea.git

/**********  TASK TO DO ----
game elements behind game foreground? unclickable on the right bc of it
restart is being called after end() is run
points and lives dont increments or decrements respectfully suddenly?? very strange
sometimes classes are not removed proberly, proberly connected/reason to the points/lives problem 
*********/

"use strict"
const WON = 10;
let points = 0;
let lives = 3;
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
// sounds elements
const sounds = {
  badSound1: document.querySelector("#badSound1"),
  badSound2: document.querySelector("#badSound2"),
  badSound3: document.querySelector("#badSound3"),
  goodSound1: document.querySelector("#goodSound1"),
  goodSound2: document.querySelector("#goodSound2"),
  startSound1: document.querySelector("#startSound1"),
  endSound1: document.querySelector("#endSound1"),
  endSound2: document.querySelector("#endSound2"),
}
// Animations
const animation = ["right", "left", "top",];
const clickAnimation = ["falling", "zoom_out", "zoom_in", "spiral", "fallover", "fade_out", "beam", ];
// empty object arrays for storing current animations and current click animations
let currentAnimation = {};
let currentClick = {};

window.addEventListener("load", ready);

function ready() {
  console.log("JavaScript ready!");
  document.querySelector("#btn_start").addEventListener("click", start);
  document.querySelector("#btn_restart").addEventListener("click", start);
  document.querySelector("#btn_goToStart").addEventListener("click", showStartScreen);
}
function start() {
  console.log("GAME STARTING!");
  // show game screen and reset lives and points
  resetLives();
  resetPoints();
  showGameScreen();
  // play game sound
  sounds.startSound1.play();
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
  playSound.call(this);
}
// general function to all animation restarts
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
// Add random duration and left position 
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
// Add random duration and top position 
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
function playSound(){
  const container = this; 
  switch (container){
    case elements.virusCorona:
    case elements.virusBlue:
    case elements.virusRed:
    case elements.virusGreen:
    case elements.virusPink:
    case elements.virusYellow:
        sounds.goodSound1.play();
        break;
    case elements.virusCorona2:
    case elements.virusBlue2:
    case elements.virusRed2:
    case elements.virusGreen2:
    case elements.virusPink2:
    case elements.virusYellow2:
    case elements.virusYellow3:
      sounds.goodSound2.play();
      break;
    case elements.virusUpdate:
      sounds.badSound1.play();
      break;
    case elements.virusUpdate2:
      sounds.badSound2.play();
      break;
    case elements.virusUpdate3:
      sounds.badSound3.play();
      break;
  }
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
function showStartScreen() {
  // fjern hidden fra startskærm og tilføj til game over og level complete
  document.querySelector("#start").classList.remove("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}
function showGameScreen() {
  // Skjul startskærm, game over og level complete
  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}
function resetLives() {
  // sæt lives til 3
  lives = 3;
  //nulstil visning af liv (hjerte vi ser)
  document.querySelector("#health1").classList.remove("broken_window");
  document.querySelector("#health2").classList.remove("broken_window");
  document.querySelector("#health3").classList.remove("broken_window");
  document.querySelector("#health1").classList.add("active_window");
  document.querySelector("#health2").classList.add("active_window");
  document.querySelector("#health3").classList.add("active_window");
}
function resetPoints() {
  // nulstil point
  points = 0;
  // nulstil vising af point
  displayPoints();
}
function gameOver(){
  console.log("GameOver");
  document.querySelector("#game_over").classList.remove("hidden");
  end();
  sounds.startSound1.pause();
  sounds.endSound1.play();
} 
function levelComplete(){
  console.log("levelComplete");
  document.querySelector("#level_complete").classList.remove("hidden");
  end();
  //pause game sound and play end sound
  sounds.startSound1.pause();
  sounds.endSound2.play();
}
function end() {
  console.log("JavaScript SLUTTER!");
  for (let i in elements){
    // remove classes
    elements[i].classList.remove(currentAnimation[elements[i].id]);// <---- works?? 
     // remove style attributes
    elements[i].removeAttribute("style");
    // remove eventlisteners
    elements[i].removeEventListener("click", randomVirusClickAnimation);
    elements[i].removeEventListener("animationiteration",virusRestart);
  }
}
