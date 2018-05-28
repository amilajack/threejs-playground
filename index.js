import * as THREE from 'three/build/three.module.js';

// Scene configuration
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderer configuration
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Drawing an object to the scene
const geometry = new THREE.BoxGeometry( 3, 2, 4 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add(cube);

// Camera position
camera.position.z = 5;

// Render loop
function animate() {
    cube.rotation.x += 0.1;
    // cube.rotation.y += 0.1;
    // cube.rotation.z += 0.1;
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();