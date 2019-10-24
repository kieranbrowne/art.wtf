import {SphereGeometry, ShaderMaterial, Mesh, BackSide, Scene} from 'three';

export const uniforms = {
    //texture: { type: 't', value: THREE.ImageUtils.loadTexture('/path/to/my_image.jpg') }
    "time": { value: 1.0 }
};

const plainVertShader = "uniform float time; varying vec2 vUv; void main() {vUv = uv; vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 ); gl_Position = projectionMatrix * mvPosition;}"

const material = new ShaderMaterial( {
    uniforms: uniforms,
    vertexShader: plainVertShader,
    fragmentShader: "varying vec2 vUv; uniform float time;"+
        "void main( void ) {"+
        "vec2 position = - 1.0 + 2.0 * vUv;"+
        "vec2 gv = fract(vUv*80. + time);"+
        "vec3 color = vec3(.6+vUv.y/2.,.6+vUv.y/2.,0.)*smoothstep(.2,.3,length(gv-.5));"+
        "gl_FragColor = vec4( color, 1.0 );"+
        "}"
});

export function addSky(scene : Scene) {

    const geometry = new SphereGeometry( 115, 18, 18 );


    material.side = BackSide;

    const skyBox = new Mesh(geometry, material);
    skyBox.scale.set(-1, 1, 1);
    scene.add(skyBox);
}

