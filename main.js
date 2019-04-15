const SPRITES = {};
let spritesheet;
let spriteinfo;

let dino;
let ground;
let cactuses;
let menu;

let baseline;
let speed;
let gameover = "start";

let dist;
let showBoxes = false;

function preload() {
  spritesheet = loadImage("./assets/spritesheet.png");
  spriteinfo = loadJSON("./assets/spriteinfo.json");
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  noSmooth();
  loadSprites();
  baseline = height * 2 / 3;
  dino = new Dino(50, SPRITES.dino.idle.width, SPRITES.dino.idle.height);
  ground = new Ground(0, SPRITES.ground.normal.width, SPRITES.ground.normal.height);
  cactuses = [];
  menu = new Menu();
  speed = 5;
}

function draw() {
  background(247);
  if (gameover == "start" && (keyIsDown(32) || touches.length > 0)) {
    gameover = false;
  }
  ground.show();
  for (let cactus of cactuses) {
    cactus.show();
  }
  dino.show();
  if (gameover) {
    if (gameover != "start") {
      menu.show();
    }
  } else {
    if (checkCollision()) {
      gameover = true;
    }
    ground.update();
    for (let cactus of cactuses) {
      cactus.update();
    }
    dino.update();
    if (dist == null) {
      dist = width - speed * 60 * random(0.7, 1.8);
    }
    if (cactuses.length == 0 || cactuses[cactuses.length - 1].x < dist) {
      cactuses.push(new Cactus(width));
      dist = null;
    }
    if (cactuses[0] != undefined && cactuses[0].x < -100) {
      cactuses.shift();
    }
    if (speed < 20) {
      speed += 0.002;
    }
  }
}

function checkCollision() {
  for (let cactus of cactuses) {
    let c1 = dino.y < cactus.h;
    let c2 = dino.x > cactus.x;
    let c3 = dino.x < cactus.x + cactus.w;
    let c4 = dino.x + dino.w > cactus.x;
    let c5 = dino.x + dino.w < cactus.x + cactus.w;
    if (c1 && (c2 && c3 || c4 && c5)) {
      return true;
    }
  }
  return false;
}

function restartGame() {
  cactuses = [];
  dino.jumping = false;
  dino.y = 0;
  gameover = false;
  menu.hide();
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
  baseline = height * 2 / 3;
}

function loadSprites() {
  for (let creature in spriteinfo) {
    SPRITES[creature] = {};
    for (let position in spriteinfo[creature]) {
      SPRITES[creature][position] = {};
      if (spriteinfo[creature][position][0] != undefined) {
        for (let frame in spriteinfo[creature][position]) {
          let x = spriteinfo[creature][position][frame].x;
          let y = spriteinfo[creature][position][frame].y;
          let w = spriteinfo[creature][position][frame].w;
          let h = spriteinfo[creature][position][frame].h;
          SPRITES[creature][position][frame] = spritesheet.get(x, y, w, h);
        }
      } else {
        let x = spriteinfo[creature][position].x;
        let y = spriteinfo[creature][position].y;
        let w = spriteinfo[creature][position].w;
        let h = spriteinfo[creature][position].h;
        SPRITES[creature][position] = spritesheet.get(x, y, w, h);
      }
    }
  }
}
