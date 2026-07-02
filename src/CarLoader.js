gltf.scene.traverse((obj)=>{

    if(obj.isMesh){

        obj.castShadow = true;

        obj.receiveShadow = true;

    }

});