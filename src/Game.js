import * as THREE from "three";

import { Renderer } from "./Renderer.js";
import { Camera } from "./Camera.js";
import { SceneManager } from "./SceneManager.js";
import { Car } from "./Car.js";
import { Track } from "./Track.js";

import Input from "./Input.js";
import Physics from "./Physics.js";
import VehicleController from "./VehicleController.js";

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

        this.initVehicle();

        window.addEventListener("resize", () => {

            this.camera.camera.aspect =
                window.innerWidth / window.innerHeight;

            this.camera.camera.updateProjectionMatrix();

            this.renderer.renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );

        });

    }

    initVehicle() {

        const wait = () => {

            if (this.car.model) {

                this.physics = new Physics(
                    this.car.model
                );

                this.vehicle = new VehicleController(
                    this.physics,
                    this.input
                );

                console.log("Vehicle Ready");

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

                const target = this.car.model.position.clone();

                target.y += 3;

                const camPos = target.clone();

                camPos.add(
                    new THREE.Vector3(
                        0,
                        2,
                        8
                    ).applyQuaternion(
                        this.car.model.quaternion
                    )
                );

                this.camera.camera.position.lerp(
                    camPos,
                    0.08
                );

                this.camera.camera.lookAt(
                    target
                );

            }

            this.renderer.render(
                this.scene,
                this.camera.camera
            );

        };

        animate();

    }

}