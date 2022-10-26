import { Application, Sprite, Texture, AnimatedSprite } from 'pixi.js';
import Bump from './util.js';
import Game from './Game.js';

const app = new Application({
    backgroundColor: 0xada59e,
    width: window.innerWidth,
    height: window.innerHeight,
    resolution: 1,
    autoDensity: true,
  });
const hit = new Bump(app);
document.body.appendChild(app.view);

 // The application will create a canvas element for you that you
  // can then insert into the DOM.
  document.body.appendChild(app.view);
  function lerp (start, end, amt){
    return (1-amt)*start+amt*end
  }

  // load the texture we need
  app.loader.add('shoot', 'assets/run/run.json')
    .add('attack', 'assets/attack/attack.json')
    .add('bullet', 'assets/bullet/bullet.json')
    .add('shit', 'assets/bullet/shit.json')
    .load((loader, resources) => {

      let bunny = new AnimatedSprite(resources.shoot.spritesheet.animations["tile"]);

      document.addEventListener('keydown', (e) => {
        if (!bunny.playing) {
          bunny.textures = resources.shoot.spritesheet.animations["tile"];
          bunny.play();
        }

        if (e.keyCode === 68) {
          bunny.x += 10;
          bunny.scale.x = 1;
        }
        if (e.keyCode === 69) {
          if (!e.repeat) {
            bunny.textures = resources.shit.spritesheet.animations["tile"];
            bunny.play();
            bunny.x += 10;
            bunny.scale.x = 1;
            setTimeout(() => {
              shoot(bunny.rotation, {
                x: bunny.position.x+Math.cos(bunny.rotation)*20,
                y: bunny.position.y+Math.sin(bunny.rotation)*20
              }); 
              sound.play('my-sound');
            }, 400);
          }
        }
        if (e.keyCode === 65) {
          bunny.x -= 10;
          bunny.anchor.x = 0.414063;
          bunny.scale.x = -1;
        }
        if (e.keyCode === 87) {
          bunny.y -= 10;
        }
        if (e.keyCode === 83) {
          bunny.y += 10;
        }
      });
      document.addEventListener('mousedown', (e) => {
        bunny.textures = resources.attack.spritesheet.animations["tile"];
        bunny.play();
      });
      document.addEventListener('mouseup', (e) => {
        bunny.stop();
        bunny.textures = resources.shoot.spritesheet.animations["tile"];
      });
      document.addEventListener('keyup', (e) => {
        bunny.stop();
      });

      // Setup the position of the bunny
      bunny.x = app.renderer.width / 2;
      bunny.y = app.renderer.height / 2;
      // Rotate around the center
      bunny.anchor.set(0.5);

      // Add the bunny to the scene we are building.
      app.stage.addChild(bunny);
      bunny.animationSpeed = 0.167;
      bunny.play();


      const healthbar = Sprite.from(Texture.WHITE);
      healthbar.width = 30;
      healthbar.height = 4;
      healthbar.health = 400;
      healthbar.x = rectangle.x;
      healthbar.y = rectangle.y + 34;
      healthbar.tint = 0xff035c;
      app.stage.addChild(healthbar);


      var bullets = [];
      var bulletSpeed = 5;

      function shoot(rotation, startPosition) {
        var bullet = Sprite.from('assets/10.png');
        bullet.anchor.x = .5;
        bullet.anchor.y = .4;
        bullet.position.x = startPosition.x;
        bullet.position.y = startPosition.y;
        bullet.rotation = rotation;
        app.stage.addChild(bullet);
        bullets.push(bullet);
      }

      function rotateToPoint(mx, my, px, py) {
        var self = this;
        var dist_Y = my - py;
        var dist_X = mx - px;
        var angle = Math.atan2(dist_Y, dist_X);
        var degrees = angle * 180/ Math.PI;
        return angle;
      }

      app.ticker.add((e) => {
        if (hit.hitTestRectangle(bunny, rectangle)) {
          rectangle.tint = 0xFF0000;
        }
        rectangle.x = lerp(rectangle.x, bunny.x, 1);
        rectangle.y = lerp(rectangle.y, bunny.y, 1);
        for (var b = bullets.length - 1; b >= 0; b--) {
          bullets[b].position.x += Math.cos(bullets[b].rotation) * bulletSpeed;
          bullets[b].position.y += Math.sin(bullets[b].rotation) * bulletSpeed;
          if (hit.hit(bullets[b], rectangle)) {
            if (healthbar.width <= 0) {
              rectangle.alpha = 0.1;
            }
            console.log('hit');
            healthbar.width = healthbar.width - 2;
            rectangle.tint = 0xFF0000;
            setInterval(() => {
              rectangle.tint = 0xFFFFFF;
            }, 50);
          }
        }
      })
    });

