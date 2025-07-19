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

/**
 * Restarts the game by resetting the world, initializing the level, and starting the game.
 */
function restartGame() {
  resetWorld();
  initLevel();
  startGame();
}

/**
 * Starts the game by hiding the intro screen, showing the canvas, and initializing the world.
 */
function startGame() {
  document.getElementById("intro-img").classList.add("display_none");
  document.getElementById("main-button-container").classList.add("display_none");
  document.getElementById("canvas").classList.remove("display_none");
  activateTouchbar();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

/**
 * Stops the game and shows the intro screen. Resets the world and main buttons.
 */
function stopGame() {
  document.getElementById("intro-img").classList.remove("display_none");
  document.getElementById("canvas").classList.add("display_none");
  setStartButton();
  resetWorld();
}

/**
 * Clears the canvas and resets the world instance.
 */
function resetWorld() {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (world) {
    world.gameEnd = false;
    world = null;
  }
}

/**
 * Displays the back and retry buttons after the game ends.
 */
function setMainButtonsAfterGameEnd() {
  deactivateTouchbar();
  let buttonContainer = document.getElementById("main-button-container");
  buttonContainer.classList.remove("display_none");
  buttonContainer.innerHTML = /*html*/ `
    <img onclick="stopGame()" class="start-button" src="img/playicons/back.png" alt="">
    <img onclick="restartGame()" class="start-button" src="img/playicons/retry.png" alt="">
  `;
}

/**
 * Displays the start button in the main menu.
 */
function setStartButton() {
  let buttonContainer = document.getElementById("main-button-container");
  buttonContainer.innerHTML = /*html*/ `
    <img id="start-button" onclick="restartGame()" class="start-button" src="img/playicons/play.png" alt="">
  `;
}

/**
 * Checks if the current device is a touchscreen within a specific screen width range.
 * @returns {boolean} True if it's a touch device within bounds, otherwise false.
 */
function isTouch() {
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  //const width = window.innerWidth;
  return isTouch //&& width >= 600 && width <= 1024;
}

/**
 * Toggles the visibility of the on-screen touch button bar.
 */
function activateTouchbar() {
  if (isTouch()) {
    document.getElementById("button-bar").classList.add("button-bar");
    document.getElementById("button-bar").classList.remove("display_none");
  }
}

function deactivateTouchbar() {
  if (isTouch()) {
    document.getElementById("button-bar").classList.remove("button-bar");
    document.getElementById("button-bar").classList.add("display_none");
  }
}

/**
 * Runs a function repeatedly and stores the interval ID.
 * @param {Function} fn - Function to execute.
 * @param {number} time - Interval time in milliseconds.
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIDs.push(id);
}

/**
 * Stops all active intervals and clears their IDs.
 */
function stopIntervals() {
  intervalIDs.forEach(clearInterval);
  intervalIDs = [];
}

/**
 * Toggles the visibility of the info box.
 */
function openInfo() {
  let infoBox = document.getElementById("discription-box");
  infoBox.classList.toggle("discription-wrapper");
  infoBox.classList.toggle("info-box-mobil");
}

/**
 * Shows or hides the on-screen tablet touch controls.
 */
function activateTouchButtons() {
  let board = document.getElementById("tablet-buttons");
  board.classList.toggle("display_none");
  board.classList.toggle("button-bar-tablet");
}

/**
 * Toggles the game sound on or off and updates the button icon.
 */
function toggleSound() {
  let button = document.getElementById("mute");
  if (soundOn) {
    soundIsOff(button);
  } else {
    soundIsOn(button);
  }
  if (world) {
    world.backgroundMusic();
  }
}

/**
 * Loads the saved sound state from localStorage and applies it.
 */
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

/**
 * Sets the sound to ON, updates the icon, and saves the state.
 * @param {HTMLElement} button - The sound toggle button element.
 */
function soundIsOn(button) {
  button.innerHTML = /*html*/ `
        <img class="sound-img" src="img/playicons/sound.png" alt="">`;
  soundOn = true;
  soundToLocalStorage(soundOn);
}

/**
 * Sets the sound to OFF, updates the icon, and saves the state.
 * @param {HTMLElement} button - The sound toggle button element.
 */
function soundIsOff(button) {
  button.innerHTML = /*html*/ `
        <img class="sound-img" src="img/playicons/mute.png" alt="">`;
  soundOn = false;
  soundToLocalStorage(soundOn);
}

/**
 * Saves the current sound state to localStorage.
 * @param {boolean} soundOn - Whether the sound is on.
 */
function soundToLocalStorage(soundOn) {
  localStorage.setItem("soundOn", JSON.stringify(soundOn));
}

/**
 * Retrieves the saved sound state from localStorage.
 * @returns {boolean|null} The saved state or null if not found.
 */
function soundFromLocalStorage() {
  let currentsoundOnString = localStorage.getItem("soundOn");
  if (currentsoundOnString === null) return null;
  return JSON.parse(currentsoundOnString);
}

/**
 * Toggles fullscreen mode on or off.
 */
function fullscreen() {
  let fullscreen = document.getElementById("fullscreen");
  if (!fullscreenActivation) {
    enterFullscreen(fullscreen);
  } else {
    exitFullscreen();
  }
}

/**
 * Requests fullscreen mode for a given element.
 * @param {HTMLElement} element - The element to go fullscreen.
 */
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

/**
 * Exits fullscreen mode.
 */
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

/**
 * Handles keydown events to control player movement and actions.
 */
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

/**
 * Handles keyup events to stop player movement or actions.
 */
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

/**
 * Disables movement when touch start and ends.
 */
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
