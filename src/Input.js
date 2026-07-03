export default class Input {

    constructor() {

        this.keys = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            brake: false,
            handbrake: false
        };

        addEventListener('keydown', (e) => this.set(e, true));
        addEventListener('keyup', (e) => this.set(e, false));
    }

    set(e, v) {

        switch (e.code) {

            // ======================
            // FIX W / S (INI YANG KEBALIK)
            // ======================
            case 'KeyW':
            case 'ArrowUp':
                this.keys.forward = v;
                break;

            case 'KeyS':
            case 'ArrowDown':
                this.keys.backward = v;
                break;

            // ======================
            // FIX A / D
            // ======================
            case 'KeyA':
            case 'ArrowLeft':
                this.keys.left = v;
                break;

            case 'KeyD':
            case 'ArrowRight':
                this.keys.right = v;
                break;

            // ======================
            // BRAKE / DRIFT
            // ======================
            case 'ShiftLeft':
                this.keys.brake = v;
                break;

            case 'Space':
                this.keys.handbrake = v;
                break;
        }
    }
}