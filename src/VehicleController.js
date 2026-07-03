export default class VehicleController {

    constructor(physics, input) {

        this.physics = physics;
        this.input = input;

    }

    update(deltaTime) {

        if (!this.physics) return;

        this.physics.update(
            this.input,
            deltaTime
        );

    }

}