import * as THREE from "three";

export class Renderer {

    constructor() {

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false
        });

        this.renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        this.renderer.setPixelRatio(
            Math.min(window.devicePixelRatio, 2)
        );

        this.renderer.outputColorSpace =
            THREE.SRGBColorSpace;

        this.renderer.toneMapping =
            THREE.ACESFilmicToneMapping;

        this.renderer.toneMappingExposure = 1.1;

        this.renderer.shadowMap.enabled = true;

        this.renderer.shadowMap.type =
            THREE.PCFSoftShadowMap;

        this.renderer.setClearColor(0x87CEEB);

        document.body.appendChild(
            this.renderer.domElement
        );

        window.addEventListener("resize", () => {

            this.renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );

        });

    }

    render(scene,camera){

        this.renderer.render(scene,camera);

    }

}