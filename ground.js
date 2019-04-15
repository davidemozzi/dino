class Ground {
  constructor(x, w, h) {
    this.x = x;
    this.w = w;
    this.h = h;
  }

  show() {
    let x = this.x % this.w;
    image(SPRITES.ground.normal, x, baseline - this.h);
    if (showBoxes) {
      stroke(255, 0, 0);
      noFill();
      rect(x, baseline - this.h, this.w, this.h);
    }
    while (x + this.w < width) {
      x += this.w;
      image(SPRITES.ground.normal, x, baseline - this.h);
      if (showBoxes) {
        stroke(255, 0, 0);
        noFill();
        rect(x, baseline - this.h, this.w, this.h);
      }
    }
  }

  update() {
    this.x -= speed;
  }
}
