class Bottle extends Colectables {
  type = "bottle";
  width = 70;
  height = 110;
  y = 330;

  IMAGES_BOTTLE = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.loadImages(this.IMAGES_BOTTLE);
    this.x = 200 + Math.random() * 15000;
    setStoppableInterval(() => this.animate(), 500);
    setStoppableInterval(() => this.checkIfBottleIsInMap(), 500);
  }

  animate() {
    this.playAnimation(this.IMAGES_BOTTLE);
  }

  checkIfBottleIsInMap() {
    if (this.x > world.level_end_x) {
      this.spliceColectable(this);
      console.log("bottle entfernt");
      checkRemainingBottles();
    }
  }
}
