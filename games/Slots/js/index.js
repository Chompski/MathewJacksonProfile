// our game's configuration
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [bootScene, loadingScene, gameScene],
    title: 'Slots',
    pixelArt: true,
    zoom: 1,
    backgroundColor: 'ffffff'
  };
  
  // create the game, and pass it the configuration
  let game = new Phaser.Game(config);