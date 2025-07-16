/**
 * The entire game world: manages player, enemies, levels, sounds,
 * UI elements, collisions, throwable objects, animations, and game logic.
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

  /**
   * Constructor: initializes canvas, keyboard, starts game loops, and sets the world.
   * @param {HTMLCanvasElement} canvas
   * @param {Keyboard} keyboard
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setworld();
    this.run();
    this.gameEnd = false;
  }

  /**
   * Links character with the world (for accessing global variables)
   */
  setworld() {
    this.character.world = this;
  }

  /**
   * Starts all important game processes (collisions, collecting, throwing, music)
   */
  run() {
    setStoppableInterval(() => this.checkJumpOnEnemie(), 10);
    setStoppableInterval(() => this.checkColectables(), 1000 / 60);
    setStoppableInterval(() => this.checkCollisions(), 1000 / 60);
    setStoppableInterval(() => this.checkThrowObjects(), 1000 / 60);
    setStoppableInterval(() => this.CheckIfBottleIsOutsideMap(), 1000 / 60);
    this.backgroundMusic();
  }

  /**
   * Plays background music depending on game state
   */
  backgroundMusic() {
    if (soundOn) {
      if (this.endboss.startAnimation) {
        this.playBackgroundSound(this.EndbossMusic);
      } else {
        this.playBackgroundSound(this.backGroundMexico);
      }
    } else {
      if (this.currentBackGroundSound) {
        this.stopBackgroundMusic();
      }
    }
  }

  /**Switches to Endboss music and stops regular background music.*/
  setEndbossMusic() {
    this.playBackgroundSound(this.EndbossMusic);
  }

  /**
   * Stops currently playing background music
   */
  stopBackgroundMusic() {
    if (this.currentBackGroundSound?.pause) {
      this.currentBackGroundSound.pause();
    }
  }

  /**
   * Plays the given background sound, stops previous one if necessary
   * @param {HTMLAudioElement} backgroundSound
   */
  async playBackgroundSound(backgroundsound) {
    try {
      if (
        this.currentBackGroundSound &&
        this.currentBackGroundSound !== backgroundsound
      ) {
        this.stopBackgroundMusic();
      }
      backgroundsound.currentTime = 0;
      backgroundsound.volume = 0.2;
      const playPromise = backgroundsound.play();
      if (playPromise !== undefined) {
        await playPromise;
      }
      this.currentBackGroundSound = backgroundsound;
    } catch (err) {
      console.warn("Fehler beim Abspielen des Hintergrundsounds:", err);
    }
  }

  /**
   * Checks if the player wants to throw a bottle and if allowed
   */
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

  /**
   * Returns whether the player currently has bottles to throw
   * @returns {boolean}
   */
  characterHoldsomeBottles() {
    return this.character.colectedBottles > 0;
  }

  /**
   * Resets the throw timeout to allow next throw
   */
  timeOutThrow() {
    this.throwTimeOut = true;
  }

  /**
   * Initializes the throwable bottle, plays sound, starts collision checks
   * @param {ThrowableObject} bottle
   */
  drawThrowBottle(bottle) {
    this.throwableObjects.push(bottle);
    this.playSoundEffect(this.throwSound);
    setStoppableInterval(() => this.checkDemage(bottle), 10);
    setTimeout(() => this.spliceThrowableObjects(bottle), 1500);
    this.character.colectedBottles -= 10;
    this.statusBarBottle.setPercentage(this.character.colectedBottles);
  }

  /**
   * Removes a throwable bottle from the list if broken or out of range
   * @param {ThrowableObject} bottle
   */
  spliceThrowableObjects(bottle) {
    const index = this.throwableObjects.indexOf(bottle);
    if (index > -1) this.throwableObjects.splice(index, 1);
  }

  /**
   * Checks if the player jumped on an enemy and applies damage accordingly
   */
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

  /**
   * Makes the player bounce after jumping on an enemy
   */
  bounceOnEnemy() {
    this.playSoundEffect(this.jumpOnEnemySound);
    this.character.speedY = 30;
    this.character.isAboveGround();
  }

  /**
   * Checks collision between player and enemies, applies damage
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.character.isFalling) {
        this.character.hit();
        this.statusBarHealt.setPercentage(this.character.energy);
        this.playSoundEffect(this.hitSound);
      }
    });
  }

  /**
   * Checks if a thrown bottle hits an enemy and applies damage
   * @param {ThrowableObject} bottle
   */
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

  /**
   * Returns true if enemy is the endboss
   * @param {Enemy} enemy
   * @returns {boolean}
   */
  isTheEndboss(enemy) {
    return enemy.type === "boss";
  }

  /**
   * Returns true if bottle hits enemy and bottle is not broken
   * @param {ThrowableObject} bottle
   * @param {Enemy} enemy
   * @returns {boolean}
   */
  isBottleHitEnemy(bottle, enemy) {
    return bottle.isColliding(enemy) && !bottle.isBroke;
  }

  /**
   * Applies damage to the endboss
   * @param {Enemy} enemy
   */
  hitTheBoss(enemy) {
    this.playSoundEffect(this.demageSound);
    enemy.energy -= 15;
    this.statusBarBoss.setPercentage(enemy.energy);
    enemy.isDemage();
  }

  /**
   * Kills a regular enemy immediately and removes it later
   * @param {Enemy} enemy
   */
  killEnemy(enemy) {
    enemy.energy -= 100;
    setTimeout(() => this.spliceEnemy(enemy), 500);
  }

  /**
   * Removes an enemy from the level when energy is depleted
   * @param {Enemy} enemy
   */
  spliceEnemy(enemy) {
    if (enemy.energy < 1) {
      const index = this.level.enemies.indexOf(enemy);
      if (index > -1) this.level.enemies.splice(index, 1);
    }
  }

  /**
   * Checks if player collects any collectibles (bottles or coins)
   */
  checkColectables() {
    this.level.colectables.forEach((colectables) => {
      if (this.character.isColliding(colectables)) {
        if (colectables.type === "bottle") this.collectThisBottle(colectables);
        if (colectables.type === "coin") this.collectThisCoin(colectables);
        if (!this.checkRemainingBottles()) this.setNewBottles();
      }
    });
  }

  /**
   * Collects a bottle, updates UI and plays sound
   * @param {Collectable} collectable
   */
  collectThisBottle(colectables) {
    if (this.character.colectedBottles <= 100) {
      this.character.colectedBottles += 10;
      this.statusBarBottle.setPercentage(this.character.colectedBottles);
      this.playSoundEffect(this.colectBottle);
      this.spliceColectable(colectables);
    }
  }

  /**
   * Collects a coin, updates UI and plays sound
   * @param {Collectable} collectable
   */
  collectThisCoin(colectables) {
    this.character.CoinBag += 4;
    this.statusBarCoin.setPercentage(this.character.CoinBag);
    this.playSoundEffect(this.colectCoin);
    this.spliceColectable(colectables);
  }

  /**
   * Removes a collected item from the level
   * @param {Collectable} collectable
   */
  spliceColectable(colectables) {
    const index = this.level.colectables.indexOf(colectables);
    if (index > -1) {
      this.level.colectables.splice(index, 1);
    }
  }

  /**
   * Removes bottles that are past the endboss and adds new ones
   */
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

  /**
   * Checks if there are still bottles left on the map
   * @returns {boolean}
   */
  checkRemainingBottles() {
    return this.level.colectables.some((obj) => obj.type === "bottle");
  }

  /**
   * Adds new bottles to the level
   */
  addNewBottles() {
    for (let i = 0; i < 6; i++) {
      this.level.collectables.push(new Bottle());
    }
  }

  /**
   * Plays a given sound effect (utility method)
   * @param {HTMLAudioElement} sound
   */
  playSoundEffect(sound) {
    if (soundOn) {
      sound.currentTime = 0;
      sound.volume = 0.12;
      sound.play();
    }
  }

  /**
   * Ends the game and displays end screen
   */
  endAll() {
    stopIntervals();
    this.stopBackgroundMusic();
    this.level.enemies = [];
    this.level.colectables = [];
    setMainButtonsAfterGameEnd();
  }

  /**
   * Ends the game and displays end screen
   */
  levelEndAnimation() {
    this.gameEnd = true;
    this.endDisplay.winAnimation();
    setTimeout(() => this.endAll(), 3000);
  }

  /**
   * Ends the game and displays end screen
   */
  loseGame() {
    this.gameEnd = true;
    this.endDisplay.loseAnimation();
    setTimeout(() => this.endAll(), 3000);
  }

  /**
   * Draw loop: renders all game elements to the canvas
   */
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

  /**
   * Adds multiple game objects to the canvas
   */
  addObjectToMap(objects) {
    objects.forEach((o) => this.addToMap(o));
  }

  /**
   * Adds a single game object to the canvas, flipped if needed
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      mo.draw(this.ctx, true);
    } else {
      mo.draw(this.ctx, false);
    }
    mo.drawFrame(this.ctx);
  }

  /**
   * Flips the given object's image horizontally before drawing
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.x + mo.width, mo.y);
    this.ctx.scale(-1, 1);
  }

  /**
   * Resets canvas transformations to normal orientation
   */
  flipImageBack() {
    this.ctx.restore();
  }
}
