/**
 * Represents a game level, managing enemies, collectables, clouds,
 * background elements, and dynamically updating the level's endpoint.
 */

class Level {
  enemies;
  colectables;
  clouds;
  backgroundObjects;
  level_end_x = 15000;

  /**
   * Creates a new Level instance.
   * @param {Array} enemies - Array of enemy objects
   * @param {Array} colectables - Array of collectable objects
   * @param {Array} clouds - Array of cloud objects
   * @param {Array} backgroundObjects - Array of background objects
   */
  constructor(enemies, colectables, clouds, backgroundObjects) {
    this.enemies = enemies;
    this.colectables = colectables;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    setStoppableInterval(() => this.setLevelendToBoss(), 200);
  }

  /**
   * Dynamically updates the level's end X position based on the Endboss position.
   */
  setLevelendToBoss() {
    this.level_end_x = world.endboss.x + 50;
  }
}
