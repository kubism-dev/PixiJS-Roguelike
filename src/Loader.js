import { Loader } from 'pixi.js';
import { sound } from '@pixi/sound';
export default class GameLoader {
    constructor() {
        this.loader = new Loader();
        this.loader.add('shoot', 'assets/run/run.json')
            .add('attack', 'assets/attack/attack.json')
            .add('shit', 'assets/bullet/shit.json')
            .add('waveform', 'assets/bullet/waveform.json')
            .add('bolt', 'assets/bullet/bolt.json')
            .add('enemy', 'assets/enemy/enemy.json')
            .add('map', 'assets/tile/map.json');
        
        sound.add('theme', 'assets/sounds/warped-shooting-fx.mp3');
        sound.play('theme');
        return this.loader;
    }
}