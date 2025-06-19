class Chicken extends MovableObject {
  energy = 100;
  type = "normal";


  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  constructor(height, width, y, x) {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.y = y;
    this.height = height;
    this.width = width;
    this.x = x
    this.speed = 0.15 + Math.random() * 0.5;
    setStoppableInterval(() => this.animateWalk(), 1000 / 60);
    setStoppableInterval(() => this.animateImg(), 200);
  }

  animateWalk() {
    if (this.energy > 1) {
      this.moveLeft();
    }
  }

  animateImg() {
    if (this.energy > 1) {
      this.playAnimation(this.IMAGES_WALKING);
    } else {
      this.playAnimation(this.IMAGES_DEAD);
    }
  }
}
