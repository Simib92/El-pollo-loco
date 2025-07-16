/**
 * Represents a standard enemy chicken in the game.
 *
 * Chickens either walk on the ground or fall from above (e.g., spawned by the Endboss).
 */
class Chicken extends MovableObject {
  energy = 100;
  type = "normal";
  falling;

  //Walking animation image paths
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  //Image path for the dead chicken
  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  /**
   * Creates a new Chicken enemy.
   *
   * @param {number} height - The height of the chicken.
   * @param {number} width - The width of the chicken.
   * @param {number} y - The initial y-position of the chicken.
   * @param {number} x - The initial x-position of the chicken.
   * @param {boolean} falling - If true, the chicken will fall from the sky.
   */
  constructor(height, width, y, x, falling) {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.y = y;
    this.height = height;
    this.width = width;
    this.falling = falling;
    this.x = x;
    this.speed = 0.15 + Math.random() * 0.5;
    setStoppableInterval(() => this.animateWalk(), 1000 / 60);
    setStoppableInterval(() => this.animateImg(), 200);
    if (this.falling) {
      this.y = -10;
      this.x = x - Math.random() * 60;
      this.speed = 0.22 + Math.random() * 10;
      setStoppableInterval(() => this.chickenFalling(), 1000 / 60);
    }
  }

  /**
   * Moves the chicken to the left if it is alive.
   */
  animateWalk() {
    if (this.energy > 1) this.moveLeft();
  }

  /**
   * Plays walking or death animation depending on the chicken's health.
   */
  animateImg() {
    if (this.energy > 1) this.playAnimation(this.IMAGES_WALKING);
    else this.playAnimation(this.IMAGES_DEAD);
  }

  /**
   * Applies falling behavior for chickens spawned by the Endboss.
   * Includes both downward and horizontal movement.
   */
  chickenFalling() {
    if (this.isChickenOnTheGround() || this.speedY > 0)
      this.y -= this.speedY * 0.75;
    this.speedY -= this.acceleration;
    this.x -= 2;
  }

  /**
   * Checks whether the chicken has landed on the ground.
   *
   * @returns {boolean} True if the chicken is on the ground.
   */
  isChickenOnTheGround() {
    return this.y <= 330;
  }
}
