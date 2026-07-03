import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class Car {

    constructor(scene) {

        this.model = null;

        const loader = new GLTFLoader();

        loader.load(

            "/assets/car/Mcqueen/source/Lightning McQueen.glb",

            (gltf) => {

                this.model = gltf.scene;

                // ==========================
                // SCALE
                // ==========================

                this.model.scale.set(
                    0.40,
                    0.40,
                    0.40
                );

                // ==========================
                // ROTASI
                // ==========================
                // Belakang mobil menghadap kamera

                this.model.rotation.set(
                    0,
                    0,
                    0
                );

                // ==========================
                // POSISI
                // ==========================

                this.model.rotation.set(
    0,
    Math.PI / 2,
    0
);

                // ==========================
                // SHADOW
                // ==========================

                this.model.traverse((child) => {

                    if (child.isMesh) {

                        child.castShadow = true;
                        child.receiveShadow = true;

                        if (child.material) {

                            child.material.side = THREE.FrontSide;

                            if ("metalness" in child.material)
                                child.material.metalness = 0.15;

                            if ("roughness" in child.material)
                                child.material.roughness = 0.75;

                            child.material.needsUpdate = true;

                        }

                    }

                });

                scene.add(this.model);

                console.log("Lightning McQueen Loaded");

            },

            (xhr) => {

                if (xhr.total) {

                    console.log(
                        "Loading Car :",
                        Math.round(xhr.loaded / xhr.total * 100) + "%"
                    );

                }

            },

            (error) => {

                console.error("Failed Load Car", error);

            }

        );

    }

}