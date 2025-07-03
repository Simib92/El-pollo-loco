//Represents the end screen display for the game

class EndDisplay extends DrawableObject {

  //Image shown when the player wins
  ENDIMAGE_WON = ["img/You won, you lost/You Won B.png"];

  //Image shown when the player loses
  ENDIMAGE_LOSE = ["img/You won, you lost/Game Over.png"];

  constructor() {
    super();
  }

  //Displays the "Game Over" image. Sets the image size and position
  loseAnimation() {
    this.x = 50;
    this.y = 50;
    this.width = 620;
    this.height = 380;
    this.loadImage(this.ENDIMAGE_LOSE);
  }

  //Displays the "You Won" image. Sets the image size and position
  winAnimation() {
    this.x = 50;
    this.y = 150;
    this.width = 620;
    this.height = 200;
    this.loadImage(this.ENDIMAGE_WON);
  }
}
