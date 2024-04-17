import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';


let maVoiture = null;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 500);
camera.position.set(1,1,3);
camera.lookAt(0,0,0);


const loader = new GLTFLoader();
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Soft white light
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(0, 1, 1); // Direction from above and slightly in front
scene.add(ambientLight);
scene.add(directionalLight);




const cubeGeo = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshStandardMaterial({color : 0x22222});
const monCube = new THREE.Mesh(cubeGeo,cubeMaterial);

scene.add(monCube);



function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
    monCube.rotateX(0.005);
}
animate();

if ( WebGL.isWebGLAvailable() ) {

	// Initiate function or other initializations here
    console.log("web GL Loaded");
	animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}