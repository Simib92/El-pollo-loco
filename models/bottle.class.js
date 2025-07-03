//Represents a salsa bottle collectible in the game

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

  //Constructs a bottle object, positions it randomly, loads its images, and starts animation and boundary-check intervals.
  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.loadImages(this.IMAGES_BOTTLE);
    this.x = 200 + Math.random() * 15000;
    setStoppableInterval(() => this.animate(), 500);
    setStoppableInterval(() => this.checkIfBottleIsInMap(), 500);
  }

  //Animates the bottle using its available sprite frames
  animate() {
    this.playAnimation(this.IMAGES_BOTTLE);
  }

  //Checks whether the bottle is still within the visible level
  //If outside the level's end, it is removed from the map and remaining bottles are re-checked
  checkIfBottleIsInMap() {
    if (this.x > world.level_end_x) {
      this.spliceColectable(this);
      checkRemainingBottles();
    }
  }
}
