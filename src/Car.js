import { GLTFLoader }
from 'three/examples/jsm/loaders/GLTFLoader.js';

export class Car {

    constructor(scene){

        const loader =
            new GLTFLoader();

        loader.load(
            '/assets/car/Mcqueen/source/Lightning McQueen.glb',

            (gltf)=>{

                this.model = gltf.scene;

                this.model.scale.set(
                    1,
                    1,
                    1
                );

                this.model.position.set(
                    0,
                    1,
                    0
                );

                scene.add(
                    this.model
                );

                console.log(
                    'McQueen Loaded'
                );
            }
        );
    }
}