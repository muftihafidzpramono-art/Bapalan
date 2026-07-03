import * as THREE from "three";

export default class Physics {

    constructor(carGroup, frontWheels = [], rearWheels = [], bodyMesh = null){

        this.car = carGroup;

        this.frontWheels = frontWheels;
        this.rearWheels = rearWheels;
        this.body = bodyMesh;

        this.velocity = new THREE.Vector3();

        this.speed = 0;

        this.maxForward = 80;
        this.maxReverse = -20;

        this.acceleration = 45;
        this.brakeForce = 70;

        this.drag = 8;

        this.heading = 0;

        this.steer = 0;

        this.maxSteer = 0.55;

        this.turnSpeed = 1.8;

        this.gravity = -9.81;

        this.verticalVelocity = 0;

        this.raycaster = new THREE.Raycaster();

        this.trackMeshes = [];

    }

    setTrack(meshes){

        this.trackMeshes = meshes;

    }

    update(input,dt){

        if(!this.car) return;

        //=====================
        // ACCELERATION
        //=====================

        if(input.keys.forward){

            this.speed += this.acceleration*dt;

        }

        else if(input.keys.backward){

            this.speed -= this.brakeForce*dt;

        }

        else{

            if(this.speed>0){

                this.speed -= this.drag*dt;

                if(this.speed<0) this.speed=0;

            }

            if(this.speed<0){

                this.speed += this.drag*dt;

                if(this.speed>0) this.speed=0;

            }

        }

        this.speed=THREE.MathUtils.clamp(

            this.speed,

            this.maxReverse,

            this.maxForward

        );

        //=====================
        // STEER
        //=====================

        let target=0;

        if(input.keys.left)

            target=this.maxSteer;

        if(input.keys.right)

            target=-this.maxSteer;

        this.steer=THREE.MathUtils.lerp(

            this.steer,

            target,

            5*dt

        );

        const speedFactor=Math.min(

            Math.abs(this.speed)/30,

            1

        );

        this.heading +=

            this.steer*

            this.turnSpeed*

            speedFactor*

            dt;

        //=====================
        // MOVE
        //=====================

        const forward=new THREE.Vector3(0,0,1);

        forward.applyAxisAngle(

            new THREE.Vector3(0,1,0),

            this.heading

        );

        this.car.position.addScaledVector(

            forward,

            this.speed*dt

        );

        this.car.rotation.y=this.heading;

        //=====================
        // BODY ROLL
        //=====================

        if(this.body){

            this.body.rotation.z=

            THREE.MathUtils.lerp(

                this.body.rotation.z,

                -this.steer*0.12*speedFactor,

                8*dt

            );

        }

        //=====================
        // FRONT WHEEL
        //=====================

        this.frontWheels.forEach((wheel)=>{

            wheel.rotation.y=

            THREE.MathUtils.lerp(

                wheel.rotation.y,

                this.steer,

                10*dt

            );

            wheel.rotation.x-=

            this.speed*dt*0.45;

        });

        //=====================
        // REAR WHEEL
        //=====================

        this.rearWheels.forEach((wheel)=>{

            wheel.rotation.x-=

            this.speed*dt*0.45;

        });

    }

}