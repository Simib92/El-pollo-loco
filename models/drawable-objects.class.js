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
    const types = [
      {
        classRef: [Chicken, ThrowableObject],
        offset: { x: 10, y: 5, w: 20, h: 20 },
      },
      { classRef: [SmallChicken], 
        offset: { x: 5, y: -5, w: 10, h: 0 } },
      {
        classRef: [Endboss],
        offset: { x: 50, y: 80, w: 60, h: 90 },
        frameFix: { x: 15, w: 30 },
      },
      {
        classRef: [Character],
        offset: { x: 20, y: 110, w: 50, h: 120 },
        frameFix: { w: 40 },
      },
      { classRef: [Coin], offset: { x: 40, y: 40, w: 80, h: 80 } },
      { classRef: [Bottle], offset: { x: 20, y: 20, w: 40, h: 40 } },
    ];

    for (const type of types) {
      if (type.classRef.some((cls) => this instanceof cls)) {
        const o = type.offset;
        const fix = type.frameFix || {};

        const frameX = this.x + (fix.x ?? o.x);
        const frameY = this.y + o.y;
        const frameWidth = this.width - (fix.w ?? o.w);
        const frameHeight = this.height - o.h;

        ctx.lineWidth = "10";
        ctx.strokeStyle = "transparent";
        ctx.beginPath();
        ctx.rect(frameX, frameY, frameWidth, frameHeight);
        ctx.stroke();

        this.frameX = frameX;
        this.frameY = frameY;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        break;
      }
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
