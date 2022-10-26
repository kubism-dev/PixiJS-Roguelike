import {
    Application,
    Sprite,
    Texture,
    AnimatedSprite,
    Loader,
    InteractionManager,
    TilingSprite,
    BaseTexture,
    Graphics,
    Filter,
    Text
} from 'pixi.js';
import Bump from './util.js';
import Player from './Player.js';
import Enemy from './Enemy.js';
import GameLoader from './Loader.js';
import Weapon from './Weapon.js';

const enemies = [];
let score; 
export default class Game {
    constructor() {
        this.pixi = new Application({
            backgroundColor: 0xada59e,
            width: window.innerWidth,
            height: window.innerHeight
        });

        this.pos = {};
        this.pixi.stage.interactive = true;
        this.hitDetection = new Bump(this.pixi);

        const defaultIcon = "url('assets/cursor/crosshair.png'),auto";
        
        this.pixi.renderer.plugins.interaction.cursorStyles.default = defaultIcon;
        
        document.body.appendChild(this.pixi.view);
        const loader = new GameLoader(this.pixi);
        loader.load((loader, resources) => this.doneLoading(loader, resources));
        const text = new Text('W A S D, E = Shoot, Mouse = Fight', {
            fontFamily: 'Arial',
            fontSize: 16,
            fill: 0x000000,
            align: 'center',
        });
        text.x = 30;
        text.y = this.pixi.renderer.height - 50;
        this.pixi.stage.addChild(text);
        score = new Text('Kills:', {
            fontFamily: 'Arial',
            fontSize: 16,
            fill: 0x000000,
            align: 'center',
        });
        score.x = this.pixi.renderer.width / 2;
        score.y = this.pixi.renderer.height - 50;
        this.pixi.stage.addChild(score);
    }

    doneLoading(loader, resources) {
        this.player = new Player(resources, this.pixi.renderer.width / 2, this.pixi.renderer.height / 2, this.pixi);
        this.player.playerObject.anchor.set(0.5);
        this.pixi.stage.addChild(this.player.playerObject);

        this.pixi.stage.pivot.x = this.player.playerObject.position.x;
        this.pixi.stage.pivot.y = this.player.playerObject.position.y;
        this.pixi.stage.position.x = this.pixi.renderer.width / 2;
        this.pixi.stage.position.y = this.pixi.renderer.height / 2;

        for (let i = 0; i < 10; i++) {
            this.enemy = new Enemy(resources, Math.random() * this.pixi.renderer.width, Math.random() * this.pixi.renderer.height);
            enemies.push(this.enemy);
            this.pixi.stage.addChild(this.enemy.enemyObject);
        }

        setInterval(() => {
            for (let i = 0; i < 20; i++) {
                this.enemy = new Enemy(resources, Math.min(Math.random() * this.pixi.renderer.width * 2), Math.min(Math.random() * this.pixi.renderer.height * 2));
                enemies.push(this.enemy);
                this.pixi.stage.addChild(this.enemy.enemyObject);
            }
        }, 10000);

        for (let i = 0; i < 8; i++) {
            const sprite1 = new Sprite(resources.map.textures["post.png"]);
            sprite1.x = Math.random() * this.pixi.renderer.width;
            sprite1.y = Math.random() * this.pixi.renderer.height;
            this.pixi.stage.addChild(sprite1);
            const sprite2 = new Sprite(resources.map.textures["camp.png"]);
            sprite2.x = Math.random() * this.pixi.renderer.width;
            sprite2.y = Math.random() * this.pixi.renderer.height;
            this.pixi.stage.addChild(sprite2);
            const sprite3 = new Sprite(resources.map.textures["container.png"]);
            sprite3.x = Math.random() * this.pixi.renderer.width;
            sprite3.y = Math.random() * this.pixi.renderer.height;
            this.pixi.stage.addChild(sprite3);
            const sprite4 = new Sprite(resources.map.textures["yo.png"]);
            sprite4.x = Math.random() * this.pixi.renderer.width;
            sprite4.y = Math.random() * this.pixi.renderer.height;
            this.pixi.stage.addChild(sprite4);
            const sprite5 = new Sprite(resources.map.textures["latern.png"]);
            sprite5.x = Math.random() * this.pixi.renderer.width;
            sprite5.y = Math.random() * this.pixi.renderer.height;
            this.pixi.stage.addChild(sprite5);
        }

        this.weapon = new Weapon();
        this.weapon.load = resources;

        this.pixi.ticker.maxFPS = 60;
        this.pixi.ticker.add(() => this.update());

    }

    update() {
        this.player.updatePlayer(this.enemy.enemyObject);

        enemies.forEach(enemy => enemy.update(this.player.playerObject));

        this.pos = {
            x: this.pixi.renderer.plugins.interaction.mouse.global.x,
            y: this.pixi.renderer.plugins.interaction.mouse.global.y
        }

        let bullets = this.weapon.updateProjectiles();

        this.player.playerObject.rotationAttack = Math.atan2(this.pos.y - this.player.playerObject.y, this.pos.x - this.player.playerObject.x);

        for (let b = bullets.length - 1; b >= 0; b--) {
            bullets[b].position.x += Math.cos(bullets[b].rotation) * 5;
            bullets[b].position.y += Math.sin(bullets[b].rotation) * 5;

            if (enemies.length > 0) {
                for (let k = enemies.length - 1; k >= 0; k--) {
                    if (enemies[k] && this.hitDetection.hit(bullets[b], enemies[k].enemyObject)) {
                        enemies[k].enemyObject.blendMode = 1;
                        enemies.splice(k, 1);
                        score.text += '+';
                    setInterval(() => {
                        enemies[k].enemyObject.blendMode = 0;
                        enemies[k].enemyObject.tint = 0xFFFFFF;
                    }, 10);
                }
                }   
            }
        }
    }
}

new Game()