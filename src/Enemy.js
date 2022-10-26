import { Application, Sprite, Texture, AnimatedSprite, Loader } from 'pixi.js';
import Player from './Player.js';

export default class Enemy {
    constructor(sprite, x, y) {
        this.spriteRessources = sprite;
        this.enemyObject = new AnimatedSprite(
          sprite.enemy.spritesheet.animations['enemy']
        );
        this.enemyObject.animationSpeed = 0.15;
        this.enemyObject.play();
        this.enemyObject.health = 100;
        this.enemyObject.x = x;
        this.enemyObject.y = y;
        this.enemyObject.tint = 0xFFFFFF;
    }

    update(player) {
        function lerp (start, end, amt){
            return (1-amt)*start+amt*end
        }
        this.enemyObject.x = lerp(this.enemyObject.x, player.x, 0.004);
        this.enemyObject.y = lerp(this.enemyObject.y, player.y, 0.004);
    }
}