//Represents a throwable bottle object in the game

class ThrowableObject extends MovableObject {
  
  //Images used for bottle rotation animation
  IMAGES_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  //Images used for bottle splash animation after it breaks
  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  isBroke = false;
  throwInterval;

  //Creates a new throwable bottle at the given position
  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 100;
    this.width = 60;
    this.trow();
    setStoppableInterval(() => this.animate(), 40);
  }

  //Starts the throw animation and flight movement based on keyboard direction
  trow() {
    this.speedY = 30;
    setStoppableInterval(() => this.applyGravity(), 1000 / 25);
    if (world.keyboard.LEFT)
      this.throwInterval = setInterval(() => this.bottleFlyleft(), 40);
    else this.throwInterval = setInterval(() => this.bottleFlyRight(), 40);
  }

  //Moves the bottle to the left during flight
  bottleFlyleft() {
    this.x -= 10;
  }

  //Moves the bottle to the right during flight
  bottleFlyRight() {
    this.x += 10;
  }

  //Plays rotation animation in flight and splash animation when broken
  animate() {
    if (!this.isBroke) this.playAnimation(this.IMAGES_ROTATION);
    else {
      clearInterval(this.throwInterval);
      this.playAnimation(this.IMAGES_SPLASH);
    }
  }

  //Triggers the splash state: stops movement and switches to splash animation
  splashBottle() {
    this.isBroke = true;
    this.speedY = 0;
    this.acceleration = 0;
  }
}
