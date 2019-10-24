import {Scene, Object3D} from 'three';
import {MTLLoader, OBJLoader} from 'three-obj-mtl-loader';

interface Obj {
    name: string;
    mod?(Object3D): void;
    anim?(Object3D): void;
}

export function addObjToScene(art: Obj, scene: Scene) {
    var mtlLoader = new MTLLoader();
    //mtlLoader.setTexturePath('./');
    mtlLoader.setPath('/assets/');
    var objLoader = new OBJLoader();
    objLoader.setPath('/assets/');

    var request = new XMLHttpRequest();
    request.open('GET', '/', true);

    request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
            // Success!
            //var data = JSON.parse(this.response);
            mtlLoader.load(
                art.name+'.mtl',
                function (materials) {
                    materials.preload();
                    //var material = new THREE.MeshLambertMaterial({color : 0xcccccc});
                    var out;
                    objLoader.setMaterials(materials);
                    objLoader.load(
                        art.name+'.obj',
                        function (object) {
                            scene.add(object);
                            //kusama = object;
                            if(art.mod)
                                art.mod(object);
                            if(art.anim) {
                                art.anim(object);
                            }
                            console.log("loaded "+art.name)
                        });
                });



        } else {
            // We reached our target server, but it returned an error
        }
    };

    request.onerror = function() {
        // There was a connection error of some sort
    };

    request.send();
}
