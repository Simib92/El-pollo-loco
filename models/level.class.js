class Level {
    enemies;
    colectables;
    clouds;
    backgroundObjects;
    level_end_x = 10000;

    constructor(enemies, colectables, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.colectables = colectables;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}