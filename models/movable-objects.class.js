//Represents a movable object in the game

class MovableObject extends DrawableObject {
  speed = 0.2;
  otherDirection = false;
  speedY = null;
  acceleration = 2.5;
  energy = 100;
  CoinBag = 0;
  colectedBottles = 0;
  lastHit = 0;

  //Applies gravity to the object, simulating falling/jumping
  applyGravity() {
    if (this.isAboveGround() || this.speedY > 0) {
      this.y -= this.speedY;
      this.speedY -= this.acceleration;
      if (this.y > 160 && !this instanceof ThrowableObject) {
      return this.y = 160;
    }
  }
}

  //Checks whether the object is above ground level
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else { 
      return this.y < 160;
    }
  }

  //Determines whether this object is colliding with another object
  isColliding(obj) {
    return (
      this.frameX + this.frameWidth >= obj.frameX &&
      this.frameX <= obj.frameX + obj.frameWidth &&
      this.frameY + this.frameHeight >= obj.frameY &&
      this.frameY <= obj.frameY + obj.frameHeight
    );
  }

  //Determines if this object has jumped on top of an enemy
  isJumpOnEnemy(enemy) {
    const STOMP_TOLERANCE = 20;

    const horizontallyAligned =
      this.x - 5 + this.width + 5 > enemy.x && this.x < enemy.x + enemy.width;

    const verticalFromAbove =
      this.y - 5 + this.height <= enemy.y + STOMP_TOLERANCE &&
      this.y + this.height >= enemy.y;

    return horizontallyAligned && verticalFromAbove;
  }

  //Reduces energy when the object is hit, unless it was recently hit
  hit() {
    if (!this.isHurt()) {
      this.energy -= 10;
      if (this.energy < 0) {
        this.energy = 0;
      }
      this.lastHit = new Date().getTime();
    }
  }

  //Checks if the object is currently in a hurt state (i.e., within cooldown)
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 2;
  }

  //Temporarily marks the object as damaged
  isDemage() {
    this.isHit = true;
    setTimeout(() => this.returnAttackAgain(), 500);
  }

  //Resets the hit state, allowing the object to be hit again
  returnAttackAgain() {
    this.isHit = false;
  }

  //Checks if the object has no energy left
  isDead() {
    return this.energy == 0;
  }

  //Increases the bottle count by 20
  colectBottles() {
    this.colectedBottles += 20;
  }

  //Moves the object to the right by its speed
  moveRight() {
    this.x += this.speed;
  }

  //Moves the object to the left by its speed
  moveLeft() {
    this.x -= this.speed;
  }

  //Makes the object jump by setting a vertical speed
  jump() {
    this.speedY = 20;
  }
}
