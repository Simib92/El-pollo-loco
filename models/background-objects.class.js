//Represents a background element in the game world

class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  //Constructs a `BackgroundObject` with a given image path and horizontal position
  //The vertical position is automatically calculated so the bottom aligns with the canvas
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
