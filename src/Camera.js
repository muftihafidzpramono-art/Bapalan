import * as THREE from "three";

export class Camera {

    constructor() {

        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            5000
        );

        this.camera.position.set(0,5,-10);

    }

    update(target){

        if(!target || !target.model) return;

        const desiredPosition = new THREE.Vector3(
            target.model.position.x,
            target.model.position.y + 5,
            target.model.position.z - 10
        );

        this.camera.position.lerp(
            desiredPosition,
            0.08
        );

        this.camera.lookAt(
            target.model.position
        );

    }

}