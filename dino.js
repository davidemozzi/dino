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

  collision(body) {
    let c1 = this.y < body.h;
    let c2 = this.x > body.x;
    let c3 = this.x < body.x + body.w;
    let c4 = this.x + this.w > body.x;
    let c5 = this.x + this.w < body.x + body.w;
    if (c1 && (c2 && c3 || c4 && c5)) {
      return true;
    }
  }
}
