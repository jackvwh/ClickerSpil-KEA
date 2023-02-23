"use strict"

// git@github.com:jackvwh/ClickerSpil-kea.git
window.addEventListener("load", start);

let virus;
let points = 0;
let lives = 3;
const virusCorona = document.querySelector("#virusCorona_container");
const virusBlue = document.querySelector("#virusBlue_container");

const sprites = {corona:"#virusCorona_sprite", blue:"#virusBlue_sprite",red:"#virusRed_sprite",green:"#virusGreen_sprite", update:"#update_sprite",}

const containers = {corona:"#virusCorona_container", blue:"#virusBlue_container",red:"#virusRed_container",green:"#virusGreen_container", update:"#update_container",}

const animation = ["fastLeft1", "fastLeft2", "fastLeft3", "slowLeft1", "slowLeft2", "slowLeft3", "slowRight1", "slowRight2", "slowRight3", "fastRight1", "fastRight2", "fastRight3", "fastTop1", "fastTop2", "fastTop3", "slowTop1", "slowTop2", "slowTop3",];

const animationClick = ["falling", "zoom_out", "zoom_in", "spiral", "fallover"];

let currentAnimation = {corona:"", blue:"", red:"", green:"", update:"",}

function start() {
  console.log("JavaScript kører!");
    // Start animationer
    virusCorona.onLoad = randomVirusAnimation(containers.corona);
    virusBlue.onLoad = randomVirusAnimation(containers.blue);
    document.querySelector("#virusRed_container").onLoad = randomVirusAnimation(containers.red);
    document.querySelector("#virusGreen_container").onLoad = randomVirusAnimation(containers.green);
    document.querySelector("#update_container").onLoad = randomVirusAnimation(containers.update);

    // Registrer click
    document.querySelector("#virusCorona_container").addEventListener("click", function(){randomVirusClickAnimation(sprites.corona, containers.corona, currentAnimation.corona)});

    document.querySelector("#virusBlue_container").addEventListener("click", function(){randomVirusClickAnimation(sprites.blue, containers.blue, currentAnimation.blue)});

    document.querySelector("#virusRed_container").addEventListener("click", function(){randomVirusClickAnimation(sprites.red, containers.red, currentAnimation.red)});

    document.querySelector("#virusGreen_container").addEventListener("click", function(){randomVirusClickAnimation(sprites.green, containers.green, currentAnimation.green)});

    document.querySelector("#update_container").addEventListener("click", function(){randomVirusClickAnimation(sprites.update, containers.update, currentAnimation.update)});

//   document.querySelector("#virusRed_container").addEventListener("click", clickVirusBlue);
//   document.querySelector("#virusPink_container").addEventListener("click", clickVirusBlue);
}
function randomVirusAnimation(virus){
  /*****  random container animation*/
  let i = Math.floor( (Math.random() * animation.length));
  document.querySelector(virus).classList.add(animation[i]);

  currentAnimation.virus = animation[i];

  console.log("current random Animation:", currentAnimation.virus);
}

function randomVirusClickAnimation(sprite, container,){

  if (sprite == "#update_sprite"){
    decrementLives();
  } 
  else {
    incrementPoints()
  }

  document.querySelector(sprite).classList.add("paused");
  /*****  random clickAnimation */
  let i = Math.floor( (Math.random() * animationClick.length));
  document.querySelector(sprite).classList.add(animationClick[i]);

  console.log(animationClick[i])

  let click = animationClick[i];
  
  virusRestart(sprite, container, click);
}

// // general function to all restarts--NOT WORKING
function virusRestart(sprite, virus, animationClick) {
  console.log("virusRestart");
  // fjern event der bringer os herind
  document.querySelector(virus).removeEventListener("animationend", virusRestart);
  // fjern forsvind-animation
  document.querySelector(sprite).classList.remove(animationClick);
  console.log("remove", animationClick);
  // fjern pause  
  document.querySelector(virus).classList.remove("paused");
  console.log("remove paused")
  // genstart fastLeft animation
  document.querySelector(virus).classList.remove(currentAnimation.virus);
  console.log("old class = ", currentAnimation.virus)
  document.querySelector(virus).offsetWidth;
  document.querySelector(virus).classList.add(randomVirusAnimation(virus));
  console.log("new class added = ", currentAnimation.virus )
  // gør det muligt at klikke på igen
  document.querySelector(virus).addEventListener("animationend", randomVirusAnimation);
  console.log("add eventListener again on:", virus);
}
function decrementLives(){
  console.log("decrement");
  displayDecrementWindows();
  lives--;
  console.log(lives);
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
}

function decrementPoints(){
  console.log("decrementPoints");
  points--;
  displayPoints();
}

function displayPoints(){
  document.querySelector("#score").textContent = points;
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

  