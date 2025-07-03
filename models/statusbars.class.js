//Represents a generic status bar (e.g., health, coins, bottles) in the game UI

class StatusBar extends DrawableObject {
  percentage;
  IMAGES = [];

  //Sets the percentage for the status bar and updates the displayed image accordingly
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImagesIndex()];
    this.img = this.imageCache[path];
  }

  //Determines which image index should be shown based on the current percentage
  resolveImagesIndex() {
    if (this.percentage >= 100) return 5;
    else if (this.percentage > 75) return 4;
    else if (this.percentage > 50) return 3;
    else if (this.percentage > 25) return 2;
    else if (this.percentage > 1) return 1;
    else return 0;
  }
}
