class ThrowableObject extends MovableObject {

IMAGES_ROTATION = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
];

IMAGES_SPLASH = [
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
];

isBroke = false;

constructor(x, y) {
    super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 100;
    this.width = 60;
    this.trow();
}

trow() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
        this.animate();
        this.x += 6;
    }, 40)
}

animate() {
    setInterval(() => { if (this.speedY > 0) {
                    this.playAnimation(this.IMAGES_ROTATION);           
                    } else {this.playAnimation(this.IMAGES_ROTATION);           
    }
    }, 20);
}

splashBottle() {
    this.isBroke = true;
    this.speedY = 0;
    this.acceleration = 0;
    this.x -= 6;
}

iscrash() {
    return this.y > 270;
}
}