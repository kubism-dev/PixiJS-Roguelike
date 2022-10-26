import { Application, Sprite, Texture, AnimatedSprite, Loader } from 'pixi.js';
const bullets = [];
let bullet;
let weaponSprite;
export default class Weapon {
  constructor() {
  }

  set load(x) {
    weaponSprite = x;
  }

  updateProjectiles() {
      return bullets;
  }
  async shoot(rotation, startPosition, stage) {
    let types = ['weaponSprite.waveform.spritesheet.animations["waveform"]', 'weaponSprite.bolt.spritesheet.animations["bolt"]'];
    bullet = new AnimatedSprite(
      weaponSprite.bolt.spritesheet.animations["bolt"]
    );
    bullet.play();
    bullet.animationSpeed = 0.25;
    bullet.anchor.x = .8;
    bullet.anchor.y = 0;
    bullet.position.x = startPosition.x;
    bullet.position.y = startPosition.y;
    bullet.rotation = rotation;
    stage.stage.addChild(bullet);
    bullets.push(bullet);
  }
}
