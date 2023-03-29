export default class Cactus extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, type){
        super(scene, x, y, type)
        this.scene.add.existing(this)
        this.scene.physics.world.enable(this)
        this.body.setGravityY(2000)
    }
}