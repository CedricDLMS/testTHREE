import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';

let maVoiture = null;


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 500);
camera.position.set(1,1,3);
camera.lookAt(0,0,0);


const loader = new GLTFLoader();
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff,2);
directionalLight.position.set(0, 10, 6);
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xEEDD82,1);
directionalLight2.position.set(0, 0, 0);
scene.add(directionalLight2);

const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( light );

// Créer la géométrie du cube
const geometry = new THREE.BoxGeometry(100, 100, 100); // Dimension suffisamment grande pour envelopper toute la scène

// Créer le matériau
const material = new THREE.MeshBasicMaterial({ color: '0xfffff', side: THREE.BackSide });

// Créer le mesh (cube)
const skybox = new THREE.Mesh(geometry, material);

// Ajouter le cube à la scène
scene.add(skybox);


// const skyboxLoader = new GLTFLoader();
// skyboxLoader.load('/3DModel/scene.glb', function (gltf) {
//     const skyboxModel = gltf.scene;
//     scene.add(skyboxModel);
//     // Ajustez la taille et la position si nécessaire
//     skyboxModel.scale.set(500, 500, 500); // Ajustez cette échelle selon les dimensions de votre scène
//     skyboxModel.position.set(5, 10, 0); // Centrez le modèle si nécessaire
// });





loader.load( '/3DModel/scene.glb', function ( gltf ) {

	scene.add( gltf.scene );
    maVoiture = gltf.scene;
    console.log("a fonctionné");

}, undefined, function ( error ) {

	console.error( error );

} );



function animate() {  //rendu
    requestAnimationFrame( animate );
    if(maVoiture){
        maVoiture.rotation.y += 0.005;
    }
    // scene.add(skybox);
    renderer.render( scene, camera );
};


if ( WebGL.isWebGLAvailable() ) {

	// Initiate function or other initializations here
    console.log("web GL Loaded");
	animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}