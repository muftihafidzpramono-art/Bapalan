import { Renderer } from './Renderer.js';
import { Camera } from './Camera.js';
import { SceneManager } from './SceneManager.js';
import { Car } from './Car.js';
import { Track } from './Track.js';

export class Game {

    constructor(){

        this.renderer =
            new Renderer();

        this.camera =
            new Camera();

        this.sceneManager =
            new SceneManager();

        this.scene =
            this.sceneManager.scene;

        this.car =
            new Car(
                this.scene
            );

        this.track =
            new Track(
                this.scene
            );

        window.addEventListener(
            'resize',
            ()=>{

                this.camera.camera.aspect =
                    window.innerWidth /
                    window.innerHeight;

                this.camera.camera.updateProjectionMatrix();

                this.renderer.renderer.setSize(
                    window.innerWidth,
                    window.innerHeight
                );

            }
        );
    }

    start(){

        const animate = ()=>{

            requestAnimationFrame(
                animate
            );

            this.renderer.render(
                this.scene,
                this.camera.camera
            );
        };

        animate();
    }
}