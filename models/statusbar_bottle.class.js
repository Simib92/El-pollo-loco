/**
 * Represents the bottle status bar in the game.
 * Displays the bottle fill level using different images based on percentage.
 * Extends the generic StatusBar class.
 */
class StatusbarBottle extends StatusBar {
  IMAGES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
  ];

  percentage = 0;

  /**
   * Creates a new StatusbarBottle instance.
   * Sets position and size, loads images, and initializes percentage to 0.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 20;
    this.y = 84;
    this.width = 200;
    this.height = 60;
    this.setPercentage(0);
  }
}
