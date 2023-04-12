import Cactus from "../gameObjects/cactus.js"
import Runner from "../gameObjects/runner.js"
import Bird from "../gameObjects/bird.js"

let jumpAudio = document.getElementById("jump")
let gameOverAudio = document.getElementById("gameOver")
export default class GameScene extends Phaser.Scene{
    constructor(){
        super({key: "Game"})
    }

    create(){

        // Creating sprites //
        this.ground = this.physics.add.image(355, 465, "ground")
        this.ground.setGravityY(2000)
        this.runner = new Runner (this, 100, 270, "Runner")/* .setScale(0.2) */

        this.puntos = 0
        this.puntosText = this.add.text(125, 0, "0", {fontFamily: "Text menu", fontSize: 30})
        this.add.text(0, 0, "Score:", {fontFamily: "Text menu", fontSize: 30})

        this.puntosIntervalo = setInterval(() => {this.puntos++; this.puntosText.setText(this.puntos)}, 300)

        this.runner.setInteractive()
        this.jumping = false

        this.cactus = this.physics.add.group()
        this.bird = this.physics.add.group()

        this.cactusInterval = setInterval(() => {this.cactus.add(new Cactus (this, 700, 393, "Cactus"))
                            this.timerBird = setTimeout(() => {this.bird.add(new Bird (this, 700, 280, "bird"))}, 700)
                            this.bird.playAnimation("fly")}
        , Math.floor((Math.random()* (3000 - 2000 + 1)) + 2000))
        
        //animation
        this.anims.create({
            key: "walk",
            frames: this.anims.generateFrameNumbers("Runner", {
                frames: [0, 1]
            }),
            repeat: -1,
            frameRate: 4,
            duration: 0
        })

        this.anims.create({
            key: "fly",
            frames: this.anims.generateFrameNumbers("bird", {
                frames: [0, 1, 2, 3, 4]
            }),
            repeat: -1,
            frameRate: 5,
            duration: 0
        })

        this.anims.create({
            key: "jump",
            frames: this.anims.generateFrameNumbers("Runner", {
                frames: [2, 3]
            }),
            repeat: -1,
            frameRate: 10,
            duration: 0
        })

        this.runner.anims.play("walk")

        // Colitions //
        this.ground.setCollideWorldBounds(true)
        this.colideCactus = this.physics.add.collider(this.ground, this.cactus.getChildren(), this.stop, null, this)
        this.colideRunner = this.physics.add.collider(this.runner, this.cactus.getChildren(), this.stop, null, this)
        this.colideBird = this.physics.add.collider(this.runner, this.bird.getChildren(), this.stop, null, this)

        this.colide = this.physics.add.collider(this.ground, this.runner, () => {this.jumping = true}, null, this.scene)

        // movements
        this.cursorSpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    stop(){ 
        clearInterval(this.cactusInterval)
        clearInterval(this.puntosInterval)
        clearTimeout(this.timerBird)
        this.scene.start("Game Over", this.puntos)
        this.bird.clear(true, true)
    }
 
    update(){
        if (this.cursorSpace.isDown && this.jumping === true){
            this.runner.body.setVelocityY(-600)
            this.runner.anims.play("jump")
            jumpAudio.play()
            let timer = setTimeout(() => {
                this.jumping = false
                let timer2 = setTimeout(() => {this.runner.anims.play("walk")}, 550)
            }, 170);
        }
        switch(true){
            case this.puntos > 100 && this.puntos < 300:
                this.cactus.setVelocityX(-400)
                this.bird.setVelocityX(-400)
                this.runner.body.setGravityY(1900)
                break;

            case this.puntos > 300 && this.puntos < 500:
                this.cactus.setVelocityX(-450)
                this.bird.setVelocityX(-450)
                break;

            case this.puntos > 500 && this.puntos < 700:
                this.cactus.setVelocityX(-500)
                this.bird.setVelocityX(-500)
                break;

            case this.puntos > 700 && this.puntos < 900:
                this.cactus.setVelocityX(-550)
                this.bird.setVelocityX(-550)
                break;

            case this.puntos > 900 && this.puntos < 1000:
                this.cactus.setVelocityX(-600)
                this.bird.setVelocityX(-600)
                this.runner.body.setGravityY(1800)
                break;
            
            case this.puntos > 1000:
                this.cactus.setVelocityX(-700)
                this.bird.setVelocityX(-700)
                break;

            default:
                this.cactus.setVelocityX(-350)
                this.bird.setVelocityX(-350)
                break;

        }
        if (this.jumping === true){
            this.runner.on("pointerup", () => {
                this.runner.body.setVelocityY(-700)
                this.runner.anims.play("jump")
                jumpAudio.play()
                let timer = setTimeout(() => {
                    this.jumping = false
                    let timer2 = setTimeout(() => {this.runner.anims.play("walk")}, 550)
                }, 170);

            })
        }
    }
}