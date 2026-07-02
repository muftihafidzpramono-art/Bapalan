import * as THREE from '../lib/three.module.js';
export default function addSky(scene){
scene.background=new THREE.Color(0x87ceeb);
const hemi=new THREE.HemisphereLight(0xb1e1ff,0x444422,0.8);
scene.add(hemi);
}