// Define the Level class globally
class Level {
    constructor(id, name, difficulty, scene, unlocked, mapName) {
        this.id = id;
        this.name = name;
        this.difficulty = difficulty;
        this.scene = scene;
        this.unlocked = unlocked;
        this.mapName = mapName;
        this.completed = false;
        this.score = 0;
    }
  
    complete(score) {
      this.completed = true;
      this.score = score > this.score ? score : this.score;
      // unlock next level
        levels[this.id + 1].setUnlocked(true);
    }

    setUnlocked(unlocked){
        this.unlocked = unlocked;
    }
}