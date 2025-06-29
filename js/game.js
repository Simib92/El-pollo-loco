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

function restartGame() {
  initLevel();
  startGame();
}

function startGame() {
  document.getElementById("intro-img").classList.add("display_none");
  document.getElementById("canvas").classList.remove("display_none");
  document.getElementById("start-button").classList.add("display_none");
  document.getElementById("mobil-button-bar").classList.remove("display_none");
  document.getElementById("mobil-button-bar").classList.add("button-bar");
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

function stopGame() {
  document.getElementById("intro-img").classList.remove("display_none");
  document.getElementById("canvas").classList.add("display_none");
  document.getElementById("start-button").classList.remove("display_none");
  document.getElementById("mobil-button-bar").classList.remove("button-bar");
  document.getElementById("mobil-button-bar").classList.add("display_none");
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (world) {
    world.gameEnd = false;
    world = null;
  }
}

function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIDs.push(id);
}

function stopIntervals() {
  intervalIDs.forEach(clearInterval);
  intervalIDs = [];
}

function openInfo() {
  let infoBox = document.getElementById("discription-box");
  infoBox.classList.toggle("discription-wrapper");
  infoBox.classList.toggle("info-box-mobil");
}

function activateTouchButtons() {
  let board = document.getElementById("tablet-buttons");
  board.classList.toggle("display_none");
  board.classList.toggle("button-bar-tablet");
}

function toggleSound() {
  let button = document.getElementById("mute");
  if (soundOn) {
    soundIsOff(button);
  } else {
    soundIsOn(button);
  }
  if (world) {
    world.stopBackgroundMusic();
    world.backgroundMusic();
  }
}

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

function soundIsOn(button) {
  button.innerHTML = /*html*/ `
        <img class="sound-img" src="img/playicons/sound.png" alt="">`;
  soundOn = true;
  soundToLocalStorage(soundOn);
}

function soundIsOff(button) {
  button.innerHTML = /*html*/ `
        <img class="sound-img" src="img/playicons/mute.png" alt="">`;
  soundOn = false;
  soundToLocalStorage(soundOn);
}

function soundToLocalStorage(soundOn) {
  localStorage.setItem("soundOn", JSON.stringify(soundOn));
}

function soundFromLocalStorage() {
  let currentsoundOnString = localStorage.getItem("soundOn");
  if (currentsoundOnString === null) return null;
  return JSON.parse(currentsoundOnString);
}

function fullscreen() {
  let fullscreen = document.getElementById("fullscreen");
  if (!fullscreenActivation) {
    enterFullscreen(fullscreen);
  } else {
    exitFullscreen();
  }
}

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
