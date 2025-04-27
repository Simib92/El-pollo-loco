class Endboss extends MovableObject{

    height = 400;
    width = 400;
    y = 70;
    energy = 2000;
    startAnimation = false;
    endbossAttack = 0;
    type = 'boss';
    isHit = false;


    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 15000;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.energy > 1) {
            
            if (!this.startAnimation && world.character.x <= 14700) {
                this.playAnimation(this.IMAGES_ALERT);
            }
            if (world.character.x > 14700) {
                this.startAnimation = true; 
            }
            if (this.startAnimation && this.endbossAttack < 100) {
                    this.playAnimation(this.IMAGES_WALKING);
                    this.speed = 5;
                    this.moveLeft();
                    this.endbossAttack += 5;
                    console.log(this.endbossAttack);
            }
            if (this.endbossAttack >= 100) {
                this.playAnimation(this.IMAGES_ATTACK);
                this.speed = 15;
                this.moveLeft();
                setTimeout(() => this.resetAttck(), 2000)
            }} else {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 200);

        setInterval(() => {
            if (this.isHit) {
                this.playAnimation(this.IMAGES_HURT);
            }
        }, 200)
    }

    resetAttck() {
        this.endbossAttack = 0;
    }
        
}