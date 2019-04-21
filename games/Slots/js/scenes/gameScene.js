//create a new scene
let gameScene = new Phaser.Scene('Game');

// initisate scene params
gameScene.init = function () {
    this.money = 0.00
    this.spinning = false
    this.nudges = 0
    this.win = false
    this.music = 'BG'

    this.reelOne = 0
    this.reelTwo = 0
    this.reelThree = 0
}

// Load assets
gameScene.preload = function () {
  
}

gameScene.create = function () {
    //Showdown music
    this.showdown = this.sound.add('showdown', { volume: 0.4, loop: true });
    //BG music
    this.BGmusic = this.sound.add('BGmusic', { volume: 0.4, loop: true });
    //Reel sound
    this.reelSound = this.sound.add('reel', { volume: 0.5, loop: false });
    //Win sound
    this.winSound = this.sound.add('win', { volume: 0.5, loop: false });
    //Fire sound
    this.fireSound = this.sound.add('fire', { volume: 0.5, loop: false });
    //Empty sound
    this.emptySound = this.sound.add('empty', { volume: 0.5, loop: false });
    //Load sound
    this.loadSound = this.sound.add('load', { volume: 0.5, loop: false });

    // play game music
    this.BGmusic.play();

    this.add.image(400, 250, 'back').setScale(1.4);
    this.add.image(380, 50, 'title').setScale(1);
    this.add.image(700, 50, 'numBack').setScale(0.3);

    //Win Line
    this.midOne = this.add.sprite(230, 290, 'reel', random(1, 8)).setScale(0.5);
    this.midTwo = this.add.sprite(380, 290, 'reel2', random(1, 8)).setScale(0.5);
    this.midThree = this.add.sprite(530, 290, 'reel3', random(1, 8)).setScale(0.5);

    //Top Line
    this.topOne = this.add.sprite(230, 160, 'reel', this.midOne.frame.name - 1).setScale(0.5);
    this.topTwo = this.add.sprite(380, 160, 'reel2', this.midTwo.frame.name - 1).setScale(0.5);
    this.topThree = this.add.sprite(530, 160, 'reel3', this.midThree.frame.name - 1).setScale(0.5);

    //Bottom Line
    this.botOne = this.add.sprite(230, 420, 'reel', this.midOne.frame.name + 1).setScale(0.5);
    this.botTwo = this.add.sprite(380, 420, 'reel2', this.midTwo.frame.name + 1).setScale(0.5);
    this.botThree = this.add.sprite(530, 420, 'reel3', this.midThree.frame.name + 1).setScale(0.5);

    // Play button
    this.button = this.add.sprite(700, 550, 'button').setInteractive().setScale(0.3);
    this.button.on('pointerdown', this.spin);

    //Nudge buttons
    // Reel 1
    this.nudgeOneUpButton = this.add.sprite(230, 520, 'up').setInteractive().setScale(0.3).on('pointerdown', this.nudgeOneUp);
    this.nudgeOneDownButton = this.add.sprite(230, 570, 'down').setInteractive().setScale(0.3).on('pointerdown', this.nudgeOneDown);
    // Reel 2
    this.nudgeTwoUpButton = this.add.sprite(380, 520, 'up').setInteractive().setScale(0.3).on('pointerdown', this.nudgeTwoUp);
    this.nudgeTwoDownButton = this.add.sprite(380, 570, 'down').setInteractive().setScale(0.3).on('pointerdown', this.nudgeTwoDown);
    // Reel 3
    this.nudgeThreeUpButton = this.add.sprite(530, 520, 'up').setInteractive().setScale(0.3).on('pointerdown', this.nudgeThreeUp);
    this.nudgeThreeDownButton = this.add.sprite(530, 570, 'down').setInteractive().setScale(0.3).on('pointerdown', this.nudgeThreeDown);

    // Insert Coins Button
    this.insertButton = this.add.sprite(700, 170, 'insert').setInteractive().setScale(0.3);
    this.insertButton.on('pointerdown', this.insertCoins);

    // Revolver
    this.revolver = this.add.sprite(700, 420, 'rev', 0).setScale(1);


    this.anims.create({
        key: 'roll',
        frames: this.anims.generateFrameNames('reel', {
            frames: [1, 2, 3, 4, 5, 6, 7, 8]
        }),
        frameRate: 15,
        yoyo: false,
        repeat: -1,
    });

    this.anims.create({
        key: 'roll2',
        frames: this.anims.generateFrameNames('reel2', {
            frames: [1, 2, 3, 4, 5, 6, 7, 8]
        }),
        frameRate: 15,
        yoyo: false,
        repeat: -1,
    });

    this.anims.create({
        key: 'roll3',
        frames: this.anims.generateFrameNames('reel3', {
            frames: [1, 2, 3, 4, 5, 6, 7, 8]
        }),
        frameRate: 15,
        yoyo: false,
        repeat: -1,
    });

    // Money Text
    this.data.set('£', gameScene.money)
    this.text = this.add.text(655, 38, '', { font: '25px Courier' })
}

