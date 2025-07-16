/**
 * Represents a throwable bottle object in the game.
 * Handles bottle flight, rotation animation while in the air,
 * and splash animation upon breaking.
 * Extends MovableObject to include movement and gravity effects.
 */
class ThrowableObject extends MovableObject {
  IMAGES_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

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

  /**
   * Creates a throwable bottle instance at a specified position.
   * Loads rotation and splash images, sets size, and starts throw animation.
   * @param {number} x - Initial horizontal position of the bottle.
   * @param {number} y - Initial vertical position of the bottle.
   */
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

  /**
   * Initiates the throw by setting vertical speed and gravity.
   * Determines horizontal movement direction based on keyboard input.
   */
  trow() {
    this.speedY = 30;
    setStoppableInterval(() => this.applyGravity(), 1000 / 25);
    if (world.keyboard.LEFT)
      this.throwInterval = setInterval(() => this.bottleFlyleft(), 40);
    else this.throwInterval = setInterval(() => this.bottleFlyRight(), 40);
  }

  /** Moves the bottle left during flight */
  bottleFlyleft() {
    this.x -= 10;
  }

  /** Moves the bottle right during flight */
  bottleFlyRight() {
    this.x += 10;
  }

  /**
   * Animates the bottle.
   * Plays rotation animation while flying; switches to splash animation once broken.
   */
  animate() {
    if (!this.isBroke) this.playAnimation(this.IMAGES_ROTATION);
    else {
      clearInterval(this.throwInterval);
      this.playAnimation(this.IMAGES_SPLASH);
    }
  }

  /**
   * Triggers the bottle splash state, stopping all movement and switching animation.
   */
  splashBottle() {
    this.isBroke = true;
    this.speedY = 0;
    this.acceleration = 0;
  }
}
