import Paddle from './game/paddle';

export default class GameScene extends Phaser.Scene {
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private paddle!: Paddle;
    private ball!: Phaser.Physics.Matter.Image;
    private readonly blocks: Phaser.Physics.Matter.Image[] = [];

    private lives: number = 3;
    private livesLabel!: Phaser.GameObjects.Text;

    constructor() {
        super('game');
    }

    init(): void {
        if (this.input.keyboard != null) {
            this.cursors = this.input.keyboard.createCursorKeys();
        }
        this.lives = 3;
    }

    create(): void {
        const { width, height } = this.scale;

        let x = 128;
        for (let i = 0; i < 5; i++) {
            const block = this.matter.add
                .image(x, 100, 'block', undefined, {
                    isStatic: true,
                })
                .setTint(0x00ff00)
                .setData('type', 'block');
            this.blocks.push(block);
            x += block.width;
        }
        this.ball = this.matter.add.image(400, 330, 'ball', undefined, {
            circleRadius: 32,
        });

        const ballBody = this.ball.body as MatterJS.BodyType;
        this.matter.body.setInertia(ballBody, Infinity);

        this.ball.setFriction(0, 0);
        this.ball.setBounce(1);

        this.paddle = new Paddle(this.matter.world, width * 0.5, height * 0.9, 'paddle', {
            isStatic: true,
            chamfer: {
                radius: 15,
            },
        });

        this.paddle.attachBall(this.ball);

        this.livesLabel = this.add.text(10, 10, `Lives: ${this.lives}`, {
            fontSize: 24,
        });

        this.ball.setOnCollide(this.handleBallCollide.bind(this));
    }

    private handleBallCollide(data: Phaser.Types.Physics.Matter.MatterCollisionData): void {
        const { bodyA } = data;
        if (bodyA.gameObject === null) return;

        const goA = bodyA.gameObject as Phaser.GameObjects.GameObject;
        if (goA.getData('type') !== 'block') return;

        goA.destroy(true);

        const idx = this.blocks.findIndex((block) => block === goA);
        if (idx >= 0) {
            this.blocks.splice(idx, 1);
        }
    }

    update(): void {
        if (this.ball.y > this.scale.height + 100) {
            --this.lives;
            this.livesLabel.text = `Lives: ${this.lives}`;
            this.paddle.attachBall(this.ball);
            return;
        }

        const spaceJustDown = Phaser.Input.Keyboard.JustDown(this.cursors.space);
        if (spaceJustDown) {
            this.paddle.launch();
        }
        this.paddle.update(this.cursors);
    }
}
