import {SphereGeometry, ShaderMaterial, Mesh, BackSide, Scene} from 'three';

const uniforms = {
    //texture: { type: 't', value: THREE.ImageUtils.loadTexture('/path/to/my_image.jpg') }
};
const material = new ShaderMaterial( {
    uniforms:       uniforms,
    vertexShader:   "varying vec2 vUv; void main() {vUv = uv; vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 ); gl_Position = projectionMatrix * mvPosition;}",
    fragmentShader: "varying vec2 vUv; float time = 1.; void main( void ) {vec2 position = - 1.0 + 2.0 * vUv; gl_FragColor = vec4( 1., 1., 1. - vUv.y, 1.0 );}"
});

export function addSky(scene : Scene) {

    const geometry = new SphereGeometry( 115, 18, 18 );



    material.side = BackSide;

    const skyBox = new Mesh(geometry, material);
    skyBox.scale.set(-1, 1, 1);
    scene.add(skyBox);
}

