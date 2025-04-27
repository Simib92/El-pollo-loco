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
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }

    isAboveGround() {
        if(this instanceof ThrowableObject) {
            return true;
        } else {
        return this.y < 160;
        }
    }
/*
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }
*/
    isColliding(mo) {
        return this.frameX + this.frameWidth > mo.frameX &&
            this.frameY + this.frameHeight > mo.frameY &&
            this.frameX < mo.frameX &&
            this.frameY < mo.frameY + mo.frameHeight
    }

    isJumpOnEnemy(enemy) {
        const horizontallyAligned =
            this.x + this.width > enemy.x &&
            this.x < enemy.x + enemy.width;
    
        const verticalFromAbove =
            this.y + this.height <= enemy.y + 15 && // kleine Toleranzzone
            this.y + this.height >= enemy.y;
    
    
        return horizontallyAligned && verticalFromAbove;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }        
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //differenz in ms
        timepassed = timepassed / 1000; //differenz in s
        return timepassed < 2;
    }
 
    isDead() {
        return this.energy == 0;
        setTimeout()
    }

    colectBottles() {
        this.colectedBottles += 20;
    }

/*
isColliding (obj) {
    return  (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) && 
            (this.Y + this.offsetY + this.height) >= obj.Y &&
            (this.Y + this.offsetY) <= (obj.Y + obj.height)
}
*/
    
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