gameScene.update = function () {
    // Money Update
    this.data.set('£', gameScene.money)
    gameScene.text.setText([
        '£' + this.data.get('£').toFixed(2)
    ])

    if (gameScene.nudges >= 1 && gameScene.music === 'BG') {
        gameScene.music = 'showdown'
        gameScene.BGmusic.stop();
        gameScene.showdown.play();
    }
    if (gameScene.nudges === 0 && gameScene.music === 'showdown') {
        gameScene.music = 'BG'
        gameScene.showdown.stop();
        gameScene.BGmusic.play();
    }
    if (gameScene.money <= 0.00) {
        gameScene.nudges = 0
        gameScene.revolver.setFrame(0)
    }
}

gameScene.spin = function () {
    if (gameScene.money > 0.00 && gameScene.spinning === false) {
        gameScene.win = false
        gameScene.spinning = true
        gameScene.money -= 0.10
        //Play roll anim
        gameScene.midOne.anims.play('roll');
        gameScene.midTwo.anims.play('roll2');
        gameScene.midThree.anims.play('roll3');

        gameScene.topOne.anims.play('roll');
        gameScene.topTwo.anims.play('roll2');
        gameScene.topThree.anims.play('roll3');

        gameScene.botOne.anims.play('roll');
        gameScene.botTwo.anims.play('roll2');
        gameScene.botThree.anims.play('roll3');

        // Delay result
        setTimeout(function () {
            gameScene.reelSound.play();
            gameScene.midOne.anims.stop('roll');
            gameScene.midOne.setFrame(random(1, 8))

            gameScene.reelOne = gameScene.midOne.frame.name

            gameScene.topOne.anims.stop('roll');
            gameScene.topOne.setFrame(gameScene.midOne.frame.name + 1)

            gameScene.botOne.anims.stop('roll');
            gameScene.botOne.setFrame(gameScene.midOne.frame.name - 1)
        }, 800)
        setTimeout(function () {
            gameScene.reelSound.play();
            gameScene.midTwo.anims.stop('roll2');
            gameScene.midTwo.setFrame(random(1, 8))

            gameScene.reelTwo = gameScene.midTwo.frame.name

            gameScene.topTwo.anims.stop('roll2');
            gameScene.topTwo.setFrame(gameScene.midTwo.frame.name + 1)

            gameScene.botTwo.anims.stop('roll2');
            gameScene.botTwo.setFrame(gameScene.midTwo.frame.name - 1)
        }, 1400)
        setTimeout(function () {
            gameScene.reelSound.play();
            gameScene.midThree.anims.stop('roll3');
            gameScene.midThree.setFrame(random(1, 8))

            gameScene.reelThree = gameScene.midThree.frame.name

            gameScene.topThree.anims.stop('roll3');
            gameScene.topThree.setFrame(gameScene.midThree.frame.name + 1)

            gameScene.botThree.anims.stop('roll3');
            gameScene.botThree.setFrame(gameScene.midThree.frame.name - 1)

            // check for win
            gameScene.checkWin()
        }, 1800)
    }
}

