let canvas;
let world;
let keyboard = new Keyboard();
let fullscreenActivation = false;
let moveLeft = document.getElementById('move-left');
let moveRight = document.getElementById('move-right');
let jump = document.getElementById('jump');
let shoot = document.getElementById('shoot');
let soundOn = true;

function restartGame() {
    
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (world && world.gameEnd) {
        world.gameEnd = false;
        world = null;
    }
    //character = new Character();
    //character.energy = 100;
    initLevel();
    startGame();
}

function startGame() {
    document.getElementById('intro-img').classList.add('display_none');
    document.getElementById('canvas').classList.remove('display_none');
    document.getElementById('start-button').classList.add('display_none');
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);    
}

function stopGame() {
    document.getElementById('intro-img').classList.remove('display_none');
    document.getElementById('canvas').classList.add('display_none');
    document.getElementById('start-button').classList.remove('display_none');
}

/*
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);    
}*/

function soundOfforOn() {
    let button = document.getElementById('mute');
    if (soundOn) {
        button.innerHTML = /*html*/`
        <img src="img/playicons/mute.png" alt="">`;
    soundOn = false;
    } else {
        button.innerHTML = /*html*/`
        <img src="img/playicons/sound.png" alt="">`;
    soundOn = true;
    }
}

function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    if (!fullscreenActivation) {
        enterFullscreen(fullscreen);
    } else {
        exitFullscreen()
    }
}

function enterFullscreen(element) {
   if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) { // Safari
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {     // IE11 (veraltet)
    element.msRequestFullscreen();
  } else {
    console.warn("Fullscreen API is not supported");
  }
  fullscreenActivation = true;
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { // Safari
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {     // IE11
    document.msExitFullscreen();
  } else {
    console.warn("Fullscreen API is not supported");
  }
    fullscreenActivation = false;
}

window.addEventListener('keydown', (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if(e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if(e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if(e.keyCode == 38) {
        keyboard.UP = true;
    }

    if(e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if(e.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener('keyup', (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if(e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if(e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if(e.keyCode == 38) {
        keyboard.UP = false;
    }

    if(e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if(e.keyCode == 68) {
        keyboard.D = false;
    }
});

moveLeft.addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
});
moveLeft.addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
});
moveRight.addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
});
moveRight.addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
});
jump.addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
});
jump.addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
});
shoot.addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.D = true;
});
shoot.addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.D = false;
});