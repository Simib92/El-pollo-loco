//Represents the main character "Pepe" controlled by the player

class Character extends MovableObject {
  height = 280;
  y = 170;
  speed = 8;
  sleepPepe = false;
  sleepInterval = 0;
  isFalling = false;
  sleepSoundIsPlaying = false;

  //Animation frames for walking
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  //Animation frames for jumping
  IMAGES_JUMPING = [
    //"img/2_character_pepe/3_jump/J-31.png",
    //"img/2_character_pepe/3_jump/J-32.png",
    //"img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    //"img/2_character_pepe/3_jump/J-37.png",
    //"img/2_character_pepe/3_jump/J-38.png",
  ];

  //Animation frames for hurt state
  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  //Animation frames for death sequence
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  //Animation frames for idle/standing
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
  ];

  //Animation frames for sleep
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

  //Constructs the main character and sets up all animation and control intervals
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
    setStoppableInterval(() => this.returnToLevelEndX(), 1000 / 60);
    setStoppableInterval(() => this.charactersleepIntervall(), 50);
    setStoppableInterval(() => this.jumpAnimation(), 300);
  }

  //Updates camera and checks for left/right movement
  animate() {
    if (this.canMoveRight()) this.characterMoveRight();
    if (this.canMoveLeft()) this.characterMoveLeft(); 
    this.world.camera_x = +100 - this.x;
  }

  //Handles slower updates like jumping and standing animations
  animateSlow() {
    if (this.characterCanJump()) this.characterJump();
    if (this.isCharacterNotMove() && !this.sleepPepe);
    this.characterStandartPosition();
    if (this.sleepPepe) {
      this.characterGetSleep();
    }
  }

  //Checks if the character can move right and is not at the level end
  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }

  //Restricts character from passing level end boundary
  returnToLevelEndX() {
    if (this.x > this.world.level.level_end_x) {
      this.x = this.world.level.level_end_x;
    }
  }

  //Handles right movement logic
  characterMoveRight() {
    this.moveRight();
    this.otherDirection = false;
  }

  //Checks if character can move left
  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > 0;
  }

  //Handles left movement logic
  characterMoveLeft() {
    this.moveLeft();
    this.otherDirection = true;
  }

  //Checks if character can jump
  characterCanJump() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }

  //Executes the jump logic and plays jump sound
  characterJump() {
    this.jump();
    this.world.playSoundEffect(this.world.jumpSound);
  }

  //Plays jumping animation when character is airborne
  jumpAnimation() {
    if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
    }
  }

  //Checks if the character is performing any movement or actions
  isCharacterNotMove() {
    return (
      this.world.keyboard.RIGHT ||
      this.world.keyboard.LEFT ||
      this.world.keyboard.SPACE ||
      this.world.keyboard.D
    );
  }

  //Plays standing animation if not asleep
  characterStandartPosition() {
    if (!this.sleepPepe && !this.isAboveGround()) this.playAnimation(this.IMAGES_STANDING);
  }

  //Manages sleep logic based on inactivity
  charactersleepIntervall() {
    if (!this.isCharacterNotMove()) this.sleepInterval += 1;
    else this.resetSleepTimer();
    if (this.sleepInterval >= 250) this.sleepPepe = true;
  }

  //Resets sleep status and stops snoring sound
  resetSleepTimer() {
    this.sleepInterval = 0;
    this.sleepPepe = false;
    if (this.sleepSoundIsPlaying) {
      this.world.sleepSound.pause();
      this.sleepSoundIsPlaying = false;
    }
  }

  //Activates sleep animation and plays snoring sound
  characterGetSleep() {
    if (!this.world.gameEnd && this.sleepPepe) {
      this.playAnimation(this.IMAGES_SLEEP);
      if (!this.sleepSoundIsPlaying) {
        this.world.playSoundEffect(this.world.sleepSound);
        this.sleepSoundIsPlaying = true;
      }
    }
  }

  //Handles context-based animations (dead, hurt, walking)
  animateImges() {
    if (!this.isAboveGround()) {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        this.world.loseGame();
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
        this.resetSleepTimer();
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)
          this.playAnimation(this.IMAGES_WALKING);
      }
    }
  }

  //Updates `isFalling` flag based on character's vertical position
  checkIsFalling() {
    if (this.y < 30) this.isFalling = true;
    if (this.y >= 160) this.isFalling = false;
  }

  //Sets upward velocity to perform a jump
  jump() {
    this.speedY = 30;
  }
}
