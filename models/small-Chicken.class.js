class SmallChicken extends MovableObject {
    energy = 100;
    type = 'normal'

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]

    constructor(height, width, y) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.y = y;
        this.height = height;
        this.width = width;
        this.x = 400 + Math.random() * 16000;
        this.speed = 0.15 + Math.random() * 0.5;
        //this.animate();
        this.setStoppableInterval(() => this.animateWalk(), 1000 / 60);
        this.setStoppableInterval(() => this.animateImg(), 200);
    }

    animateWalk() {
        if (this.energy > 1) {
                this.moveLeft();
        }
    }

    animateImg() {
        if (this.energy > 1) {
            this.playAnimation(this.IMAGES_WALKING);
        }
        else {
            this.playAnimation(this.IMAGES_DEAD);
            setTimeout(() => this.stopIntervals(), 2000)
        }
    }

    /*animate() {
        setInterval(() => {
            if (this.energy > 1) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
                if (this.energy > 1) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
                else {
                    this.playAnimation(this.IMAGES_DEAD);
                }
        }, 200);
    }*/
}