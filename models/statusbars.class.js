class StatusBar extends DrawableObject {
    
    percentage;
    IMAGES = [];

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImagesIndex()]
        this.img = this.imageCache[path];
    }

    resolveImagesIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
    
}