let canvas;
let world = null;
let keyboard = new Keyboard();
let fullscreenActivation = false;
let moveLeft = document.getElementById("move-left");
let moveRight = document.getElementById("move-right");
let jump = document.getElementById("jump");
let shoot = document.getElementById("shoot");
let soundOn = true;
let intervalIDs = [];

//Restarts the game by initializing the level and starting the game
function restartGame() {
  resetWorld();
  initLevel();
  startGame();
}

//Starts the game, hides the intro image and start button
function startGame() {
  document.getElementById("intro-img").classList.add("display_none");
  document.getElementById("main-button-container").classList.add("display_none");
  document.getElementById("canvas").classList.remove("display_none");
  activateTouchbar();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

//Stops the game, shows the intro image and start button,
//hides the game canvas, and clears the canvas context.
//Resets the game world instance.
function stopGame() {
  document.getElementById("intro-img").classList.remove("display_none");
  document.getElementById("canvas").classList.add("display_none");
  setStartButton();
  activateTouchbar();
  resetWorld();
}

function resetWorld() {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (world) {
    world.gameEnd = false;
    world = null;
  }
}

function setMainButtonsAfterGameEnd() {
  activateTouchbar();
  let buttonContainer = document.getElementById("main-button-container");
  buttonContainer.classList.remove("display_none");
  buttonContainer.innerHTML = /*html*/ `
    <img onclick="stopGame()" class="start-button" src="img/playicons/back.png" alt="">
    <img onclick="restartGame()" class="start-button" src="img/playicons/retry.png" alt="">
  `;
}

function setStartButton() {
  let buttonContainer = document.getElementById("main-button-container");
  buttonContainer.innerHTML = /*html*/ `
    <img id="start-button" onclick="restartGame()" class="start-button" src="img/playicons/play.png" alt="">
  `;
}

function isTouch() {
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const width = window.innerWidth;
  return isTouch && width >= 600 && width <= 1024;
}

function activateTouchbar() {
  if (isTouch()) {
    document.getElementById("button-bar").classList.toggle("button-bar");
    document.getElementById("button-bar").classList.toggle("display_none");
  }
}

//Executes a function repeatedly at given intervals and stores the interval ID
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIDs.push(id);
}

//Stops all intervals that were previously started
function stopIntervals() {
  intervalIDs.forEach(clearInterval);
  intervalIDs = [];
}

//Toggles the visibility of the info box
function openInfo() {
  let infoBox = document.getElementById("discription-box");
  infoBox.classList.toggle("discription-wrapper");
  infoBox.classList.toggle("info-box-mobil");
}

//Toggles the visibility of the touch control buttons
function activateTouchButtons() {
  let board = document.getElementById("tablet-buttons");
  board.classList.toggle("display_none");
  board.classList.toggle("button-bar-tablet");
}

//Toggles sound on/off and updates the sound button accordingly
function toggleSound() {
  let button = document.getElementById("mute");
  if (soundOn) {
    soundIsOff(button);
  } else {
    soundIsOn(button);
  }
  if (world) {
    //world.stopBackgroundMusic();
    world.backgroundMusic();
  }
}

//Loads sound state from localStorage and updates the sound button
function soundOfforOn() {
  let button = document.getElementById("mute");
  let currentsoundOnString = soundFromLocalStorage();
  if (currentsoundOnString !== null) soundOn = currentsoundOnString;
  if (!soundOn) soundIsOff(button);
  else soundIsOn(button);
  if (world) {
    world.stopBackgroundMusic();
    world.backgroundMusic();
  }
}

//Sets the sound button to "sound on" state and saves it
function soundIsOn(button) {
  button.innerHTML = /*html*/ `
        <img class="sound-img" src="img/playicons/sound.png" alt="">`;
  soundOn = true;
  soundToLocalStorage(soundOn);
}

//Sets the sound button to "sound off" state and saves it
function soundIsOff(button) {
  button.innerHTML = /*html*/ `
        <img class="sound-img" src="img/playicons/mute.png" alt="">`;
  soundOn = false;
  soundToLocalStorage(soundOn);
}

//Saves the sound state to localStorage
function soundToLocalStorage(soundOn) {
  localStorage.setItem("soundOn", JSON.stringify(soundOn));
}

//Retrieves the sound state from localStorage
function soundFromLocalStorage() {
  let currentsoundOnString = localStorage.getItem("soundOn");
  if (currentsoundOnString === null) return null;
  return JSON.parse(currentsoundOnString);
}

//Toggles fullscreen mode on or off
function fullscreen() {
  let fullscreen = document.getElementById("fullscreen");
  if (!fullscreenActivation) {
    enterFullscreen(fullscreen);
  } else {
    exitFullscreen();
  }
}

//Enters fullscreen mode for the given element
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    // Safari
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    // IE11 (veraltet)
    element.msRequestFullscreen();
  } else {
    console.warn("Fullscreen API is not supported");
  }
  fullscreenActivation = true;
}

//Exits fullscreen mode
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    // Safari
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    // IE11
    document.msExitFullscreen();
  } else {
    console.warn("Fullscreen API is not supported");
  }
  fullscreenActivation = false;
}

//Keydown event listener: sets keyboard flags on key press
window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }

  if (e.keyCode == 38) {
    keyboard.UP = true;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }

  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

//Keyup event listener: resets keyboard flags on key release
window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }

  if (e.keyCode == 38) {
    keyboard.UP = false;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }

  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});

//const moveLeftBtn = document.getElementById('move-left');
document.getElementById("move-left").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.LEFT = true;
});
document.getElementById("move-left").addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.LEFT = false;
});
document.getElementById("move-right").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.RIGHT = true;
});
document.getElementById("move-right").addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.RIGHT = false;
});
document.getElementById("jump").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.SPACE = true;
});
document.getElementById("jump").addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.SPACE = false;
});
document.getElementById("shoot").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.D = true;
});
document.getElementById("shoot").addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.D = false;
});
