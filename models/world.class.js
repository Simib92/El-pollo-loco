/**
 * Represents the entire game world, including the player character, enemies, level,
 * sounds, UI elements, and all game logic such as collisions, throwing, and animations.
 */
class World {
  character = new Character();
  endboss = new Endboss();
  level = level1;
  enemies;
  canvas;
  sleepPepe = false;
  ctx;
  keyboard;
  camera_x = 0;
  statusBarHealt = new StatusbarHealt();
  statusBarCoin = new StatusbarCoin();
  statusBarBottle = new StatusbarBottle();
  statusBarBoss = new StatusbarHealtEndboss();
  endDisplay = new EndDisplay();
  throwableObjects = [];
  intervalIDs = [];
  gameEnd = false;
  gameIsRun = false;
  drawIntervalID = [];
  throwTimeOut = true;
  sound;
  currentBackGroundSound;

  backGroundMexico = new Audio("audio/soft-mexican-guitar-343137.mp3");
  EndbossMusic = new Audio("audio/endboss.mp3");
  jumpSound = new Audio("audio/cartoon-jump-6462.mp3");
  colectCoin = new Audio("audio/collect_coin.mp3");
  colectBottle = new Audio("audio/collect_bottle.mp3");
  throwSound = new Audio("audio/throw.mp3");
  hitSound = new Audio("audio/hit.mp3");
  demageSound = new Audio("audio/demage.mp3");
  bossAttack = new Audio("audio/boss-attack.mp3");
  jumpOnEnemySound = new Audio("audio/jump-on-enemy.mp3");
  sleepSound = new Audio("audio/sleep.mp3");

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setworld();
    this.run();
    this.gameEnd = false;
  }

  //Links the world to the character so it has access to the global game state.
  setworld() {
    this.character.world = this;
  }

  //Starts key game processes using intervals (collisions, checks, collects)
  run() {
    setStoppableInterval(() => this.checkJumpOnEnemie(), 1000 / 60);
    setStoppableInterval(() => this.checkColectables(), 1000 / 60);
    setStoppableInterval(() => this.checkCollisions(), 1000 / 60);
    setStoppableInterval(() => this.checkThrowObjects(), 1000 / 60);
    setStoppableInterval(() => this.CheckIfBottleIsOutsideMap(), 1000 / 60);
    this.backgroundMusic();
  }

  //Manages background music. Switches to boss music if needed.
  backgroundMusic() {
    if (soundOn) {
      if (this.endboss.startAnimation) {
        this.playBackgroundSound(this.EndbossMusic);
      } else {
        this.playBackgroundSound(this.backGroundMexico);
      }
    } else {
      if (this.currentBackGroundSound) {
        this.stopBackgroundMusic()
      }
    }
  }

  //Switches to Endboss music and stops regular background music.
  setEndbossMusic() {
      //this.stopBackgroundMusic();
      this.playBackgroundSound(this.EndbossMusic)
  }

  //Stops the currently playing background music.
  stopBackgroundMusic() {
    if (this.currentBackGroundSound?.pause) {
        this.currentBackGroundSound.pause();
    }
  }

  //Plays the background sound from the beginning
  playBackgroundSound(backgroundsound) {
    if (this.currentBackGroundSound) {
      this.stopBackgroundMusic();
    }
    backgroundsound.currentTime = 0;
    backgroundsound.volume = 0.2;
    backgroundsound.play();
    this.currentBackGroundSound = backgroundsound;
  }

  //Checks if the player wants to throw a bottle
  checkThrowObjects() {
    if (this.keyboard.D) {
      if (this.characterHoldsomeBottles() && this.throwTimeOut) {
        let bottle = new ThrowableObject(
          this.character.x + 100,
          this.character.y + 100
        );
        this.drawThrowBottle(bottle);
        this.throwTimeOut = false;
        setTimeout(() => this.timeOutThrow(), 800);
      }
    }
  }

  //Checks if the player hold some bottles
  characterHoldsomeBottles() {
    return this.character.colectedBottles > 0;
  }

  // set timout, that player not can shoot for 0.8s
  timeOutThrow() {
    this.throwTimeOut = true;
  }

  //Initializes a thrown bottle, plays sound, and handles collision logic
  drawThrowBottle(bottle) {
    this.throwableObjects.push(bottle);
    this.playSoundEffect(this.throwSound);
    setStoppableInterval(() => this.checkDemage(bottle), 10);
    this.statusBarBottle.setPercentage(this.character.colectedBottles);
    setTimeout(() => this.spliceThrowableObjects(bottle), 1500);
    this.character.colectedBottles -= 10;
  }

  //splice the bottle it it is outside the map
  spliceThrowableObjects(bottle) {
    const index = this.throwableObjects.indexOf(bottle);
    if (index > -1) this.throwableObjects.splice(index, 1);
  }

  //Check if player is jumping on some enemies
  checkJumpOnEnemie() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isJumpOnEnemy(enemy) && this.character.isFalling) {
        enemy.energy -= 100;
        if (enemy.energy < 1) {
          setTimeout(() => this.spliceEnemy(enemy), 500);
        }
        this.bounceOnEnemy();
      }
    });
  }

  //Handles the character bounce after jumping on an enemy
  bounceOnEnemy() {
    this.playSoundEffect(this.jumpOnEnemySound);
    this.character.speedY = 30;
    this.character.isAboveGround();
  }

  //Checks if the character is colliding with any enemy
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.character.isFalling) {
        this.character.hit();
        this.statusBarHealt.setPercentage(this.character.energy);
        this.playSoundEffect(this.hitSound);
      }
    });
  }

  //Checks if ah throw bottle is hit a enemie
  checkDemage(bottle) {
    this.level.enemies.forEach((enemy) => {
      if (this.isBottleHitEnemy(bottle, enemy)) {
        bottle.splashBottle();
        if (this.isTheEndboss(enemy)) this.hitTheBoss(enemy);
        else this.killEnemy(enemy);
        bottle.isBroke = true;
      }
    });
  }

  //Checks if the enemy is the final boss
  isTheEndboss(enemy) {
    return enemy.type === "boss";
  }

  //Determines if a bottle hits an enemy and is not yet broken
  isBottleHitEnemy(bottle, enemy) {
    return bottle.isColliding(enemy) && !bottle.isBroke;
  }

  //Check if damage to the final boss
  hitTheBoss(enemy) {
    this.playSoundEffect(this.demageSound);
    enemy.energy -= 15;
    this.statusBarBoss.setPercentage(enemy.energy);
    enemy.isDemage();
  }

  //Instantly kills a regular enemy
  killEnemy(enemy) {
    enemy.energy -= 100;
    setTimeout(() => this.spliceEnemy(enemy), 500);
  }

  //Removes an enemy from the level once its energy is depleted
  spliceEnemy(enemy) {
    if (enemy.energy < 1) {
      const index = this.level.enemies.indexOf(enemy);
      if (index > -1) this.level.enemies.splice(index, 1);
    }
  }

  //Checks if the player is collecting any items (bottles or coins)
  checkColectables() {
    this.level.colectables.forEach((colectables) => {
      if (this.character.isColliding(colectables)) {
        if (colectables.type === "bottle") this.collectThisBottle(colectables);
        if (colectables.type === "coin") this.collectThisCoin(colectables);
        if (!this.checkRemainingBottles()) this.setNewBottles();
      }
    });
  }

  //Handles bottle collection logic and updates UI
  collectThisBottle(colectables) {
    if (this.character.colectedBottles <= 100) {
      this.character.colectedBottles += 10;
      this.statusBarBottle.setPercentage(this.character.colectedBottles);
      this.playSoundEffect(this.colectBottle);
      this.spliceColectable(colectables);
    }
  }

  //Handles coin collection logic and updates UI
  collectThisCoin(colectables) {
    this.character.CoinBag += 4;
    this.statusBarCoin.setPercentage(this.character.CoinBag);
    this.playSoundEffect(this.colectCoin);
    this.spliceColectable(colectables);
  }

  //Removes a collectable object from the level
  spliceColectable(colectables) {
    const index = this.level.colectables.indexOf(colectables);
    if (index > -1) {
      this.level.colectables.splice(index, 1);
    }
  }

  //Removes bottles that have moved beyond the boss and spawns new ones
  CheckIfBottleIsOutsideMap() {
    this.level.colectables.forEach((obj) => {
      if (obj.type === "bottle") {
        if (obj.x >= this.endboss.x) {
          this.spliceColectable(obj);
          this.level.colectables.push(new Bottle());
        }
      }
    });
  }

  //Checks if there are any remaining bottles in the level
  checkRemainingBottles() {
    return this.level.colectables.some((obj) => obj.type === "bottle");
  }

  //Adds new bottles to the level
  setNewBottles() {
    this.level.colectables.push(new Bottle());
    this.level.colectables.push(new Bottle());
    this.level.colectables.push(new Bottle());
    this.level.colectables.push(new Bottle());
    this.level.colectables.push(new Bottle());
    this.level.colectables.push(new Bottle());
  }

  //Plays a sound effect, if sound is enabled
  playSoundEffect(sound) {
    if (soundOn) {
      sound.currentTime = 0;
      sound.volume = 0.12;
      sound.play();
    }
  }

  //Ends the game: stops intervals, music, and clears objects
  endAll() {
    stopIntervals();
    this.stopBackgroundMusic();
    this.level.enemies = [];
    this.level.colectables = [];
    setMainButtonsAfterGameEnd();
  }

  //Plays the win animation and ends the game
  levelEndAnimation() {
    this.gameEnd = true;
    this.endDisplay.winAnimation();
    setTimeout(() => this.endAll(), 3000);
  }

  //Plays the lose animation and ends the game
  loseGame() {
    this.gameEnd = true;
    this.endDisplay.loseAnimation();
    setTimeout(() => this.endAll(), 3000);
  }

  //Main rendering function. Draws the character, UI, enemies, and objects
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectToMap(this.level.backgroundObjects);
    this.addObjectToMap(this.level.clouds);
    this.addObjectToMap(this.level.enemies);

    this.ctx.translate(-this.camera_x, 0);

    this.addToMap(this.statusBarHealt);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottle);
    if (this.endboss.startAnimation) {
      this.addToMap(this.statusBarBoss);
    }
    if (this.gameEnd) {
      this.addToMap(this.endDisplay);
    }

    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    this.addObjectToMap(this.throwableObjects);
    this.addObjectToMap(this.level.colectables);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  //Adds multiple game objects to the canvas
  addObjectToMap(objects) {
    objects.forEach((o) => this.addToMap(o));
  }

  //Adds a single game object to the canvas, flipped if needed
  addToMap(mo) {
    if (mo.otherDirection) {
      mo.draw(this.ctx, true);
    } else {
      mo.draw(this.ctx, false);
    }
    mo.drawFrame(this.ctx);
  }

  //Flips the given object's image horizontally before drawing
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.x + mo.width, mo.y);
    this.ctx.scale(-1, 1);
  }

  //Resets canvas transformations to normal orientation
  flipImageBack() {
    this.ctx.restore();
  }
}
