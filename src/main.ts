import Phaser from 'phaser';
import Preloader from './scene/preloader';
import GameScene from './scene/gameScene';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'app',
    physics: {
        default: 'matter',
        matter: {
            debug: true,
            gravity: {
                x: 0,
                y: 0,
            },
            setBounds: {
                left: true,
                right: true,
                top: true,
                bottom: false,
            },
        },
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [Preloader, GameScene],
};

new Phaser.Game(config); // eslint-disable-line no-new
