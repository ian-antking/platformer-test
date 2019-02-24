import 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  physics: {
    default: 'arcde',
    arcade: {
      gravity: {
        y: 500,
      },
      debug: false,
    },
  }
};
