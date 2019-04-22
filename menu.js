class Menu {
  constructor() {
    this.restartButton = createButton("");
    this.restartButton.size(SPRITES.menu.button.width, SPRITES.menu.button.height)
    this.restartButton.mousePressed(restartGame);
    this.restartButton.style("border: none");
    this.restartButton.style("background-color: transparent");
    this.restartButton.hide();
  }

  show() {
    imageMode(CORNER);
    rectMode(CORNER);
    let x = width / 2 - this.restartButton.width / 2;
    let y = height / 3 + this.restartButton.height / 2;
    this.restartButton.position(x, y);
    this.restartButton.show();
    image(SPRITES.menu.button, x, y);
    x = width / 2 - SPRITES.menu.gameover.width / 2;
    y = height / 3 - SPRITES.menu.gameover.height;
    image(SPRITES.menu.gameover, x, y);
  }

  hide() {
    this.restartButton.hide();
  }
}
