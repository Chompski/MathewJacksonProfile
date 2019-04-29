//create a new scene
let gameScene = new Phaser.Scene('Game');

// initisate scene params
gameScene.init = function () {
    this.bounceSide = false
    this.bounceVert = false
}

// Load assets
gameScene.preload = function () {

    this.load.spritesheet('eye', 'assets/eye.png', {
        frameWidth: 148,
        frameHeight: 125,
    });

    this.load.spritesheet('fire', 'assets/fire.png', {
        frameWidth: 148,
        frameHeight: 125,
    });


}

//called once after preload
gameScene.create = function () {
    this.anims.create({
        key: 'burn',
        frames: this.anims.generateFrameNames('fire', {
            frames: [0, 1, 2, 3, 4, 5, 6, 7]
        }),
        frameRate: 6,
        yoyo: true,
        repeat: -1,
    });

    this.fire = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'fire', 0).setScale(3);
    this.eye = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'eye', 0).setScale(3);

    this.fire.anims.play('burn');

    // Watch pointer
    this.input.on('pointermove', function (pointer) {

        // right side
        if (pointer.x > 900 && pointer.y < 150) {
            gameScene.eye.setFrame(5)
        }

        if (pointer.x > 900 && pointer.y > 250) {
            gameScene.eye.setFrame(7)
        }

        if (pointer.x > 900 && pointer.y > 150 && pointer.y < 250) {
            gameScene.eye.setFrame(6)
        }

        // left side
        if (pointer.x < 900 && pointer.y < 150) {
            gameScene.eye.setFrame(3)
        }

        if (pointer.x < 900 && pointer.y > 250) {
            gameScene.eye.setFrame(1)
        }

        if (pointer.x < 900 && pointer.y > 150 && pointer.y < 250) {
            gameScene.eye.setFrame(2)
        }

        //down
        if (pointer.y >= 360) {
            gameScene.eye.setFrame(8)
        }

        //up
        if (pointer.y <= 40) {
            gameScene.eye.setFrame(4)
        }


    }, this)
}

// this is called up to 60 times per second
gameScene.update = function () {
    
    //side to side
    // if (this.eye.x <= 910 && this.bounceSide === false) {
    //     this.eye.x += 0.5
    //     if (this.eye.x >= 910) {
    //         this.bounceSide = true
    //     }
    // }

    // if (this.eye.x <= 910 && this.bounceSide === true) {
    //     this.eye.x -= 0.5
    //     if (this.eye.x === 890) {
    //         this.bounceSide = false
    //     }
    // }

    // up and down
    if (this.eye.y <= 210 && this.bounceVert === false) {
        this.eye.y += 0.5
        if (this.eye.y >= 210) {
            this.bounceVert = true
        }
    }

    if (this.eye.y <= 210 && this.bounceVert === true) {
        this.eye.y -= 0.5
        if (this.eye.y === 190) {
            this.bounceVert = false
        }
    }


    this.fire.y = this.eye.y
    // this.fire.x = this.eye.x

};







//set config
let config = {
    type: Phaser.AUTO,
    width: 1800,
    height: 400,
    pixelArt: true,
    zoom: 1,
    transparent: true,
    scene: gameScene,
    parent: 'phaser'

};

// create a new game
let game = new Phaser.Game(config);
