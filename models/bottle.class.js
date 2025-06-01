class Bottle extends Colectables {
    
    type = 'bottle';

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]

    constructor() {
            super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
            this.loadImages(this.IMAGES_BOTTLE);
            this.x = 200 + Math.random() * 15000;
            //this.animate();
            this.setStoppableInterval(() => this.animate(), 500);
        }
        
        animate() {
                this.playAnimation(this.IMAGES_BOTTLE);
        }
}