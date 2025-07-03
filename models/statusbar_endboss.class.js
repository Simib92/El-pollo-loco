//Represents the health status bar for the endboss

class StatusbarHealtEndboss extends StatusBar {

  //Array of image paths representing different health levels (0% to 100%) in blue style for the endboss
  IMAGES = [
    "img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
  ];

  percentage = 100;

  //Initializes position, size, loads images, and sets default percentage
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 500;
    this.y = 10;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  //Resets and displays the endboss health status bar with full health
  showStatusbarEndboss() {
    this.loadImages(this.IMAGES);
    this.setPercentage(100);
  }
}
