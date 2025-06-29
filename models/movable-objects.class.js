class MovableObject extends DrawableObject {
  speed = 0.2;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  CoinBag = 0;
  colectedBottles = 0;
  lastHit = 0;

  applyGravity() {
    if (this.isAboveGround() || this.speedY > 0) {
      this.y -= this.speedY;
      this.speedY -= this.acceleration;
    }
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 160;
    }
  }

  isColliding(obj) {
    return (
      this.frameX + this.frameWidth >= obj.frameX &&
      this.frameX <= obj.frameX + obj.frameWidth &&
      this.frameY + this.frameHeight >= obj.frameY &&
      this.frameY <= obj.frameY + obj.frameHeight
    );
  }

  isJumpOnEnemy(enemy) {
    const STOMP_TOLERANCE = 20;

    const horizontallyAligned =
      this.x - 5 + this.width + 5 > enemy.x && this.x < enemy.x + enemy.width;

    const verticalFromAbove =
      this.y - 5 + this.height <= enemy.y + STOMP_TOLERANCE &&
      this.y + this.height >= enemy.y;

    return horizontallyAligned && verticalFromAbove;
  }

  hit() {
    if (!this.isHurt()) {
      this.energy -= 10;
      if (this.energy < 0) {
        this.energy = 0;
      }
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 2;
  }

  isDemage() {
    this.isHit = true;
    setTimeout(() => this.returnAttackAgain(), 500);
  }

  returnAttackAgain() {
    this.isHit = false;
  }

  isDead() {
    return this.energy == 0;
  }

  colectBottles() {
    this.colectedBottles += 20;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 20;
  }
}
