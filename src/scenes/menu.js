let bgMusic = document.getElementById("bg")
export default class Menu extends Phaser.Scene{
    constructor(){
        super({key: "menu", activate: true})
    }

    create(){
        //TITULO Y BOTON
        const configText = {
            x: 122,
            y: 130,
            text: "Runner",
            style: {
                fontFamily: "Text menu",
                color: "#ffffff",
                fontSize: 96
            }
        }
        this.make.text(configText)
        /* this.add.text(205, 200, "RuNNer", {fill: "#ffffff", fontFamily:"text menu", fontSize: 96}) */
        this.button = this.add.sprite(340, 385, "Start")
        //TITULO Y BOTON
        
        this.button.setInteractive()
        this.button.on("pointerdown", () => {
            this.scene.launch("Game")
            bgMusic.loop = true
            bgMusic.play()
            this.scene.stop()
        })
    }
}

// Tamaño de sprite 80px por 90px //