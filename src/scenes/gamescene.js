import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {

  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    const groundTiles = map.addTilesetImage('tiles', 'map-tiles');

    const groundLayer = map.createStaticLayer('World', groundTiles, 0, 0);
    groundLayer.setCollisionByExclusion([-1]);
    this.physics.world.bounds.width = groundLayer.width;
    this.physics.world.bounds.height = groundLayer.height;
    
  }
}
