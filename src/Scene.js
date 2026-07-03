import * as THREE from "three";

export class SceneManager {

    constructor() {

        this.scene = new THREE.Scene();

        // Background langit
        this.scene.background = new THREE.Color(0x87CEEB);

        // Fog agar objek jauh terlihat natural
        this.scene.fog = new THREE.Fog(
            0x87CEEB,
            500,
            3000
        );

        // Ambient Light
        const ambient = new THREE.AmbientLight(
            0xffffff,
            2.0
        );

        this.scene.add(ambient);

        // Matahari
        this.sun = new THREE.DirectionalLight(
            0xffffff,
            5
        );

        this.sun.position.set(
            200,
            300,
            100
        );

        this.sun.castShadow = true;

        this.sun.shadow.mapSize.width = 4096;
        this.sun.shadow.mapSize.height = 4096;

        this.sun.shadow.camera.near = 1;
        this.sun.shadow.camera.far = 1000;

        this.sun.shadow.camera.left = -500;
        this.sun.shadow.camera.right = 500;
        this.sun.shadow.camera.top = 500;
        this.sun.shadow.camera.bottom = -500;

        this.scene.add(this.sun);

        // Hemisphere Light
        const hemi = new THREE.HemisphereLight(
            0xffffff,
            0x666666,
            1.5
        );

        this.scene.add(hemi);

        // Grid (sementara untuk debugging)
        const grid = new THREE.GridHelper(
            2000,
            100
        );

        grid.position.y = -0.05;

        // Hapus komentar ini jika tidak ingin grid tampil
        // this.scene.add(grid);

    }

}