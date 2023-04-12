import GameScene from "./scenes/game.js"
import Bootloader from "./Bootloader.js"
import Menu from "./scenes/menu.js"
import GameOver from "./scenes/gameOver.js"

const config = {
    width: 710,
    height: 500,
    parent: "contenedor",
    backgroundColor: 0x2f2f2f,
    physics: {
        default: "arcade",
        arcade: {
        }
    },
    scene: [
        Bootloader,
        Menu,
        GameScene,
        GameOver
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH    
    }
}

new Phaser.Game(config)