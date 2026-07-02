
import * as THREE from '../lib/three.module.js';

export default class FollowCamera{
  constructor(camera){
    this.camera=camera;
    this.offset=new THREE.Vector3(0,4,8);
  }
  update(target){
    if(!target)return;
    const desired=target.position.clone().add(
      this.offset.clone().applyQuaternion(target.quaternion)
    );
    this.camera.position.lerp(desired,0.08);
    this.camera.lookAt(target.position);
  }
}
