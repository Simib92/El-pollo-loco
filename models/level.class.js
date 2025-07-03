// Represents a level in the game. Holds data for enemies, collectables, 
// background elements, and dynamically updates the level's endpoint

class Level {
  enemies;
  colectables;
  clouds;
  backgroundObjects;
  level_end_x = 15000;

  //Constructs a new Level instance
  constructor(enemies, colectables, clouds, backgroundObjects) {
    this.enemies = enemies;
    this.colectables = colectables;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    setStoppableInterval(() => this.setLevelendToBoss(), 200);
  }

  //Updates the level's end position to just beyond the current endboss location
  setLevelendToBoss() {
    this.level_end_x = world.endboss.x + 50;
  }
}
