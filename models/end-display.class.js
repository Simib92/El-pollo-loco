class EndDisplay extends DrawableObject {

    ENDIMAGE_WON = [
        'img/You won, you lost/You Won B.png'
    ];

    ENDIMAGE_LOSE = [
        'img/You won, you lost/Game Over.png'
    ];

    STARTIMAGE = [
        'img/9_intro_outro_screens/start/startscreen_1.png'
    ];

    constructor() {
        super();
    }

    startAnimation() {
        this.x = 0;
        this.y = 0;
        this.width = 720;
        this.height = 480;
        this.loadImage(this.STARTIMAGE);
    }

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