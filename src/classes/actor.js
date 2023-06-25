import Phaser from "phaser";

export default class Actor extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame = 0) {
    super(scene, x, y, texture, frame);
    
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this);
    this.getBody().setCollideWorldBounds(true);
    this.live = 1;
  }

  getDamage(value) {
    this.scene.tweens.add({
      targets: this,
      duration: 100,
      repeat: 3,
      yoyo: true,
      alpha: 0.5,
      onStart: () => {
        if(value) this.live = this.live - value
      },
      onComplete: () => {
        this.setAlpha(1)
      }
    })
  }

  getLive() {
    return this.live;
  }

  // método para checar e girar o ator para a esquerda ou direitra
  // no caso do artigo de exemplo
  checkFlip() {
    throw new Error('not implemented');
  }

  getBody() {
    return this.body;
  }
  
}