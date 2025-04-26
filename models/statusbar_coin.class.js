class StatusbarCoin extends StatusBar {
    
    IMAGES_COIN_STATUS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN_STATUS);
        this.x = 20;
        this.y = 42;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0, this.IMAGES_COIN_STATUS);
    }
}