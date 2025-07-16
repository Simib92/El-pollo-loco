/**
 * Represents a salsa bottle collectible in the game.
 * This item can be collected by the player and features simple animation.
 * Inherits from `Colectables`.
 *
 * @class Bottle
 * @extends Colectables
 */
class Bottle extends Colectables {
  type = "bottle";
  width = 70;
  height = 110;
  y = 330;

  //List of bottle image frames for animation
  IMAGES_BOTTLE = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  /**
   * Constructs a new `Bottle` instance.
   * - Loads the initial image and animation frames.
   * - Randomly positions the bottle horizontally.
   * - Starts two stoppable intervals for animation and map boundary checking.
   *
   * @constructor
   */
  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.loadImages(this.IMAGES_BOTTLE);
    this.x = 200 + Math.random() * 15000;
    setStoppableInterval(() => this.animate(), 500);
    setStoppableInterval(() => this.checkIfBottleIsInMap(), 500);
  }

  /**
   * Animates the bottle using its image frames.
   */
  animate() {
    this.playAnimation(this.IMAGES_BOTTLE);
  }

  /**
   * Checks whether the bottle is still within the visible map bounds.
   * If it's beyond the end of the level, it is removed and remaining bottles are rechecked.
   */
  checkIfBottleIsInMap() {
    if (this.x > world.level_end_x) {
      this.spliceColectable(this);
      checkRemainingBottles();
    }
  }
}
