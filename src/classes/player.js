import { Actor } from "./actor";
import { Math } from "phaser";

export class Player extends Actor {
    constructor(scene, x, y) {
        super(scene, x, y, 'adventurer')

        this.keyW = this.scene.input.keyboard.addKey('W')
        this.keyA = this.scene.input.keyboard.addKey('A')
        this.keyS = this.scene.input.keyboard.addKey('S')
        this.keyD = this.scene.input.keyboard.addKey('D')

        this.setScale(0.5)

        this.body.setSize(55, 85)
        this.body.setOffset(82,55)

        console.log(this)
        this.initAnimations()
    }

    fire() {
        // console.log('Yah yeert');
        // console.log(this.body.touching.down);
        this.scene.bulletGroup.fireBullet(this.x + 10, this.y)

    }
    addEvents() {
        this.scene.input.on('pointerdown', (pointer) => {
            this.fire()
            console.log(this)
        })
        // this.scene.input.on('pointermove', (pointer) => {
        //     this.updatePosition()
        // })
    }



    initAnimations() {
        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNames('player', {
                prefix: 'idle-',
                end: 5
            }),
            frameRate: 12
        })

        this.scene.anims.create({
            key: 'run',
            frames: this.scene.anims.generateFrameNames('player', {
                prefix: 'run-',
                end: 7
            }),
            frameRate: 12
        })
    }

    hitGround() {
        console.log(this.canJump);
        return !this.canJump
    }

    update() {





        if (this.body.velocity.x > 0) {

            this.body.velocity.x -= 28
        } else if (this.body.velocity.x < 0) {
            this.body.velocity.x += 28
        }



        if (this.keyW.isDown) {
            this.body.velocity.y = -150;
        }

        if (this.keyA.isDown) {
            this.anims.play('run', true)
            this.body.velocity.x = -500;
            this.checkFlip();

        }
        else if (this.keyD.isDown) {
            this.anims.play('run', true)
            this.body.velocity.x = 500
            this.checkFlip();


        }
        else {
            this.anims.play('idle', true)

        }
    }
}
