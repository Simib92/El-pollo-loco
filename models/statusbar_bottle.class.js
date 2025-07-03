//Represents the bottle status bar

class StatusbarBottle extends StatusBar {

  //Array of image paths representing different bottle fill levels (0% to 100%) in green style
  IMAGES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
  ];

  percentage = 0;

  //Initializes position, size, loads the image assets, and sets the initial percentage to 0
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
