import * as THREE from 'three';
import {addObjToScene} from './loader';
import {addSky, uniforms} from './sky';
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


function animate(timestamp) {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    keyControls(camera);
    uniforms[ "time" ].value = timestamp / 1000;
}
animate(0);



var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(60, 100%, 75%)'), 0.8);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(20, 100%, 75%)'), 0.25);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

var ambientLight = new THREE.AmbientLight(0x80d93c, 1.);


scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);
scene.add(ambientLight);



for(let i=0; i<10; i++) {
    setTimeout(() => {
    addObjToScene({name: "kusama_pumpkin",
                   mod: x=>{
                       x.position.z -= Math.random()*36 - 8;
                       x.position.x += Math.random()*36 - 8;
                       x.position.y = 80;
                       let s = Math.random() + .3;
                       x.scale.set(s,s,s);
                       x.rotation.y = Math.random()*6.18;
                       x.vel = 0;
                   },
                   anim: (function foo(x) {
                       x.position.y -= x.vel;
                       x.vel += 0.1;
                       if(x.position.y< 0) {
                           x.position.y = 0;
                           x.vel *= -.5;
                       }
                       if((x.position.y > 0 || Math.abs(x.vel) > .2))
                         setTimeout(()=>{foo(x)}, 1000/30)
                   })
                  } , scene);}, i*900);
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
