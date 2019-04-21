// create a new scene
let bootScene = new Phaser.Scene('Boot');

bootScene.preload = function () {
    // Loadscreen
    this.load.image('chomp', 'assets/chompzilla.png');
    this.load.image('games', 'assets/games.png');

    // Dino Sprite Sheet
    this.load.spritesheet('dino', 'assets/dino.png', {
        frameWidth: 80,
        frameHeight: 60,
    });
}

bootScene.create = function () {
    this.scene.start('Loading')
}