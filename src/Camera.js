import * as THREE from "three";

export class Camera {

    constructor() {

        this.camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            0.1,
            5000
        );

        this.camera.position.set(
            0,
            4,
            8
        );

        window.addEventListener("resize", () => {

            this.camera.aspect =
                window.innerWidth / window.innerHeight;

            this.camera.updateProjectionMatrix();

        });

    }

}