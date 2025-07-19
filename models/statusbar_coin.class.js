/**
 * Represents the coin collection status bar in the game.
 * Displays the coin collection progress using different images based on percentage.
 * Extends the generic StatusBar class.
 */
class StatusbarCoin extends StatusBar {
  IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  percentage = 0;
  coinCount = 0;

  /**
   * Creates a new StatusbarCoin instance.
   * Sets position and size, loads images, and initializes percentage to 0.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 20;
    this.y = 42;
    this.width = 200;
    this.height = 60;
    this.setPercentage(0);
  }


/**
   * Sets the number of collected coins and updates percentage.
   * @param {number} count - Number of coins collected.
   */
  setCoinCount(count) {
    this.coinCount = count;
    this.setPercentage(count);
  }

  /**
   * Draws the status bar and coin count as text.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    super.draw(ctx);

    ctx.font = "24px Arial";
    ctx.fillStyle = "#000000ff";
    ctx.textAlign = "left";
    ctx.fillText(`${this.coinCount}`, this.x + 100, this.y + 48);
  }
}