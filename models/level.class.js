class Level {
    enemies;
    colectables;
    clouds;
    backgroundObjects;
    level_end_x = 15000;

    constructor(enemies, colectables, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.colectables = colectables;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        setStoppableInterval(() => this.setLevelendToBoss(), 200);
    }

    setLevelendToBoss() {
        this.level_end_x = world.endboss.x + 50;        
    }
}