gameScene.checkWin = function () {
    // Reel 1 - 1/Bag 2/Bar 3/Bullet 4/Cigar 5/Watch 6/Nugget 7/Watch 8/Cigar
    // Reel 2 - 1/Bullet 2/Nugget 3/Bullet 4/Cigar 5/Bar 6/watch 7/Nugget 8/Bag
    // Reel 3 - 1/Bag 2/Cigar 3/Bar 4/Bag 5/Bullet 6/Nugget 7/Watch 8/Bar

    // 3x Gold Bags
    if (gameScene.reelOne === 1 && gameScene.reelTwo === 8 && gameScene.reelThree === 1 || gameScene.reelOne === 1 && gameScene.reelTwo === 8 && gameScene.reelThree === 4) {
        gameScene.winSound.play();
        gameScene.win = true
        gameScene.money += 3.00
        this.cameras.main.shake(800);
    }
    // 3x Gold Bars
    if (gameScene.reelOne === 2 && gameScene.reelTwo === 5 && gameScene.reelThree === 3 || gameScene.reelOne === 2 && gameScene.reelTwo === 5 && gameScene.reelThree === 8) {
        gameScene.winSound.play();
        gameScene.win = true
        gameScene.money += 5.00
        this.cameras.main.shake(800);
    }
    // 3x Watch
    if (gameScene.reelOne === 5 && gameScene.reelTwo === 6 && gameScene.reelThree === 7 || gameScene.reelOne === 7 && gameScene.reelTwo === 6 && gameScene.reelThree === 7) {
        gameScene.winSound.play();
        gameScene.win = true
        gameScene.money += 2.00
        this.cameras.main.shake(800);

    }
    // 3x Nuggets
    if (gameScene.reelOne === 6 && gameScene.reelTwo === 7 && gameScene.reelThree === 6 || gameScene.reelOne === 6 && gameScene.reelTwo === 2 && gameScene.reelThree === 6) {
        gameScene.winSound.play();
        gameScene.win = true
        gameScene.money += 2.00
        this.cameras.main.shake(800);
    }
    // 3x Cigars
    if (gameScene.reelOne === 4 && gameScene.reelTwo === 4 && gameScene.reelThree === 2 || gameScene.reelOne === 8 && gameScene.reelTwo === 4 && gameScene.reelThree === 2) {
        gameScene.winSound.play();
        gameScene.win = true
        gameScene.money += 1.00
        this.cameras.main.shake(800);
    }
    // 3x Bullets
    if (gameScene.reelOne === 3 && gameScene.reelTwo === 1 && gameScene.reelThree === 5 || gameScene.reelOne === 3 && gameScene.reelTwo === 3 && gameScene.reelThree === 5) {
        gameScene.win = true
        if (gameScene.nudges >= 6) {
            gameScene.spinning = false
            return
        }
        setTimeout(function () {
            if (gameScene.nudges >= 6) {
                gameScene.spinning = false
                return
            }
            gameScene.nudges += 1
            gameScene.loadSound.play();
            gameScene.revolver.setFrame(gameScene.revolver.frame.name = gameScene.nudges)
        }, 200)
        setTimeout(function () {
            if (gameScene.nudges >= 6) {
                gameScene.spinning = false
                return
            }
            gameScene.nudges += 1
            gameScene.loadSound.play();
            gameScene.revolver.setFrame(gameScene.revolver.frame.name = gameScene.nudges)
        }, 400)
        setTimeout(function () {
            if (gameScene.nudges >= 6) {
                gameScene.spinning = false
                return
            }
            gameScene.nudges += 1
            gameScene.loadSound.play();
            gameScene.revolver.setFrame(gameScene.revolver.frame.name = gameScene.nudges)
        }, 600)
        setTimeout(function () {
            if (gameScene.nudges >= 6) {
                gameScene.spinning = false
                return
            }
            gameScene.nudges += 1
            gameScene.loadSound.play();
            gameScene.revolver.setFrame(gameScene.revolver.frame.name = gameScene.nudges)
        }, 800)
        setTimeout(function () {
            if (gameScene.nudges >= 6) {
                gameScene.spinning = false
                return
            }
            gameScene.nudges += 1
            gameScene.loadSound.play();
            gameScene.revolver.setFrame(gameScene.revolver.frame.name = gameScene.nudges)
        }, 1000)
        setTimeout(function () {
            if (gameScene.nudges >= 6) {
                gameScene.spinning = false
                return
            }
            gameScene.nudges += 1
            gameScene.loadSound.play();
            gameScene.revolver.setFrame(gameScene.revolver.frame.name = gameScene.nudges)
        }, 1200)
    }
    // 2 Bullets
    if (gameScene.reelOne === 3 && gameScene.reelTwo === 3 || gameScene.reelOne === 3 && gameScene.reelTwo === 1 || gameScene.reelThree === 5 && gameScene.reelTwo === 1 || gameScene.reelThree === 5 && gameScene.reelTwo === 3) {
        gameScene.win = true
        if (gameScene.nudges >= 6) {
            gameScene.spinning = false
            return
        }
        gameScene.nudges += 1
        gameScene.loadSound.play();
        gameScene.revolver.setFrame(gameScene.revolver.frame.name = gameScene.nudges)
    }
    gameScene.spinning = false
}

