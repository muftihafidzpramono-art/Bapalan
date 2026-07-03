import * as THREE from "three";

export class SceneManager {

    constructor() {

        this.scene = new THREE.Scene();

        // Background langit
        this.scene.background = new THREE.Color(0x87CEEB);

        // Fog agar objek jauh lebih natural
        this.scene.fog = new THREE.Fog(
            0x87CEEB,
            500,
            5000
        );

        // Ambient Light
        const ambient = new THREE.AmbientLight(
            0xffffff,
            1.5
        );

        this.scene.add(ambient);

        // Hemisphere Light
        const hemi = new THREE.HemisphereLight(
            0xffffff,
            0x555555,
            1.8
        );

        this.scene.add(hemi);

        // Matahari
        const sun = new THREE.DirectionalLight(
            0xffffff,
            6
        );

        sun.position.set(
            300,
            500,
            300
        );

        sun.castShadow = true;

        sun.shadow.mapSize.width = 4096;
        sun.shadow.mapSize.height = 4096;

        sun.shadow.camera.near = 0.5;
        sun.shadow.camera.far = 3000;

        sun.shadow.camera.left = -600;
        sun.shadow.camera.right = 600;
        sun.shadow.camera.top = 600;
        sun.shadow.camera.bottom = -600;

        sun.shadow.bias = -0.0002;

        this.scene.add(sun);

        // Optional helper (aktifkan hanya untuk debug)
        // const helper = new THREE.CameraHelper(sun.shadow.camera);
        // this.scene.add(helper);

    }

}