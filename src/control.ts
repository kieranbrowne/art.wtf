import {Camera, Vector3} from 'three';

var keys = {};
window.onkeyup = function(e) { keys[e.keyCode] = false; };
window.onkeydown = function(e) { keys[e.keyCode] = true; };

export function keyControls(cam : Camera) {
    var direction = new Vector3( 0, 0, - 1 );
    direction.applyQuaternion( cam.quaternion );

    if(keys[87] || keys[38]) // forward
        cam.position.addScaledVector(direction,.2);
    if(keys[83] || keys[40]) // back
        cam.position.addScaledVector(direction,-.2);
    if(keys[65] || keys[37]) // left
        cam.rotation.y += .02;
    if(keys[68] || keys[39]) // right
        cam.rotation.y -= .02;
    //cam.rotation.x = Math.sin(new Date().getTime()/1000);
}

