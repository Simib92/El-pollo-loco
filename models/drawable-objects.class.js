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
  drawIntervalID = [];

  setStoppableInterval(fn, time) {
    const id = setInterval(fn, time);
    this.drawIntervalID.push(id);
    console.log("Neuer Intervall:", id);
  }

  stopIntervals() {
    this.drawIntervalID.forEach(clearInterval);
    this.drawIntervalID = [];
  }

  stopAllIntervals() {
    this.stopIntervals();
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx, flipped = false) {
    ctx.save();
    if (flipped) {
      ctx.translate(this.x + this.width, this.y);
      ctx.scale(-1, 1);
      ctx.drawImage(this.img, 0, 0, this.width, this.height);
    } else {
      ctx.translate(this.x, this.y);
      ctx.drawImage(this.img, 0, 0, this.width, this.height);
    }
    ctx.restore();
  }

  drawFrame(ctx) {
    if (this instanceof Chicken || this instanceof ThrowableObject) {
      ctx.lineWidth = "10";
      ctx.strokeStyle = "transparent";
      ctx.beginPath();
      ctx.rect(this.x + 10, this.y + 5, this.width - 20, this.height - 20);
      ctx.stroke();
      this.frameX = this.x + 10;
      this.frameY = this.y + 5;
      this.frameWidth = this.width - 20;
      this.frameHeight = this.height - 20;
    }
    if (this instanceof SmallChicken) {
      ctx.lineWidth = "10";
      ctx.strokeStyle = "transparent";
      ctx.beginPath();
      ctx.rect(this.x + 5, this.y - 5, this.width - 10, this.height);
      ctx.stroke();
      this.frameX = this.x + 5;
      this.frameY = this.y - 5;
      this.frameWidth = this.width - 10;
      this.frameHeight = this.height;
    }
    if (this instanceof Endboss) {
      ctx.lineWidth = "10";
      ctx.strokeStyle = "transparent";
      ctx.beginPath();
      ctx.rect(this.x + 50, this.y + 80, this.width - 60, this.height - 90);
      ctx.stroke();
      this.frameX = this.x + 15;
      this.frameY = this.y + 80;
      this.frameWidth = this.width - 30;
      this.frameHeight = this.height - 90;
    }
    if (this instanceof Character) {
      ctx.lineWidth = "10";
      ctx.strokeStyle = "transparent";
      ctx.beginPath();
      ctx.rect(this.x + 20, this.y + 110, this.width - 50, this.height - 120);
      ctx.stroke();
      this.frameX = this.x + 20;
      this.frameY = this.y + 110;
      this.frameWidth = this.width - 40;
      this.frameHeight = this.height - 120;
    }
    if (this instanceof Coin) {
      ctx.lineWidth = "10";
      ctx.strokeStyle = "transparent";
      ctx.beginPath();
      ctx.rect(this.x + 40, this.y + 40, this.width - 80, this.height - 80);
      ctx.stroke();
      this.frameX = this.x + 40;
      this.frameY = this.y + 40;
      this.frameWidth = this.width - 80;
      this.frameHeight = this.height - 80;
    }
    if (this instanceof Bottle) {
      ctx.lineWidth = "10";
      ctx.strokeStyle = "transparent";
      ctx.beginPath();
      ctx.rect(this.x + 20, this.y + 20, this.width - 40, this.height - 40);
      ctx.stroke();
      this.frameX = this.x + 20;
      this.frameY = this.y + 20;
      this.frameWidth = this.width - 40;
      this.frameHeight = this.height - 40;
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
    this.currentImage++;
  }
}
