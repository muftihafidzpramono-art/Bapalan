import * as THREE from "three";

export class Renderer {

    constructor(){

        this.renderer = new THREE.WebGLRenderer({

            antialias:true,

            powerPreference:"high-performance"

        });

        this.renderer.setPixelRatio(

            Math.min(window.devicePixelRatio,2)

        );

        this.renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );

        this.renderer.shadowMap.enabled=true;

        this.renderer.shadowMap.type=

        THREE.PCFSoftShadowMap;

        this.renderer.outputColorSpace=

        THREE.SRGBColorSpace;

        this.renderer.toneMapping=

        THREE.ACESFilmicToneMapping;

        this.renderer.toneMappingExposure=1.35;

        this.renderer.physicallyCorrectLights=true;

        document.body.appendChild(

            this.renderer.domElement

        );

        window.addEventListener(

            "resize",

            ()=>{

                this.renderer.setSize(

                    window.innerWidth,

                    window.innerHeight

                );

            }

        );

    }

    render(scene,camera){

        this.renderer.render(scene,camera);

    }

}