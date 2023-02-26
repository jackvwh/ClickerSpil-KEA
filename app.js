// git@github.com:jackvwh/ClickerSpil-kea.git

"use strict"

const WON = 10;
let points = 0;
let lives = 3;

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

// object key varibles to create object key/value pairs
const corona = "corona";
const corona2 = "corona2";
const blue = "blue";
const blue2 = "blue2";
const red = "red";
const red2 = "red2";
const green = "green";
const green2 = "green2";
const pink = "pink";
const pink2 = "pink2";
const yellow = "yellow";
const yellow2 = "yellow2";
const yellow3 = "yellow3";
const update = "update";
const update2 = "update2";
const update3 = "update3";

// Game elements
const container = {corona:"#virusCorona_container", corona2:"#virusCorona2_container", blue:"#virusBlue_container", blue2:"#virusBlue2_container",red:"#virusRed_container", red2:"#virusRed2_container", green:"#virusGreen_container", green2:"#virusGreen2_container", pink:"#virusPink_container", pink2:"#virusPink2_container", yellow:"#virusYellow_container", yellow2:"#virusYellow2_container", yellow3:"#virusYellow3_container", update:"#update_container", update2:"#update2_container", update3:"#update3_container"};
const sprites = {corona:"#virusCorona_sprite", corona2:"#virusCorona2_sprite", blue:"#virusBlue_sprite", blue2:"#virusBlue2_sprite", red:"#virusRed_sprite", red2:"#virusRed2_sprite",green:"#virusGreen_sprite", green2:"#virusGreen2_sprite", pink:"#virusPink_sprite", pink2:"#virusPink2_sprite",yellow:"#virusYellow_sprite", yellow2:"#virusYellow2_sprite", yellow3:"#virusYellow3_sprite",update:"#update_sprite", update2:"#update2_sprite", update3:"#update3_sprite"};

// Animations
const animation = ["right", "left", "top"];
const clickAnimation = ["falling", "zoom_out", "zoom_in", "spiral", "fallover", "fade_out", "beam", ];
// empty object array for storing current animations
let currentAnimation = {};

window.addEventListener("load", start);

function start() {
  console.log("APP.JS kører!");
    // Start animationer
    randomVirusAnimation(container.corona ,corona);
    randomVirusAnimation(container.corona2,corona2);
    randomVirusAnimation(container.blue, blue);
    randomVirusAnimation(container.blue2, blue2);
    randomVirusAnimation(container.red, red);
    randomVirusAnimation(container.red2, red2);
    randomVirusAnimation(container.green, green);
    randomVirusAnimation(container.green2, green2);
    randomVirusAnimation(container.pink, pink);
    randomVirusAnimation(container.pink2, pink2);
    randomVirusAnimation(container.yellow, yellow);
    randomVirusAnimation(container.yellow2, yellow2);
    randomVirusAnimation(container.yellow3, yellow3);
    randomVirusAnimation(container.update, update);
    randomVirusAnimation(container.update2, update2);
    randomVirusAnimation(container.update3, update3);

    // Registrer click og kald vilkårlig animation til element og gem i object currentAnimation
    virusCorona.addEventListener("click", function(){randomVirusClickAnimation(sprites.corona, container.corona, corona)});
    virusCorona2.addEventListener("click", function(){randomVirusClickAnimation(sprites.corona2, container.corona2, corona2)});
    virusBlue.addEventListener("click", function(){randomVirusClickAnimation(sprites.blue, container.blue, blue)});
    virusBlue2.addEventListener("click", function(){randomVirusClickAnimation(sprites.blue2, container.blue2, blue2)});
    virusRed.addEventListener("click", function(){randomVirusClickAnimation(sprites.red, container.red, red)});
    virusRed2.addEventListener("click", function(){randomVirusClickAnimation(sprites.red2, container.red2, red2)});
    virusGreen.addEventListener("click", function(){randomVirusClickAnimation(sprites.green, container.green, green)});
    virusGreen2.addEventListener("click", function(){randomVirusClickAnimation(sprites.green2, container.green2, green2)});
    virusPink.addEventListener("click", function(){randomVirusClickAnimation(sprites.pink, container.pink, pink)});
    virusPink2.addEventListener("click", function(){randomVirusClickAnimation(sprites.pink2, container.pink2, pink2)});
    virusYellow.addEventListener("click", function(){randomVirusClickAnimation(sprites.yellow, container.yellow, yellow)});
    virusYellow2.addEventListener("click", function(){randomVirusClickAnimation(sprites.yellow2, container.yellow2, yellow2)});
    virusYellow3.addEventListener("click", function(){randomVirusClickAnimation(sprites.yellow3, container.yellow3, yellow3)});
    virusUpdate.addEventListener("click", function(){randomVirusClickAnimation(sprites.update, container.update, update)});
    virusUpdate2.addEventListener("click", function(){randomVirusClickAnimation(sprites.update2, container.update2, update2)});
    virusUpdate3.addEventListener("click", function(){randomVirusClickAnimation(sprites.update3, container.update3, update3)});
}
// random animation 
function randomVirusAnimation(container, current){
  console.log("Animation being ADDED");
  /*****  random container animation*/
  let i = Math.floor( (Math.random() * animation.length));
  document.querySelector(container).classList.add(animation[i]);
  currentAnimation[current] = animation[i];
  console.log("saved " + animation[i] + " in currentAnimation Object key: " + current);
  console.log(currentAnimation);

  // random start position and speed selecting
  console.log("Start position and animation-duration being ADDED");

  if ( animation[i] === "top"){
    // create values for CSS properties
    let startTop = Math.floor( (Math.random() * 65) + 30);
    let aniDuration = Math.floor( (Math.random() * 23) + 3);
    console.log("Style.left: " + startTop + " animation-duration: " + aniDuration);
    // add/change CSS properties 
    document.querySelector(container).style.left = (startTop + "%");
    document.querySelector(container).style.animationDuration = (aniDuration + "s");
  }
  else {
    // create values for CSS attributes
    let startSide = Math.floor( (Math.random() * 80) + 45);
    let aniDuration = Math.floor( (Math.random() * 23) + 3);
    console.log("Style.top: " + startSide + " animation-duration: " + aniDuration);
    // add/change CSS attributes
    document.querySelector(container).style.top = (startSide + "%");
    document.querySelector(container).style.animationDuration = (aniDuration + "s");
  }
  return;
}
// random CLICK ANIMATION
function randomVirusClickAnimation(sprite, container, current){
  console.log("CLICK animation");
  // fjern click
  document.querySelector(container).removeEventListener("click", function() {randomVirusClickAnimation(sprites.current, container.current, current)});
  // Pause animation
  document.querySelector(container).classList.add("paused");
  /*****  random clickAnimation */
  let i = Math.floor( (Math.random() * clickAnimation.length));
  // Adding CLICK animation to element
  document.querySelector(sprite).classList.add(clickAnimation[i]);
  console.log("Added CLICK animation: ", clickAnimation[i] + " -> To sprite: " + sprite)
  
  // 
  document.querySelector(sprite).addEventListener("animationend", function() {virusRestart(sprite, container, clickAnimation[i], current)});

  // check for lives decrement 
  if (sprite === "#update_sprite" || sprite === "#update2_sprite" || sprite === "#update3_sprite"){
    decrementLives();
  } 
  else {
    incrementPoints();
  }
}

