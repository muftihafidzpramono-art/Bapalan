
import * as THREE from '../lib/three.module.js';

export default function addLighting(scene){
  const amb=new THREE.AmbientLight(0xffffff,1.2);
  scene.add(amb);

  const sun=new THREE.DirectionalLight(0xffffff,2);
  sun.position.set(30,50,20);
  sun.castShadow=true;
  sun.shadow.mapSize.width=2048;
  sun.shadow.mapSize.height=2048;
  scene.add(sun);
}
