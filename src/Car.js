import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class Car {
    constructor(scene) {
        this.model = new THREE.Group(); 
        this.scene = scene;
        
        // Properti untuk menyimpan daftar mesh roda
        this.frontWheels = [];
        this.rearWheels = [];
        
        const loader = new GLTFLoader();

        loader.load(
            "/assets/car/Mcqueen/source/Lightning McQueen.glb",
            (gltf) => {
                const loadedModel = gltf.scene;

                // Memindahkan semua part ke dalam grup utama (Force Binding)
                const children = [...loadedModel.children];
                children.forEach(child => {
                    this.model.add(child);
                });

                this.model.scale.set(0.35, 0.35, 0.35);
                this.model.rotation.set(0, Math.PI / 2, 0);

                // Update hierarki agar sistem Physics bisa melihat objek
                this.model.updateMatrixWorld(true);

                this.model.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        if (child.material) {
                            child.material.side = THREE.FrontSide;
                            child.material.needsUpdate = true;
                        }
                    }
                });

                this.scene.add(this.model);
            },
            undefined,
            (error) => console.error("Failed Load Car", error)
        );
    }

    // Fungsi animasi belok yang dipanggil dari Game.js
    updateWheels(steerValue) {
        // Jika model belum ter-load, jangan jalankan logika
        if (this.frontWheels.length === 0 && this.model.children.length >= 5) {
            // Mapping otomatis berdasarkan indeks mesh yang sudah kita tentukan
            this.frontWheels = [this.model.children[1], this.model.children[2]];
            this.rearWheels = [this.model.children[3], this.model.children[4]];
        }

        if (this.frontWheels.length > 0) {
            this.frontWheels.forEach(wheel => {
                // Animasi belok halus (sumbu Y)
                wheel.rotation.y = THREE.MathUtils.lerp(wheel.rotation.y, steerValue * 0.5, 0.2);
                // Pastikan roda tidak berputar maju (diam)
                wheel.rotation.x = 0; 
            });
        }
        
        if (this.rearWheels.length > 0) {
            this.rearWheels.forEach(wheel => {
                wheel.rotation.y = 0;
                wheel.rotation.x = 0;
            });
        }
    }
}