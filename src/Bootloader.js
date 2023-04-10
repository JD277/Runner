export default class Bootloader extends Phaser.Scene{
    constructor(){
        super({key: "Bootloader"})
    }
    preload(){
        this.load.on("complete", () => {
            this.scene.start("menu")
        })
        this.load.spritesheet("Runner", "../assets/Runner.png", {frameWidth: 80, frameHeight: 90})
        this.load.image("ground", "../assets/ground.png")
        this.load.image("Start", "../assets/Start.png")
        this.load.image("Cactus", "../assets/Cactus.png")
        this.load.spritesheet("bird", "../assets/bird.png", {frameWidth: 64}, {frameHeight: 64})
    }
}