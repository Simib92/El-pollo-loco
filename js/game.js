let canvas;
let world;
let keyboard = new Keyboard();
let fullscreenActivation = false;

function restartGame() {
    if (world) {
        world.stopIntervals();
        world = null;
    }
    startGame();
}

function startGame() {
    document.getElementById('intro-img').classList.add('display_none');
    document.getElementById('canvas').classList.remove('display_none');
    initLevel();
    world = new World(document.getElementById('canvas'), keyboard);    
}

function stopGame() {
    document.getElementById('intro-img').classList.add('display_none');
    document.getElementById('canvas').classList.add('display_none');
    document.getElementById('intro-img').classList.add('display_none');
}

/*
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);    
}*/

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