"use strict"

window.addEventListener("load", start);

let points = 0;
let lives = 3; 
let virusArr = ["Blue", "Green", "Red", "Corona"];

function start() {
  console.log("JavaScript kører!");
    // Start animationer
    document.querySelector("#virusCorona_container").classList.add("fastLeft");
    document.querySelector("#virusBlue_container").classList.add("fastLeft");
    document.querySelector("#update_container").classList.add("slowLeft");

    // Registrer click
    document.querySelector("#virusCorona_container").addEventListener("click", clickVirusCorona);
    document.querySelector("#update_container").addEventListener("click", clickUpdate);
    document.querySelector("#virusBlue_container").addEventListener("click", clickVirusBlue);
//   document.querySelector("#virusRed_container").addEventListener("click", clickVirusBlue);
//   document.querySelector("#virusPink_container").addEventListener("click", clickVirusBlue);
}
function clickVirusCorona() {
    console.log("Click Virus corona");
    // Forhindr gentagne clicks
    document.querySelector("#virusCorona_container").removeEventListener("click", clickVirusCorona);
    
    // Stop coin container
    document.querySelector("#virusCorona_container").classList.add("paused");
  
    // sæt forsvind-animation på coin
    document.querySelector("#virusCorona_sprite").classList.add("zoom_out");
  
    // når forsvind-animation er færdig
    document.querySelector("#virusCorona_container").addEventListener("animationend", virusGoneZoomOut);
    
    incrementPoints();
  }

  function virusGoneZoomOut() {
    // fjern event der bringer os herind
    document.querySelector("#virusCorona_container").removeEventListener("animationend", virusGoneZoomOut);
  
    // fjern forsvind-animation
    document.querySelector("#virusCorona_sprite").classList.remove("zoom_out");
    
    // fjern pause
    document.querySelector("#virusCorona_container").classList.remove("paused");
  
    // genstart fastLeft animation
    document.querySelector("#virusCorona_container").classList.remove("fastLeft");
    document.querySelector("#virusCorona_container").offsetWidth;
    document.querySelector("#virusCorona_container").classList.add("fastLeft");
  
    // gør det muligt at klikke på coin igen
    document.querySelector("#virusCorona_container").addEventListener("click", clickVirusCorona);  
  }

  function clickUpdate() {
    console.log("Click heart");
    // Forhindr gentagne clicks
    document.querySelector("#update_container").removeEventListener("click", clickUpdate);
    
    // Stop coin container
    document.querySelector("#update_container").classList.add("paused");
  
    // sæt forsvind-animation på coin
    document.querySelector("#update_sprite").classList.add("zoom_out");
  
    // når forsvind-animation er færdig: coinGone
    document.querySelector("#update_container").addEventListener("animationend", updateGone);
    
    incrementLives();
  }

  function updateGone() {
    console.log("updateReset")
    // fjern event der bringer os herind
    document.querySelector("#update_container").removeEventListener("animationend", updateGone);
  
    // fjern forsvind-animation
    document.querySelector("#update_sprite").classList.remove("zoom_out");
    
    // fjern pause
    document.querySelector("#update_container").classList.remove("paused");
  
    // genstart slowLeft animation
    document.querySelector("#update_container").classList.remove("slowLeft");
    document.querySelector("#update_container").offsetWidth;
    document.querySelector("#update_container").classList.add("slowLeft");
  
    // gør det muligt at klikke på coin igen
    document.querySelector("#update_container").addEventListener("click", clickUpdate);
  }

  function clickVirusBlue() {
    console.log("Click blue");
    // Forhindr gentagne clicks
    document.querySelector("#virusBlue_container").removeEventListener("click", clickVirusBlue);
    
    // Stop coin container
    document.querySelector("#virusBlue_container").classList.add("paused");
  
    // sæt forsvind-animation på coin
    document.querySelector("#virusBlue_sprite").classList.add("zoom_in");
  
    // når forsvind-animation er færdig: coinGone
    document.querySelector("#virusBlue_container").addEventListener("animationend", function() {virusGoneZoomIn( virusArr[0]) });
    decrementLives();
  }
  
  function virusGoneZoomIn(virusArr) {
    console.log("virusGONE")
    // fjern event der bringer os herind
    document.querySelector(`#virus${color}_container`).removeEventListener("animationend", `clickVirus${color}`);
  
    // fjern forsvind-animation
    document.querySelector(`#virus${color}_sprite`).classList.remove("zoom_in");
    
    // fjern pause
    document.querySelector(`#virus${color}_container`).classList.remove("paused");
  
    // genstart falling animation
    // document.querySelector(`#virus${color}_container`).classList.remove("fastLeft");
    // document.querySelector(`#virus${color}_container`).offsetWidth;
    // document.querySelector(`#virus${color}_container`).classList.add("fastLeft");
  
    // gør det muligt at klikke på coin igen
    document.querySelector(`#virus${color}_container`).addEventListener("click", `clickVirus${color}`);
  }
  function decrementLives(){
    console.log("decrement");
    displayDecrementHeart();
    lives--;
    console.log(lives);
  }

  function incrementLives(){
    console.log("increment");
    lives++;
    console.log(lives);
    displayIncrementHeart();
  }
  
  function displayDecrementHeart(){
    console.log(points, lives)
    console.log("displayDecrementHeart");
    document.querySelector(`#health${lives}`).classList.remove("active_heart");
    document.querySelector(`#health${lives}`).classList.add("broken_heart");
  }

  function displayIncrementHeart(){
    console.log(points, lives)
    console.log("displayIncrementHeart");
    document.querySelector(`#health${lives}`).classList.remove("broken_heart");
    document.querySelector(`#health${lives}`).classList.add("active_heart");
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
  