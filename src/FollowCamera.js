import * as THREE from "three";

export default class FollowCamera {

    constructor(camera) {

        this.camera = camera;

        this.offset = new THREE.Vector3(
            0,
            1.3,
            -3.5
        );

        this.lookOffset = new THREE.Vector3(
            0,
            0.8,
            0
        );

    }

    update(target) {

        if (!target) return;

        const cameraPosition = target.position.clone();

        cameraPosition.add(
            this.offset.clone().applyQuaternion(
                target.quaternion
            )
        );

        // Kamera langsung mengikuti mobil
        this.camera.position.copy(cameraPosition);

        // Kamera melihat ke depan mobil
        const lookTarget = target.position.clone();
        lookTarget.add(this.lookOffset);

        this.camera.lookAt(lookTarget);

    }

}