/**
 * Represents a generic status bar in the game UI, such as health, coins, or bottles.
 * Displays a visual representation based on the current percentage value.
 * Extends DrawableObject to leverage image rendering capabilities.
 */
class StatusBar extends DrawableObject {
  percentage;
  IMAGES = [];

  /**
   * Sets the current percentage of the status bar and updates the displayed image accordingly.
   * @param {number} percentage - The new fill percentage (expected range: 0 to 100)
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImagesIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the appropriate image index to represent the current percentage.
   * Maps percentage ranges to discrete image indices (0 to 5).
   * @returns {number} The index of the image to display based on the current percentage.
   */
  resolveImagesIndex() {
    if (this.percentage >= 100) return 5;
    else if (this.percentage > 75) return 4;
    else if (this.percentage > 50) return 3;
    else if (this.percentage > 25) return 2;
    else if (this.percentage > 1) return 1;
    else return 0;
  }
}