gameScene.nudgeOneDown = function () {
    if (gameScene.spinning === false && gameScene.nudges > 0 && gameScene.win === false) {
        //Change revolver
        gameScene.nudges -= 1
        gameScene.fireSound.play();
        gameScene.revolver.setFrame(gameScene.revolver.frame.name = gameScene.nudges)
        //Nudge Down
        if (gameScene.reelOne === 8) {
            gameScene.spinning = true
            gameScene.midOne.setFrame(1)
            gameScene.reelOne = gameScene.midOne.frame.name
            gameScene.botOne.setFrame(gameScene.reelOne - 1)
            gameScene.topOne.setFrame(gameScene.reelOne + 1)

            // check for win
            gameScene.checkWin()
        }
        else {
            gameScene.spinning = true
            gameScene.midOne.setFrame(gameScene.reelOne + 1)
            gameScene.reelOne = gameScene.midOne.frame.name
            gameScene.botOne.setFrame(gameScene.reelOne - 1)
            gameScene.topOne.setFrame(gameScene.reelOne + 1)

            // check for win
            gameScene.checkWin()
        }
    }
    else {
        gameScene.emptySound.play();
    }
}

gameScene.nudgeOneUp = function () {
    if (gameScene.spinning === false && gameScene.nudges > 0 && gameScene.win === false) {
        //Change revolver
        gameScene.nudges -= 1
        gameScene.fireSound.play();
        gameScene.revolver.setFrame(gameScene.revolver.frame.name = gameScene.nudges)
        // Nudge up
        if (gameScene.midOne.frame.name === 1) {
            gameScene.spinning = true
            gameScene.midOne.setFrame(8)
            gameScene.reelOne = gameScene.midOne.frame.name
            gameScene.botOne.setFrame(gameScene.reelOne - 1)
            gameScene.topOne.setFrame(gameScene.reelOne + 1)

            // check for win
            gameScene.checkWin()
        }
        else {
            gameScene.spinning = true
            gameScene.midOne.setFrame(gameScene.midOne.frame.name - 1)
            gameScene.reelOne = gameScene.midOne.frame.name
            gameScene.botOne.setFrame(gameScene.reelOne - 1)
            gameScene.topOne.setFrame(gameScene.reelOne + 1)

            // check for win
            gameScene.checkWin()
        }
    }
    else {
        gameScene.emptySound.play();
    }
}

gameScene.nudgeTwoDown = function () {
    if (gameScene.spinning === false && gameScene.nudges > 0 && gameScene.win === false) {
        //Change revolver
        gameScene.nudges -= 1
        gameScene.fireSound.play();
        gameScene.revolver.setFrame(gameScene.revolver.frame.name = gameScene.nudges)
        //Nudge Down
        if (gameScene.reelTwo === 8) {
            gameScene.spinning = true
            gameScene.midTwo.setFrame(1)
            gameScene.reelTwo = gameScene.midTwo.frame.name
            gameScene.botTwo.setFrame(gameScene.reelTwo - 1)
            gameScene.topTwo.setFrame(gameScene.reelTwo + 1)

            // check for win
            gameScene.checkWin()
        }
        else {
            gameScene.spinning = true
            gameScene.midTwo.setFrame(gameScene.reelTwo + 1)
            gameScene.reelTwo = gameScene.midTwo.frame.name
            gameScene.botTwo.setFrame(gameScene.reelTwo - 1)
            gameScene.topTwo.setFrame(gameScene.reelTwo + 1)

            // check for win
            gameScene.checkWin()
        }
    }
    else {
        gameScene.emptySound.play();
    }
}

