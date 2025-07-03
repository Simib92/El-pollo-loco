//Represents the Endboss enemy with different animations and behaviors

class Endboss extends MovableObject {
  height = 400;
  width = 400;
  y = 70;
  energy = 100;
  startAnimation = false;
  endbossAttack = 0;
  type = "boss";
  isHit = false;

  //Image paths for walking animation
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  //Image paths for attack animation
  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  //Image paths for alert animation
  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  //Image paths for hurt animation
  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  //Image paths for dead animation
  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  //Creates an instance of the Endboss, loads all animations, sets initial position,
  //and starts the animation loop
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 15000;
    setStoppableInterval(() => this.animate(), 200);
  }

  //Controls the Endboss animation and behavior based on energy and player position
  animate() {
    if (this.energy > 1) {
      if (!this.startAnimation && world.character.x <= 14500)
        this.playAnimation(this.IMAGES_ALERT);
      if (world.character.x > 14500) this.endbossStartRun();
      if (this.startAnimation && this.endbossAttack < 100)
        this.endbossAttackYou();
      if (this.endbossAttack >= 100) this.endbossSpecialAttack();
      if (this.isHit) {
        this.playAnimation(this.IMAGES_HURT);
        this.setNewChicken();
      }
    } else this.endbossIsDead();
  }

  //Starts the endboss running animation and triggers background music
  endbossStartRun() {
    this.startAnimation = true;
    world.backgroundMusic();
  }

  //Endboss walking attack behavior, moves left with increasing attack charge
  endbossAttackYou() {
    this.playAnimation(this.IMAGES_WALKING);
    this.speed = 15;
    this.moveLeft();
    this.endbossAttack += 4 + Math.random() * 7;
  }

  //Executes the special attack animation, moves faster left and plays sound effect
  endbossSpecialAttack() {
    this.playAnimation(this.IMAGES_ATTACK);
    this.speed = 20 + Math.random() * 12;
    world.playSoundEffect(world.bossAttack);
    this.moveLeft();
    setTimeout(() => this.resetAttck(), 3000);
  }

  //Plays dead animation and triggers level end animation after a delay
  endbossIsDead() {
    this.playAnimation(this.IMAGES_DEAD);
    this.endbossAttack = 0;
    setTimeout(() => world.levelEndAnimation(), 1000);
  }

  //Resets the attack counter to zero
  resetAttck() {
    this.endbossAttack = 0;
  }

  //Spawns a new Chicken enemy near the Endboss position
  setNewChicken() {
    let chicken = new Chicken(120, 120, 330, this.x - 80, true);
    world.level.enemies.push(chicken);
  }
}
