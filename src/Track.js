import { GLTFLoader }
from 'three/examples/jsm/loaders/GLTFLoader.js';

export class Track {

    constructor(scene){

        const loader =
            new GLTFLoader();

        loader.load(
            '/assets/circuits/shanghai_compressed/source/shanghai_compressed.glb',

            (gltf)=>{

                this.model =
                    gltf.scene;

                scene.add(
                    this.model
                );

                console.log(
                    'Track Loaded'
                );
            }
        );
    }
}