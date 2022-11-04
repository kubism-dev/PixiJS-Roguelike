import { Application, Sprite, Texture, AnimatedSprite, Loader } from 'pixi.js';
import Weapon from './Weapon.js';
import { sound } from '@pixi/sound';

export default class Player {
  #xspeed = 0;
  #yspeed = 0;

  constructor(sprite, x, y, pixi) {
    this.pixi = pixi;
    this.spriteRessources = sprite;
    this.playerObject = new AnimatedSprite(
      sprite.shoot.spritesheet.animations['tile']
    );
    this.playerObject.animationSpeed = 0.25;
    this.playerObject.x = x;
    this.playerObject.y = y;
    this.playerObject.rotationAttack;
    this.speed = 0.5;
    this.currentAnim = 'walk';
    this.weapon = new Weapon();
    
    window.addEventListener('keydown', (e) => this.onKeyDown(e), true);
    window.addEventListener('keyup', (e) => this.onKeyUp(e));
    window.addEventListener('mousedown', (e) => this.onMouseDown(e));
    window.addEventListener('mouseup', (e) => this.onMouseUp(e));
    sound.add('my-sound', 'assets/sounds/Weapon.wav');
  }

  updatePlayer() {
    this.playerObject.x += this.#xspeed;
    this.playerObject.y += this.#yspeed;
  }

  changeSprites(anim) {
    this.playerObject.play();
    if (anim !== this.currentAnim) {
      switch (anim) {
        case 'walk':
          this.currentAnim = 'walk';
          this.playerObject.textures =
            this.spriteRessources.shoot.spritesheet.animations['tile'];
          break;
        case 'attack':
          this.currentAnim = 'attack';
          this.playerObject.textures =
            this.spriteRessources.attack.spritesheet.animations['tile'];
          break;
        case 'shoot':
          this.currentAnim = 'shoot';
          this.playerObject.textures =
            this.spriteRessources.shit.spritesheet.animations['tile'];
          break;
      }
    }
  }

  onKeyDown(e) {
    switch (e.key.toUpperCase()) {
      case 'A':
      case 'ARROWLEFT':
        this.#xspeed = -7;
        this.changeSprites('walk');
        this.playerObject.scale.x = -1;
        break;
      case 'D':
      case 'ARROWRIGHT':
        this.#xspeed = 7;
        this.changeSprites('walk');
        this.playerObject.scale.x = 1;
        break;
      case 'W':
      case 'ARROWUP':
        this.#yspeed = -7;
        this.changeSprites('walk');
        break;
      case 'S':
      case 'ARROWDOWN':
        this.#yspeed = 7;
        this.changeSprites('walk');
        break;
      case 'E':
        this.changeSprites('shoot');
          this.weapon.shoot(this.playerObject.rotationAttack, {
            x:
              this.playerObject.position.x +
              Math.cos(this.playerObject.rotationAttack) * 20,
            y:
              this.playerObject.position.y +
              Math.sin(this.playerObject.rotationAttack) * 20,
          }, this.pixi);
        sound.play('my-sound');
        break;
      default:
    }
  }

    onKeyUp(e) {
    switch (e.key.toUpperCase()) {
      case ' ':
        break;
      case 'A':
      case 'D':
      case 'ARROWLEFT':
      case 'ARROWRIGHT':
        this.#xspeed = 0;
        break;
      case 'W':
      case 'S':
      case 'ARROWUP':
      case 'ARROWDOWN':
        this.#yspeed = 0;
        break;
    }
    this.playerObject.stop();
  }

  onMouseDown(e) {
    this.changeSprites('attack');
    this.playerObject.play();
  }

  onMouseUp(e) {
    this.changeSprites('walk');
    this.playerObject.stop();
  }

}
