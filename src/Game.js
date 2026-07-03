import * as THREE from "three";
import { Renderer } from "./Renderer.js";
import { Camera } from "./Camera.js";
import { SceneManager } from "./SceneManager.js";
import { Car } from "./Car.js";
import { Track } from "./Track.js";
import Input from "./Input.js";
import Physics from "./Physics.js";
import VehicleController from "./VehicleController.js";
import FollowCamera from "./FollowCamera.js";

export class Game {
    constructor() {
        this.renderer = new Renderer();
        this.camera = new Camera();
        this.sceneManager = new SceneManager();
        this.scene = this.sceneManager.scene;
        this.car = new Car(this.scene);
        this.track = new Track(this.scene);
        this.clock = new THREE.Clock();
        this.input = new Input();
        this.physics = null;
        this.vehicle = null;
        this.followCamera = new FollowCamera(this.camera.camera);
        this.initVehicle();
    }

    initVehicle() {
        const wait = () => {
            if (this.car.model && this.car.model.children.length > 0) {
                const frontWheels = [];
                const rearWheels = [];
                let carBody = null;

                this.car.model.traverse((child) => {
                    if (child.isMesh) {
                        const name = child.name.toLowerCase();
                        // Debug: Lihat nama di Console F12
                        console.log("Detecting:", name); 
                        
                        if (name.includes('front') || name.includes('wheel_f')) {
                            frontWheels.push(child);
                        } else if (name.includes('rear') || name.includes('wheel_r')) {
                            rearWheels.push(child);
                        } else {
                            carBody = child;
                        }
                    }
                });

                this.physics = new Physics(this.car.model, frontWheels, rearWheels, carBody);
                this.vehicle = new VehicleController(this.physics, this.input);
                console.log("Vehicle Ready - Roda Terdeteksi:", frontWheels.length + rearWheels.length);
            } else {
                requestAnimationFrame(wait);
            }
        };
        wait();
    }

    start() {
        const animate = () => {
            requestAnimationFrame(animate);
            const dt = this.clock.getDelta();
            if (this.vehicle) {
                this.vehicle.update(dt);
                this.followCamera.update(this.car.model);
            }
            this.renderer.render(this.scene, this.camera.camera);
        };
        animate();
    }
}