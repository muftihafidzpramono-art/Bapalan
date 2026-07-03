import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class Track {

    constructor(scene){

        this.model = null;
        this.colliderMeshes = [];

        const loader = new GLTFLoader();

        loader.load(

            "/assets/circuits/shanghai_compressed/source/shanghai_compressed.glb",

            (gltf)=>{

                this.model = gltf.scene;

                this.model.position.set(0,0,0);
                this.model.rotation.set(0,0,0);
                this.model.scale.set(1,1,1);

                this.model.traverse((child)=>{

                    if(child.isMesh){

                        child.castShadow = true;
                        child.receiveShadow = true;

                        this.colliderMeshes.push(child);

                        if(child.material){

                            child.material.side = THREE.FrontSide;
                            child.material.needsUpdate = true;

                            if(child.material.map){

                                child.material.map.colorSpace =
                                    THREE.SRGBColorSpace;

                                child.material.map.anisotropy = 16;

                            }

                            if("roughness" in child.material)
                                child.material.roughness = 1;

                            if("metalness" in child.material)
                                child.material.metalness = 0;

                        }

                    }

                });

                scene.add(this.model);

                console.log("Shanghai Loaded");

            },

            (xhr)=>{

                console.log(
                    "Loading :",
                    (xhr.loaded/xhr.total*100).toFixed(0)+"%"
                );

            },

            (error)=>{

                console.error(error);

            }

        );

    }

}