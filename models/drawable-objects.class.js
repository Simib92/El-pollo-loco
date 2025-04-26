class DrawableObject {
    height = 160;
    width = 120;
    x = 100;
    y = 290;
    img;
    imageCache = {};
    currentImage = 0;
    frameX;
    frameY;
    frameWidth;
    frameHeight;

    
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Chicken || this instanceof ThrowableObject) {
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.beginPath();
            ctx.rect(this.x + 15, this.y + 15, this.width - 30, this.height - 30);
            ctx.stroke();
            this.frameX = this.x + 15;
            this.frameY = this.y + 15;
            this.frameWidth = this.width - 30;
            this.frameHeight = this.height - 30;
        }
        if ( this instanceof Endboss) {
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.beginPath();
            ctx.rect(this.x + 15, this.y + 80, this.width - 30, this.height - 90);
            ctx.stroke();
            this.frameX = this.x + 15;
            this.frameY = this.y + 80;
            this.frameWidth = this.width - 30;
            this.frameHeight = this.height - 90; 
        }
        if (this instanceof Character) {
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.beginPath();
            ctx.rect(this.x + 20, this.y + 110, this.width - 40, this.height - 120);
            ctx.stroke();
            this.frameX = this.x + 20;
            this.frameY = this.y + 110;
            this.frameWidth = this.width - 40;
            this.frameHeight = this.height - 120; 
        }
        if (this instanceof Colectables) {
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.beginPath();
            ctx.rect(this.x + 40, this.y + 40, this.width - 80, this.height - 80);
            ctx.stroke(); 
            this.frameX = this.x + 40;
            this.frameY = this.y + 40;
            this.frameWidth = this.width - 80;
            this.frameHeight = this.height - 80;
        }
    } 

    loadImages(arr) {
        arr.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
    });
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;;
    }


}