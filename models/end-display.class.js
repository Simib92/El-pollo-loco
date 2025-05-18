class EndDisplay extends DrawableObject {

    ENDIMAGE_WON = [
        'img/You won, you lost/You Won B.png'
    ];

    ENDIMAGE_LOSE = [
        'img/You won, you lost/Game Over.png'
    ];


    loseAnimation() {
        this.x = 50;
        this.y = 50;
        this.width = 620;
        this.height = 380;
        this.loadImage(this.ENDIMAGE_LOSE);
    }

    winAnimation() {
        this.x = 50;
        this.y = 150;
        this.width = 620;
        this.height = 200;
        this.loadImage(this.ENDIMAGE_WON);
    }
}