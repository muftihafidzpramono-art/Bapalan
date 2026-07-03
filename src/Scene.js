const ambient = new THREE.AmbientLight(
    0xffffff,
    1
);

scene.add(ambient);

const sun = new THREE.DirectionalLight(
    0xffffff,
    5
);

sun.position.set(
    100,
    200,
    100
);

sun.castShadow = true;

sun.shadow.mapSize.width = 4096;
sun.shadow.mapSize.height = 4096;

sun.shadow.camera.left = -300;
sun.shadow.camera.right = 300;
sun.shadow.camera.top = 300;
sun.shadow.camera.bottom = -300;

scene.add(sun);