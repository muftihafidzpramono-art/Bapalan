export default class VehicleController {

    constructor(physics, input) {

        this.physics = physics;
        this.input = input;

    }

    update(dt) {

        if (this.physics) {
            this.physics.update(this.input, dt);
        }

    }

}