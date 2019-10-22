import * as THREE from 'three';
import {addObjToScene} from './loader';
import {addSky} from './sky';
import {keyControls} from './control';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    65, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xcccccc, 1 );
document.body.appendChild( renderer.domElement );


camera.position.z = 10;
camera.position.y = 4; // eye height


addSky(scene);


function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    keyControls(camera);
}
animate();



var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 1.05);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

var ambientLight = new THREE.AmbientLight(0x660000, 2.);


scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);
scene.add(ambientLight);



for(let i=0; i<10; i++) {
    addObjToScene({name: "kusama_pumpkin",
               mod: x=>{
                   x.position.z -= Math.random()*16 - 8;
                   x.position.x += Math.random()*16 - 8;
                   let s = Math.random() + .3;
                   x.scale.set(s,s,s);
                   x.rotation.y = Math.random()*6.18;
               }} , scene);
}

function findGetParameter(parameterName): string {
    var result = "";
    var tmp : string[] = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function getInitialLoc() {
    if(findGetParameter("loc")) {
        let loc = findGetParameter("loc").split(",");
        camera.position.x = parseFloat(loc[0]);
        camera.position.y = parseFloat(loc[1]);
        camera.position.z = parseFloat(loc[2]);
    }
    if(findGetParameter("rot")) {
        let rot = findGetParameter("rot").split(",");
        camera.rotation.x = parseFloat(rot[0]);
        camera.rotation.y = parseFloat(rot[1]);
        camera.rotation.z = parseFloat(rot[2]);
    }
}

function pushHistory() {
    history.replaceState({}, "", "?loc=" +
                         [camera.position.x, camera.position.y, camera.position.z].map(x=>x.toFixed(1)).join(',')
                         + "&rot=" +
                         [camera.rotation.x, camera.rotation.y, camera.rotation.z].map(x=>x.toFixed(1)).join(',')
                        );

    setTimeout(pushHistory, 1000);
}

getInitialLoc();

pushHistory();
