export default class GameOver extends Phaser.Scene{
    constructor(){
        super({key: "Game Over"})
    }
    init(data){
        this.puntos = data
    }

    create(){
        // Texto puntos
        const configTextPoints = {
            x: 245,
            y: 235,
            text: "You score was: ",
            style: {
                fontFamily: "Text menu",
                color: "#FFFFFF",
                fontSize: 20
            }
        }
        this.make.text(configTextPoints)

        const configTextPoints2 = {
            x: 20,
            y: 130,
            text: "Game Over",
            style: {
                fontFamily: "Text menu",
                color: "#FF0000",
                fontSize: 96
            }
        }
        this.make.text(configTextPoints2)

        this.totalpoints = this.add.text(455, 235, "0", {fontFamily: "Text menu", fontSize: 20})
        this.totalpoints.setText(this.puntos)

        
        this.button = this.add.sprite(340, 385, "Start")
        
        this.button.setInteractive()
        this.button.on("pointerdown", () => {
            this.scene.start("Game")
        })
    }
}

// Tamaño de sprite 80px por 90px //