// // general function to all animation restarts
function virusRestart(sprite, container, clickAnimation, current) {
  console.log("virusRestart");
  // fjern event der bringer os herind
  document.querySelector(sprite).removeEventListener("animationend", function(){virusRestart(sprite, container, clickAnimation, current)});
  // fjern CLICK animation
  document.querySelector(sprite).classList.remove(clickAnimation);
  console.log("remove Click animation->", clickAnimation);
  // fjern pause  
  document.querySelector(container).classList.remove("paused");
  console.log("remove paused animation");
  // remove animation
  document.querySelector(container).classList.remove(currentAnimation[current]);
  // remove CSS attribute
  document.querySelector(container).removeAttribute("style");
  // genstart animation
  document.querySelector(container).classList.remove(currentAnimation[current]);
  console.log("remove current class = " + currentAnimation[current] + " from " + container );
  // force reflow
  document.querySelector(container).offsetWidth;
  console.log("Reflow element: " + container);
  // Add new animation
  randomVirusAnimation(container, current);
  console.log("New random class added = ", currentAnimation[current] + " to " + container);

  // gør det muligt at klikke på container igen
  // document.querySelector(container).addEventListener("click", function() {randomVirusClickAnimation(sprites.current, container.current, current);});
  
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
    virusCorona.removeEventListener("click", function(){randomVirusClickAnimation(sprites.corona, container.corona, corona)});
    virusCorona2.removeEventListener("click", function(){randomVirusClickAnimation(sprites.corona2, container.corona2, corona2)});
    virusBlue.removeEventListener("click", function(){randomVirusClickAnimation(sprites.blue, container.blue, blue)});
    virusBlue2.removeEventListener("click", function(){randomVirusClickAnimation(sprites.blue2, container[blue2], blue2)});
    virusRed.removeEventListener("click", function(){randomVirusClickAnimation(sprites[red], container[red], red)});
    virusRed2.removeEventListener("click", function(){randomVirusClickAnimation(sprites[red2], container[red2], red2)});
    virusGreen.removeEventListener("click", function(){randomVirusClickAnimation(sprites[green], container[green], green)});
    virusGreen2.removeEventListener("click", function(){randomVirusClickAnimation(sprites[green2], container[green2], green2)});
    virusPink.removeEventListener("click", function(){randomVirusClickAnimation(sprites[pink], container[pink], pink)});
    virusPink2.removeEventListener("click", function(){randomVirusClickAnimation(sprites[pink2], container[pink2], pink2)});
    virusYellow.removeEventListener("click", function(){randomVirusClickAnimation(sprites[yellow], container[yellow], yellow)});
    virusYellow2.removeEventListener("click", function(){randomVirusClickAnimation(sprites[yellow2], container[yellow2], yellow2)});
    virusYellow3.removeEventListener("click", function(){randomVirusClickAnimation(sprites[yellow3], container[yellow3], yellow3)});
    virusUpdate.removeEventListener("click", function(){randomVirusClickAnimation(sprites[update], container[update], update)});
    virusUpdate2.removeEventListener("click", function(){randomVirusClickAnimation(sprites[update2], container[update2], update2)});
    virusUpdate3.removeEventListener("click", function(){randomVirusClickAnimation(sprites[update3], container[update3], update3)});
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

  