import * as THREE from "three";

export class SceneManager {

    constructor() {

        this.scene = new THREE.Scene();

        this.scene.background = new THREE.Color(0x87CEEB);

        this.scene.fog = new THREE.Fog(
            0x87CEEB,
            250,
            1800
        );

        // Ambient
        const ambient = new THREE.AmbientLight(
            0xffffff,
            1.4
        );

        this.scene.add(ambient);

        // Sun
        const sun = new THREE.DirectionalLight(
            0xffffff,
            4
        );

        sun.position.set(
            150,
            220,
            120
        );

        sun.castShadow = true;

        sun.shadow.mapSize.width = 4096;
        sun.shadow.mapSize.height = 4096;

        sun.shadow.camera.left = -400;
        sun.shadow.camera.right = 400;
        sun.shadow.camera.top = 400;
        sun.shadow.camera.bottom = -400;

        sun.shadow.camera.near = 0.5;
        sun.shadow.camera.far = 1200;

        this.scene.add(sun);

    }

}