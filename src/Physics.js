export default class Physics{
constructor(car){this.car=car;this.speed=0;this.maxSpeed=220;this.acceleration=35;this.brakeForce=60;this.drag=6;this.steer=0;}
update(input,dt){
if(!this.car)return;
if(input.keys.forward)this.speed+=this.acceleration*dt;
if(input.keys.backward)this.speed-=this.brakeForce*dt;
if(!input.keys.forward&&!input.keys.backward){
if(this.speed>0)this.speed=Math.max(0,this.speed-this.drag*dt);
if(this.speed<0)this.speed=Math.min(0,this.speed+this.drag*dt);}
this.speed=Math.max(-40,Math.min(this.maxSpeed,this.speed));
if(input.keys.left)this.steer+=2*dt;
if(input.keys.right)this.steer-=2*dt;
this.steer*=0.92;
this.car.rotation.y+=this.steer*dt;
this.car.translateZ(-this.speed*dt);
}}