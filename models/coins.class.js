//Represents a collectible coin object in the game

class Coin extends Colectables {
  height = 120;
  width = 120;
  y = 330;
  type = "coin";

  //Array of image paths for coin animation
  IMAGES_COIN = [
    "img/8_coin/coin_1.png", 
    "img/8_coin/coin_2.png"
  ];

  //Creates a new Coin instance at a randomized position. Loads coin images and starts animation.
  constructor() {
    super().loadImage("img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_COIN);
    this.x = 200 + Math.random() * 15000;
    this.y = 330 + Math.random() * -300;
    setStoppableInterval(() => this.animate(), 500);
  }

  //Handles animation by looping through coin image frames
  animate() {
    this.playAnimation(this.IMAGES_COIN);
  }
}
