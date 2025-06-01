class World {
    character = new Character();
    //chicken = new Chicken();
    //smallChicken = new SmallChicken();
    endboss = new Endboss();
    level = level1;
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
    //colectables = new Colectables();
    //colectables_bottle = new Bottle();
    //colectables_coin = new Coin();
    throwableObjects = [];
    intervalIDs = [];
    gameEnd = false;
    gameIsRun = false;
    drawIntervalID = [];

    jumpSound = new Audio('audio/cartoon-jump-6462.mp3');
    colectCoin = new Audio('audio/collect_coin.mp3');
    colectBottle = new Audio('audio/collect_bottle.mp3');
    throwSound = new Audio('audio/throw.mp3');
    hitSound = new Audio('audio/hit.mp3');
    demageSound = new Audio('audio/demage.mp3');
    bossAttack = new Audio('audio/boss-attack.mp3');
    jumpOnEnemySound = new Audio('audio/jump-on-enemy.mp3');


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setworld();
        this.run();
        this.gameEnd = false;
        this.character.energy = 100;
    }

    setworld() {
        this.character.world = this;
    }

    run() {
        setStoppableInterval(() => this.checkJumpOnEnemie(), 10);
        setStoppableInterval(() => this.checkColectables(), 10);
        setStoppableInterval(() => this.checkCollisions(), 200);
        setStoppableInterval(() => this.checkThrowObjects(), 200);
        //this.setStoppableInterval(() => this.checkColectablesOutsideLevel(), 200);
    }

    /*setStoppableInterval(fn, time) {
        let id = setInterval(fn, time);
        this.intervalIDs.push(id);
    }

    stopIntervals() {
        this.intervalIDs.forEach(clearInterval);
    }*/

    checkThrowObjects() {        
        if(this.keyboard.D) {
            if (this.character.colectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.playSoundEffect(this.throwSound);
            setStoppableInterval(() => this.checkDemage(bottle), 50);
            this.statusBarBottle.setPercentage(this.character.colectedBottles)
            setTimeout(() => this.spliceThrowableObjects(bottle), 1500);
            this.character.colectedBottles -= 20;
        }
        }
    }

    spliceThrowableObjects(bottle) {
        const index = this.throwableObjects.indexOf(bottle);
            if (index > -1) {
            this.throwableObjects.splice(index, 1);
    }}

    checkJumpOnEnemie() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isJumpOnEnemy(enemy)) {
                enemy.energy -= 100;
                    if (enemy.energy < 1) {
                        setTimeout(() => this.spliceEnemy(enemy), 500);
                    }
                    this.playSoundEffect(this.jumpOnEnemySound);
                    this.character.speedY = 30;
                    this.character.isAboveGround();
            }}
        );
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
            this.character.hit();
            this.statusBarHealt.setPercentage(this.character.energy);
            this.playSoundEffect(this.hitSound)
        }});
    }

    checkDemage(bottle) {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy) && !bottle.isBroke) {
                    bottle.splashBottle();
                    this.playSoundEffect(this.demageSound)
                    if (enemy.type === 'boss') {
                        enemy.energy -= 20;
                        this.statusBarBoss.setPercentage(enemy.energy);
                        enemy.isDemage();
                    } else {
                    enemy.energy -= 100;
                    setTimeout(() => this.spliceEnemy(enemy), 500);
                    }
                    bottle.isBroke = true;
                }});
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
                    if (colectables.type === 'bottle') {
                        this.character.colectedBottles += 20;
                        this.statusBarBottle.setPercentage(this.character.colectedBottles);
                        this.playSoundEffect(this.colectBottle);
                    }
                    if (colectables.type === 'coin') {
                        this.character.CoinBag += 5;
                        this.statusBarCoin.setPercentage(this.character.CoinBag);
                        this.playSoundEffect(this.colectCoin);
                    }
                    if (!this.checkRemainingBottles()) {
                        this.setNewBottles();
                    }
            }});
    }

    spliceColectable(colectables) {
        const index = this.level.colectables.indexOf(colectables);
        if (index > -1) {
        this.level.colectables.splice(index, 1);
        } 
    }

    checkRemainingBottles() {
        return this.level.colectables.some(obj => obj.type === 'bottle');
    }

    setNewBottles() {
        this.level.colectables.push(new Bottle());
        this.level.colectables.push(new Bottle());
        this.level.colectables.push(new Bottle());
        this.level.colectables.push(new Bottle());
    }

    playSoundEffect(sound) {
        if (soundOn) {
            sound.currentTime = 0;
            sound.play();  
        }
        
    }

    levelEndAnimation() {
        this.gameEnd = true;
        this.endDisplay.winAnimation();
        stopIntervals();
        //this.level.enemies.forEach(enemy => {enemy.stopIntervals()});
        //this.level.colectables.forEach(colectable => {colectable.stopIntervals()});
        this.level.enemies = [];
        this.level.colectables = [];
        //this.character.stopIntervals();
        setTimeout(() => stopGame(), 3000);
    }

    loseGame() {
        this.gameEnd = true;
        this.endDisplay.loseAnimation();
        stopIntervals();
        //this.level.enemies.forEach(enemy => {enemy.stopIntervals()});
        //this.level.colectables.forEach(colectable => {colectable.stopIntervals()});
        this.level.enemies = [];
        this.level.colectables = [];
        //this.character.stopIntervals();
        setTimeout(() => stopGame(), 3000);
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
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectToMap(object) {
        object.forEach(o => {
            this.addToMap(o);
        });
    }
        
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }
    
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
            this.ctx.restore();
    }

}