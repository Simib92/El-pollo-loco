class World {
    character = new Character();
    chicken = new Chicken();
    endboss = new Endboss();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    colectables = new Colectables();
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setworld();
        this.run();
        this.runFasterChecks();
    }

    setworld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
        this.checkCollisions();
        this.checkThrowObjects(); 
        }, 100);
    }

    runFasterChecks() {
        setInterval(() => {
            this.checkJumpOnEnemie();
            this.checkColectables();
            }, 50);
    }
    
 
    checkThrowObjects() {
        if(this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.checkDemage(bottle);
        }
    }

    checkJumpOnEnemie() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isJumpOnEnemy(enemy)) {
                enemy.energy -= 100;
                    if (enemy.energy < 1) {
                        const index = this.level.enemies.indexOf(enemy);
                        if (index > -1) {
                        this.level.enemies.splice(index, 1);
                    }
                    } 
                    jumb();
            }}
        );
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy)
        }});
    }

    checkDemage(bottle) {
        setInterval(() => { 
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    enemy.energy -= 100;
                    if (enemy.energy < 1) {
                        const index = this.level.enemies.indexOf(enemy);
                        if (index > -1) {
                        this.level.enemies.splice(index, 1);
                    }
                    } 
                }});
            ;
            }, 50); 
    } 
 
    checkColectables() {
            this.level.colectables.forEach((colectables) => {
                if (this.character.isColliding(colectables)) {
                    console.log('colected');
                    const index = this.level.colectables.indexOf(colectables);
                        if (index > -1) {
                        this.level.colectables.splice(index, 1);
                        } 
            }});
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        //space for fixed objects.
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);  
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.enemies);
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