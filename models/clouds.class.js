//Represents a background cloud object in the game

class Cloud extends MovableObject {
  y = 20;
  width = 500;
  height = 250;

  //Creates a new Cloud instance at a random horizontal position
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");

    this.x = Math.random() * 15000;
    this.animate();
  }

  //Causes the cloud to move slowly to the left
  animate() {
    this.moveLeft();
  }
}
