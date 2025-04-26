class Coin extends Colectables {
    height = 120;
    width = 120;
    y = 330;
    
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]

    constructor() {
            super().loadImage('img/8_coin/coin_1.png');
            this.loadImages(this.IMAGES_COIN);
            this.x = 200 + Math.random() * 500;
            this.y = 330 + Math.random() * -300;
            this.animate();
            }
        
         animate() {
            setInterval(() => {
                this.playAnimation(this.IMAGES_COIN);
            }, 500);
        }
}