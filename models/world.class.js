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
  backgroundsound = this.backGroundMexico;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setworld();
    this.run();
    this.gameEnd = false;
  }

  setworld() {
    this.character.world = this;
  }

  run() {
    setStoppableInterval(() => this.checkJumpOnEnemie(), 1000 / 60);
    setStoppableInterval(() => this.checkColectables(), 1000 / 60);
    setStoppableInterval(() => this.checkCollisions(), 1000 / 60);
    setStoppableInterval(() => this.checkThrowObjects(), 1000 / 60);
    this.backgroundMusic();
  }

  async backgroundMusic() {
    if (soundOn) {
      if (this.endboss.startAnimation) {
        this.setEndbossMusic();
      }
       await this.playBackgroundSound();
    }
  }

  async setEndbossMusic() {
    try {
      this.stopBackgroundMusic();
      this.backgroundsound = this.EndbossMusic;
    } catch (error) {
      console.log('this dont work');
    }
  }

  stopBackgroundMusic() {
    this.backgroundsound.pause();
  }

  async playBackgroundSound() {
    this.backgroundsound.currentTime = 0;
    this.backgroundsound.volume = 0.2;
    this.backgroundsound.play();
  }

  checkThrowObjects() {
    if (this.keyboard.D) {
      if (this.characterHoldsomeBottles() && this.throwTimeOut) {
        let bottle = new ThrowableObject(
          this.character.x + 100,
          this.character.y + 100
        );
        this.drawThrowBottle(bottle);
        this.throwTimeOut = false;
        setTimeout(() => this.timeOutThrow(), 800)
      }
    }
  }

  characterHoldsomeBottles() {
    return this.character.colectedBottles > 0;
  }

  timeOutThrow() {
    this.throwTimeOut = true;
  }

  drawThrowBottle(bottle) {
    this.throwableObjects.push(bottle);
    this.playSoundEffect(this.throwSound);
    setStoppableInterval(() => this.checkDemage(bottle), 10);
    this.statusBarBottle.setPercentage(this.character.colectedBottles);
    setTimeout(() => this.spliceThrowableObjects(bottle), 1500);
    this.character.colectedBottles -= 20;
  }

  spliceThrowableObjects(bottle) {
    const index = this.throwableObjects.indexOf(bottle);
    if (index > -1) {
      this.throwableObjects.splice(index, 1);
    }
  }

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

  bounceOnEnemy() {
    this.playSoundEffect(this.jumpOnEnemySound);
    this.character.speedY = 30;
    this.character.isAboveGround();
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.character.isFalling) {
        this.character.hit();
        this.statusBarHealt.setPercentage(this.character.energy);
        this.playSoundEffect(this.hitSound);
      }
    });
  }

  checkDemage(bottle) {
    this.level.enemies.forEach((enemy) => {
      if (this.isBottleHitEnemy(bottle, enemy)) {
        bottle.splashBottle();
        this.playSoundEffect(this.demageSound);
        if (this.isTheEndboss(enemy)) {
          this.hitTheBoss(enemy);
        } else {
          this.killEnemy(enemy);
        }
        bottle.isBroke = true;
      }
    });
  }

  isTheEndboss(enemy) {
    return enemy.type === "boss";
  }

  isBottleHitEnemy(bottle, enemy) {
    return bottle.isColliding(enemy) && !bottle.isBroke;
  }

  hitTheBoss(enemy) {
    enemy.energy -= 15;
    this.statusBarBoss.setPercentage(enemy.energy);
    enemy.isDemage();
  }

  killEnemy(enemy) {
    enemy.energy -= 100;
    setTimeout(() => this.spliceEnemy(enemy), 500);
  }

  spliceEnemy(enemy) {
    if (enemy.energy < 1) {
      const index = this.level.enemies.indexOf(enemy);
      if (index > -1) {
        this.level.enemies.splice(index, 1);
      }
    }
  }

  checkColectables() {
    this.level.colectables.forEach((colectables) => {
      if (this.character.isColliding(colectables)) {
        this.spliceColectable(colectables);
        if (colectables.type === "bottle") {
          this.collectThisBottle();
        }
        if (colectables.type === "coin") {
          this.collectThisCoin();
        }
        if (!this.checkRemainingBottles()) {
          this.setNewBottles();
        }
      }
    });
  }

  collectThisBottle() {
    this.character.colectedBottles += 20;
    this.statusBarBottle.setPercentage(this.character.colectedBottles);
    this.playSoundEffect(this.colectBottle);
  }

  collectThisCoin() {
    this.character.CoinBag += 5;
    this.statusBarCoin.setPercentage(this.character.CoinBag);
    this.playSoundEffect(this.colectCoin);
  }

  spliceColectable(colectables) {
    const index = this.level.colectables.indexOf(colectables);
    if (index > -1) {
      this.level.colectables.splice(index, 1);
    }
  }

  checkRemainingBottles() {
    return this.level.colectables.some((obj) => obj.type === "bottle");
  }

  setNewBottles() {
    this.level.colectables.push(new Bottle());
    this.level.colectables.push(new Bottle());
    this.level.colectables.push(new Bottle());
    this.level.colectables.push(new Bottle());
    this.level.colectables.push(new Bottle());
    this.level.colectables.push(new Bottle());
  }

  playSoundEffect(sound) {
    if (soundOn && !this.gameEnd) {
      sound.currentTime = 0;
      sound.volume = 0.12;
      sound.play();
    }
  }

  endAll() {
    stopIntervals();
    this.stopBackgroundMusic();
    this.level.enemies = [];
    this.level.colectables = [];
    setTimeout(() => stopGame(), 3000);
  }

  levelEndAnimation() {
    this.gameEnd = true;
    this.endDisplay.winAnimation();
    setTimeout(() => this.endAll(), 3000);
  }

  loseGame() {
    this.gameEnd = true;
    this.endDisplay.loseAnimation();
    setTimeout(() => this.endAll(), 3000);
  }

  draw() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  this.ctx.translate(this.camera_x, 0);

  this.addObjectToMap(this.level.backgroundObjects);
  this.addObjectToMap(this.level.clouds);
  this.addObjectToMap(this.level.enemies);

  this.ctx.translate(-this.camera_x, 0);

  //space for fixed objects.
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

  // Draw() wird immer wieder aufgerufen
  let self = this;
  requestAnimationFrame(function () {
    self.draw();
  });
}

addObjectToMap(objects) {
  objects.forEach(o => this.addToMap(o));
}

addToMap(mo) {
  if (mo.otherDirection) {
    mo.draw(this.ctx, true);
  } else {
    mo.draw(this.ctx, false);
  }
  mo.drawFrame(this.ctx);
}

flipImage(mo) {
  this.ctx.save();
  this.ctx.translate(mo.x + mo.width, mo.y);
  this.ctx.scale(-1, 1);
}

flipImageBack() {
  this.ctx.restore();
}
}
