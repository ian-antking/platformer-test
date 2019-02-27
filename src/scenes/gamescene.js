import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {

  }

  create() {
    // map
    this.map = this.make.tilemap({ key: 'map' });
    this.groundTiles = this.map.addTilesetImage('tiles');
    this.groundLayer = this.map.createDynamicLayer('World', this.groundTiles, 0, 0);
    this.groundLayer.setCollisionByExclusion([-1]);
    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    // player
    this.player = this.physics.add.sprite(200, 200, 'player');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.groundLayer, this.player);

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNames('player', {
        prefix: 'p1_walk',
        start: 1,
        end: 11,
        zeroPad: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'idle',
      frames: [{
        key: 'player',
        frame: 'p1_stand',
      }],
      frameRate: 10,
    });

    this.anims.create({
      key: 'jump',
      frames: [{
        key: 'player',
        frame: 'p1_jump',
      }],
      frameRate: 10,
    });

    // controls
    this.cursors = this.input.keyboard.createCursorKeys();

    // camera
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBackgroundColor('#ccccff');
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-200);
      this.player.anims.play('walk', true);
      this.player.flipX = true;
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(200);
      this.player.anims.play('walk', true);
      this.player.flipX = false;
    } else {
      this.player.body.setVelocityX(0);
      this.player.anims.play('idle', true);
    }
    if (this.cursors.up.isDown && this.player.body.onFloor()) {
      this.player.body.setVelocityY(-500);
    }
  }
}
