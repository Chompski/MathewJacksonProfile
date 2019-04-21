// create a new scene
let loadingScene = new Phaser.Scene('Loading');

loadingScene.preload = function () {
    // show logo
    this.add.sprite(this.sys.game.config.width / 2, 200, 'chomp').setScale(2.5);
    this.add.sprite(this.sys.game.config.width / 2, 400, 'games').setScale(2.5);
    this.dino = this.add.sprite(this.sys.game.config.width / 2, 300, 'dino', 0).setScale(3);

    // // load assets
    this.anims.create({
        key: 'move',
        frames: this.anims.generateFrameNames('dino', {
            frames: [0, 1, 2, 3, 4, 5]
        }),
        frameRate: 10,
        yoyo: true,
        repeat: 1,
    });

    loadingScene.dino.anims.play('move');

    //Images
    this.load.image('title', 'assets/title.png');
    this.load.image('button', 'assets/Spin.png');
    this.load.image('insert', 'assets/InsertCoins.png');
    this.load.image('back', 'assets/background.jpg');
    this.load.image('numBack', 'assets/numBack.png');
    this.load.image('up', 'assets/uparrow.png');
    this.load.image('down', 'assets/downarrow.png');

    //Audio
    this.load.audio('BGmusic', 'assets/sound/MusicMain.mp3');
    this.load.audio('reel', 'assets/sound/Reel.mp3');
    this.load.audio('win', 'assets/sound/Win.mp3');
    this.load.audio('fire', 'assets/sound/Fire.mp3');
    this.load.audio('empty', 'assets/sound/NoAmmo.mp3');
    this.load.audio('load', 'assets/sound/AddAmmo.mp3');
    this.load.audio('showdown', 'assets/sound/Music(Showdown).ogg');

    // Sprite Sheets
    this.load.spritesheet('reel', 'assets/Westslot.png', {
        frameWidth: 256,
        frameHeight: 256,
    });
    this.load.spritesheet('reel2', 'assets/Westslot2.png', {
        frameWidth: 256,
        frameHeight: 256,
    });
    this.load.spritesheet('reel3', 'assets/Westslot3.png', {
        frameWidth: 256,
        frameHeight: 256,
    });
    this.load.spritesheet('rev', 'assets/Rev.png', {
        frameWidth: 173,
        frameHeight: 148,
    });

};

loadingScene.create = function () {

    loadingScene.scene.start('Game')

}