gameScene.nudgeTwoUp = function () {
    if (gameScene.spinning === false && gameScene.nudges > 0 && gameScene.win === false) {
        //Change revolver
        gameScene.nudges -= 1
        gameScene.fireSound.play();
        gameScene.revolver.setFrame(gameScene.revolver.frame.name = gameScene.nudges)

        // Nudge up
        if (gameScene.spinning === false) {
            if (gameScene.midTwo.frame.name === 1) {
                gameScene.spinning = true
                gameScene.midTwo.setFrame(8)
                gameScene.reelTwo = gameScene.midTwo.frame.name
                gameScene.botTwo.setFrame(gameScene.reelTwo - 1)
                gameScene.topTwo.setFrame(gameScene.reelTwo + 1)

                // check for win
                gameScene.checkWin()
            }
            else {
                gameScene.spinning = true
                gameScene.midTwo.setFrame(gameScene.midTwo.frame.name - 1)
                gameScene.reelTwo = gameScene.midTwo.frame.name
                gameScene.botTwo.setFrame(gameScene.reelTwo - 1)
                gameScene.topTwo.setFrame(gameScene.reelTwo + 1)

                // check for win
                gameScene.checkWin()
            }
        }
    }
    else {
        gameScene.emptySound.play();
    }
}

gameScene.nudgeThreeDown = function () {
    if (gameScene.spinning === false && gameScene.nudges > 0 && gameScene.win === false) {
        //Change revolver
        gameScene.nudges -= 1
        gameScene.fireSound.play();
        gameScene.revolver.setFrame(gameScene.revolver.frame.name = gameScene.nudges)
        //Nudge Down
        if (gameScene.reelThree === 8) {
            gameScene.spinning = true
            gameScene.midThree.setFrame(1)
            gameScene.reelThree = gameScene.midThree.frame.name
            gameScene.botThree.setFrame(gameScene.reelThree - 1)
            gameScene.topThree.setFrame(gameScene.reelThree + 1)

            // check for win
            gameScene.checkWin()
        }
        else {
            gameScene.spinning = true
            gameScene.midThree.setFrame(gameScene.reelThree + 1)
            gameScene.reelThree = gameScene.midThree.frame.name
            gameScene.botThree.setFrame(gameScene.reelThree - 1)
            gameScene.topThree.setFrame(gameScene.reelThree + 1)

            // check for win
            gameScene.checkWin()
        }
    }
    else {
        gameScene.emptySound.play();
    }
}

gameScene.nudgeThreeUp = function () {
    if (gameScene.spinning === false && gameScene.nudges > 0 && gameScene.win === false) {
        //Change revolver
        gameScene.nudges -= 1
        gameScene.fireSound.play();
        gameScene.revolver.setFrame(gameScene.revolver.frame.name = gameScene.nudges)

        // Nudge up
        if (gameScene.spinning === false) {
            if (gameScene.midThree.frame.name === 1) {
                gameScene.spinning = true
                gameScene.midThree.setFrame(8)
                gameScene.reelThree = gameScene.midThree.frame.name
                gameScene.botThree.setFrame(gameScene.reelThree - 1)
                gameScene.topThree.setFrame(gameScene.reelThree + 1)

                // check for win
                gameScene.checkWin()
            }
            else {
                gameScene.spinning = true
                gameScene.midThree.setFrame(gameScene.midThree.frame.name - 1)
                gameScene.reelThree = gameScene.midThree.frame.name
                gameScene.botThree.setFrame(gameScene.reelThree - 1)
                gameScene.topThree.setFrame(gameScene.reelThree + 1)

                // check for win
                gameScene.checkWin()
            }
        }
    }
    else {
        gameScene.emptySound.play();
    }
}



gameScene.insertCoins = function () {
    gameScene.money += 1.00
}

let random = function (min, max) {
    let number = Math.random() * (max - min) + min;
    return Math.floor(number)
}


//set config
// let config = {
//     type: Phaser.AUTO,
//     width: 800,
//     height: 600,
//     pixelArt: false,
//     zoom: 1,
//     scene: gameScene,
//     parent: 'phaser'

// };

// create a new game
// let game = new Phaser.Game(config);