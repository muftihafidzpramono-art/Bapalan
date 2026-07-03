import * as THREE from "three";

export default class Physics {

    constructor(car){

        this.car = car;

        this.speed = 0;

        this.heading = Math.PI;

        this.maxSpeed = 75;

        this.acceleration = 28;

        this.brake = 40;

        this.drag = 12;

        this.steer = 0;

        this.maxSteer = 0.45;

    }

    update(input,dt){

        if(!this.car) return;

        // ACCELERATION

        if(input.keys.forward)
            this.speed += this.acceleration*dt;

        if(input.keys.backward)
            this.speed -= this.brake*dt;

        // DRAG

        if(!input.keys.forward && !input.keys.backward){

            this.speed *= 0.985;

            if(Math.abs(this.speed)<0.05)
                this.speed=0;

        }

        this.speed = THREE.MathUtils.clamp(
            this.speed,
            -20,
            this.maxSpeed
        );

        // STEERING

        let targetSteer = 0;

        if(input.keys.left)
            targetSteer = 1;

        if(input.keys.right)
            targetSteer = -1;

        this.steer += (targetSteer-this.steer)*8*dt;

        // Semakin cepat semakin kecil efek belok
        const steerStrength =
            (this.speed/this.maxSpeed)*1.5;

        this.heading +=
            this.steer*
            steerStrength*
            dt;

        // ROTASI MOBIL
        this.car.rotation.y=this.heading;

        // GERAK MAJU
        this.car.position.x +=
            Math.sin(this.heading)*
            this.speed*
            dt;

        this.car.position.z +=
            Math.cos(this.heading)*
            this.speed*
            dt;

    }

}