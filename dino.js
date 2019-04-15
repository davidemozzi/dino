class Dino {
  constructor(x, w, h) {
    this.x = x;
    this.y = 0;
    this.w = w;
    this.h = h;
    this.vy = 0;
    this.jumping = false;
  }

  show() {
    if (!gameover && !this.jumping) {
      image(SPRITES.dino.running[frameCount % 10 < 5 ? 0 : 1], this.x, baseline - this.y - this.h);
    } else {
      image(SPRITES.dino.idle, this.x, baseline - this.y - this.h);
    }
    if (showBoxes) {
      stroke(255, 0, 0);
      noFill();
      rect(this.x, baseline - this.y - this.h, this.w, this.h);
    }
  }

  update() {
    if (this.jumping) {
      this.y += this.vy;
      this.vy -= 0.5;
      if (this.y <= 0) {
        this.y = 0;
        this.jumping = false;
      }
    }
    if (keyIsDown(32) || touches.length > 0) {
      if (!this.jumping) {
        this.jump();
      }
    }
  }

  jump() {
    this.vy = 10;
    this.jumping = true;
  }
}
