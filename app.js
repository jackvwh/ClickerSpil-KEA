"use strict"
const WON = 10;
const MUTE = 5;
let points = 0;
let lives = 3;
let isGameRunning = false;

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
const clickAnimation = ["falling", "zoom_out", "zoom_in", "spiral", "fallover", "fade_out", "beam",];
// empty object arrays for storing current animations and current click animations
let currentAnimation = {};
let currentClick = {};

window.addEventListener("load", ready);

function ready() {
  console.log("JavaScript ready!");
  document.querySelector("#btn_start").addEventListener("click", start);
  document.querySelector("#btn_restart").addEventListener("click", start);
  document.querySelector("#btn_goToStart").addEventListener("click", showStartScreen);
  document.querySelector("#btn_endLife").addEventListener("click", url);
  helloNumber();
}
function start() {
  console.log("GAME STARTING!");
  isGameRunning = true; 
  // reset everything before game start
  resetLives();
  resetPoints();
  resetTimer();
  showGameScreen();
  // start timer
  startTimer();
  // Game elements ACTIVATE! 
  startAnimationer();
  eventListenerClick();
  eventListenerIteration();
  // play game sound
  sounds.startSound1.play();
}
function startAnimationer(){
  console.log("start animations");
  // Start animationer
  for (let i in elements){
    randomAnimation.call(elements[i]);
  }
}
function eventListenerClick(){
  // Registrer click
  for (let i in elements){
    elements[i].addEventListener("click",randomClick);
  }CountQueuingStrategy
}
function eventListenerIteration(){
  // restart position after each iteration 
  for (let i in elements){
    elements[i].addEventListener("animationiteration",restart);
  }
}
function randomAnimation(){
  console.log("Animation being ADDED");
  const container = this;
  /*****  random container animation*/
  let i = Math.floor( (Math.random() * animation.length));
  container.classList.add(animation[i]);
  // save animation with element in currentAnimation:{}
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
function randomClick(){
  console.log("CLICK animation");
  const container = this;
  // fjern click
  container.removeEventListener("click", randomClick);
  // Pause animation
  container.classList.add("paused");
  /*****  random clickAnimation */
  let i = Math.floor( (Math.random() * clickAnimation.length));
  // Adding CLICK animation to element
  container.querySelector("img").classList.add(clickAnimation[i]);
  // store click animation with container in currentClick obj array
  currentClick[container.id] = clickAnimation[i];
  console.log("Added CLICK animation: ", clickAnimation[i]);
  container.addEventListener("animationend", restart);
  // check for lives decrement or points increment
  if (container === elements.virusUpdate|| container === elements.virusUpdate2 || container === elements.virusUpdate3){
    decrementLives();
  } 
  else {
    incrementPoints();
  }
  playSound.call(this);
}
function restart() {
  console.log("restart");
  const container = this;
  // fjern event der bringer os herind
  container.removeEventListener("animationend", restart);
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
  if (isGameRunning){
      // Add new animation
      randomAnimation.call(this);
    }
  console.log("New random class added = ", currentAnimation[container.id] + " to " + container.id);
  // gør det muligt at klikke på container igen
  container.addEventListener("click", randomClick);
}
// Add random duration and left position 
function addRandomDurationAndLeft(){
  const container = this;
   // create random values for CSS properties
   let startTop = Math.floor((Math.random() * (80 - 20) + 20));
   let animationDuration = Math.floor( (Math.random() * (23 - 2) + 2));
   let scale = Math.random() * (2 - 0.3) + 0.3;
   console.log("Style.left: " + startTop + " animation-duration: " + animationDuration);
   // add random CSS properties to element 
   container.style.left = (startTop + "%");
   container.style.scale = (scale);
   container.style.animationDuration = (animationDuration + "s");
}
// Add random duration and top position 
function addRandomDurationAndTop(){
  const container = this;
  // create random values for CSS attributes
  let startSide = Math.floor( (Math.random() * (80 - 20) + 20));
  let animationDuration = Math.floor( (Math.random() * (23 - 2) + 2));
  let scale = Math.random() * (2 - 0.3) + 0.3;
  console.log("Style.top: " + startSide + " animation-duration: " + animationDuration);
  // add/change CSS attributes
  container.style.top = (startSide + "%");
  container.style.scale = (scale);
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
        sounds.goodSound1.currentTime = 0;
        break;
    case elements.virusCorona2:
    case elements.virusBlue2:
    case elements.virusRed2:
    case elements.virusGreen2:
    case elements.virusPink2:
    case elements.virusYellow2:
    case elements.virusYellow3:
      sounds.goodSound2.play();
      sounds.goodSound2.currentTime = 0;
      break;
    case elements.virusUpdate:
      sounds.badSound1.play();
      sounds.badSound1.currentTime = 0;
      break;
    case elements.virusUpdate2:
      sounds.badSound2.play();
      sounds.badSound2.currentTime = 0;
      break;
    case elements.virusUpdate3:
      sounds.badSound3.play();
      sounds.badSound3.currentTime = 0;
      break;
  }
}
function decrementLives(){
  console.log("decrementLives");
  displayDecrementWindows();
  lives--;
    if ( lives === 0){
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
  if (points === MUTE){
    sounds.startSound1.pause();
  }
}
function displayPoints(){
  document.querySelector("#score").textContent = points;
}
function helloNumber(){
  const hello = Math.floor(Math.random() * (5000 - 1000) + 1000)
  document.querySelector("#helloNumber").textContent = hello;
}
function startTimer() {
  //Starter timeren (ur-animationen)
  document.querySelector("#minut_viser").classList.add("minut_animation");
  document.querySelector("#time_viser").classList.add("time_animation");
  document.querySelector("#minut_viser").addEventListener("animationend", timeIsUp);
}
function timeIsUp() {
console.log("Tiden er gået!");

if (points >= WON) {
   levelComplete();
} else {
   gameOver();
}
}
function showStartScreen() {
  // fjern hidden fra startskærm og tilføj til game over og level complete
  document.querySelector("#start").classList.remove("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
  helloNumber();
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
  document.querySelector("#health1").classList.remove("broken_windows");
  document.querySelector("#health2").classList.remove("broken_windows");
  document.querySelector("#health3").classList.remove("broken_windows");
  document.querySelector("#health1").classList.add("active_windows");
  document.querySelector("#health2").classList.add("active_windows");
  document.querySelector("#health3").classList.add("active_windows");
}
function resetPoints() {
  points = 0;
  displayPoints();
}
function resetTimer(){
  document.querySelector("#minut_viser").classList.remove("minut_animation");
  document.querySelector("#time_viser").classList.remove("time_animation");
  document.querySelector("#time_container").offsetWidth;
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
  isGameRunning = false;
  for (let i in elements){
    // remove classes
    elements[i].classList.remove(currentAnimation[elements[i].id]);
     // remove style attributes
    elements[i].removeAttribute("style");
    // remove eventlisteners
    elements[i].removeEventListener("click", randomClick);
    elements[i].removeEventListener("animationiteration",restart);
  }
}
