//Represents a small chicken enemy in the game

class SmallChicken extends MovableObject {
  energy = 100;
  type = "normal";

  //Array of image paths for the walking animation
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  //Array of image paths for the dead animation
  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  //Randomizes initial position and speed, and sets up animation intervals
  constructor(height, width, y) {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.y = y;
    this.height = height;
    this.width = width;
    this.x = 400 + Math.random() * 16000;
    this.speed = 0.15 + Math.random() * 0.5;
    setStoppableInterval(() => this.animateWalk(), 1000 / 60);
    setStoppableInterval(() => this.animateImg(), 200);
  }

  //Moves the chicken to the left if it is alive
  animateWalk() {
    if (this.energy > 1) this.moveLeft();
  }

  //Shows walking if alive, otherwise shows dead sprite
  animateImg() {
    if (this.energy > 1) this.playAnimation(this.IMAGES_WALKING);
    else this.playAnimation(this.IMAGES_DEAD);
  }
}
