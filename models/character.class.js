class Character extends MovableObject {
  height = 280;
  y = 170;
  speed = 8;
  sleepPepe = false;
  sleepInterval;
  isFalling = false;

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_STANDING = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ]

  IMAGES_SLEEP = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  world;

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_STANDING);
    this.loadImages(this.IMAGES_SLEEP);
    setStoppableInterval(() => this.applyGravity(), 1000 / 25);
    setStoppableInterval(() => this.animate(), 1000 / 60);
    setStoppableInterval(() => this.animateSlow(), 100);
    setStoppableInterval(() => this.animateImges(), 50);
    setStoppableInterval(() => this.checkIsFalling(), 1000 / 60);
  }

  animate() {
    if (this.canMoveRight()) 
      this.characterMoveRight();
    if (this.canMoveLeft()) 
      this.characterMoveLeft();
    this.world.camera_x = +100 - this.x;
  }

  animateSlow() {
    if (this.characterCanJump()) 
        this.characterJump();
    if (this.isCharacterNotMove());
      this.characterStandartPosition();
      this.characterGetSleep();
  }

  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x
  }

  characterMoveRight() {
    this.moveRight();
    this.otherDirection = false;
  }

  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > 0
  }

  characterMoveLeft() {
    this.moveLeft();
    this.otherDirection = true;
  }

  characterCanJump() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }

  characterJump() {
    this.jump();
    this.world.playSoundEffect(this.world.jumpSound);
  }

  isCharacterNotMove() {
    return (
      this.world.keyboard.RIGHT ||
      this.world.keyboard.LEFT ||
      this.world.keyboard.SPACE ||
      this.world.keyboard.D
    );
  }

  characterStandartPosition() {
    this.playAnimation(this.IMAGES_STANDING)
  }

  characterGetSleep() {
    if (this.sleepPepe) {
      clearInterval(this.sleepInterval);
      this.sleepInterval = null;
      this.world.sleepSound.pause();
    }
    this.sleepPepe = false;
    clearTimeout(this.sleepTimeout);
    this.sleepTimeout = setTimeout(() => {
      if (!this.isCharacterNotMove()) {
        this.sleepPepe = true;
        this.sleep();
        this.world.playSoundEffect(this.world.sleepSound)
      }
    }, 10000);
  }

  animateImges() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
      this.world.loseGame();
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
    } else {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }
  }

  checkIsFalling() {
    if (this.y < 30) 
      this.isFalling = true;      
    if (this.y >= 160) 
      this.isFalling = false;
  }

  jump() {
    this.speedY = 30;
  }

  sleep() {
    if (this.sleepInterval) return;
    this.sleepInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_SLEEP);
    }, 1000);
  }
}
