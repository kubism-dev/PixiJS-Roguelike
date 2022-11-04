import { AnimatedSprite } from 'pixi.js';
const bullets = [];
let bullet, weaponSprite;

export default class Weapon {
  set load(spriteObject) {
    weaponSprite = spriteObject;
  }

  updateProjectiles() {
    return bullets;
  }

  shoot(rotation, startPosition, stage) {
    let types = Math.round(Math.random() * 2)
      ? new AnimatedSprite(weaponSprite.bolt.spritesheet.animations['bolt'])
      : new AnimatedSprite(
          weaponSprite.waveform.spritesheet.animations['waveform']
        );
    bullet = types;
    Object.assign(bullet, {
      animationSpeed: 0.25,
      anchor: {
        x: 0.8,
        y: 0
      },
      position: {
        x: startPosition.x,
        y: startPosition.y
      },
      rotation
    }).play();
    stage.stage.addChild(bullet);
    bullets.push(bullet);
  }
}
