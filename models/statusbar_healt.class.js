/**
 * Represents the health status bar of the main character.
 * Displays the character's current health visually using a set of images that correspond to different health percentages.
 * Extends the generic StatusBar class.
 */
class StatusbarHealt extends StatusBar {
  healt;

  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png",
  ];

  percentage = 100;

  /**
   * Creates a new health status bar instance.
   * Sets position, size, loads health images, and initializes at full health.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 20;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }
}
