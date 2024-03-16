import Phser from 'phaser';

export default class Preloader extends Phser.Scene {
    constructor() {
        super('preloader');
    }

    preload(): void {
        this.load.image('ball', 'asset/image/ball.png');
        this.load.image('paddle', 'asset/image/paddle.png');
        this.load.image('block', 'asset/image/block.png');
    }

    create(): void {
        this.scene.start('game');
    }
}
