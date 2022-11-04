import { AnimatedSprite } from 'pixi.js';

export default class Enemy {
    constructor(sprite, x, y) {
        this.enemyObject = new AnimatedSprite(
          sprite.enemy.spritesheet.animations['enemy']
        )
        Object.assign(this.enemyObject, {
            animationSpeed: 0.15,
            health: 100,
            x: x,
            y: y,
            tint: 0xFFFFFF,
        }).play()
    }

    update(player) {
        let { x, y } = this.enemyObject;
        function lerp (start, end, amt){
            return (1-amt)*start+amt*end
        }
        this.enemyObject.x = lerp(x, player.x - 100, 0.004)
        this.enemyObject.y = lerp(y, player.y - 100, 0.004)
    }
}