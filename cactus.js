class Cactus {
  constructor(x, size = null, index = null) {
    this.x = x;
    this.size = size;
    this.index = index;
    if (this.size == null) {
      this.size = random(["small", "big"]);
    }
    if (this.index == null) {
      this.index = floor(random(3));
    }
    this.w = SPRITES.cactus[this.size][this.index].width;
    this.h = SPRITES.cactus[this.size][this.index].height;
  }

  show() {
    imageMode(CORNER);
    rectMode(CORNER);
    image(SPRITES.cactus[this.size][this.index], this.x, baseline - this.h, this.w, this.h);
    if (showBoxes) {
      stroke(255, 0, 0);
      noFill();
      rect(this.x, baseline - this.h, this.w, this.h);
    }
  }

  update() {
    this.x -= speed;
  }
}
