import * as THREE from 'three/build/three.module.js';
import WindowResize from 'threejs-window-resize';
import './OrbitControls';

// Scene configuration
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderer configuration
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// material texture
const texture = new THREE.Texture(generateTexture());
texture.needsUpdate = true; // important!
const gradientMaterial = new THREE.MeshBasicMaterial( { map: texture, transparent: true } );

function generateTexture() {
	var size = 512;

	// create canvas
	const canvas = document.createElement( 'canvas' );
	canvas.width = size;
	canvas.height = size;

	// get context
	var context = canvas.getContext( '2d' );

	// draw gradient
	context.rect( 0, 0, size, size );
	var gradient = context.createLinearGradient( 0, 0, size, size );
	gradient.addColorStop(0, '#99ddff'); // light blue 
	gradient.addColorStop(1, 'transparent'); // dark blue
	context.fillStyle = gradient;
	context.fill();

	return canvas;
}

// Drawing an object to the scene
const geometry = new THREE.BoxGeometry( 3, 2, 4 );
const material = new THREE.MeshBasicMaterial({
	color: 0x00ff00,
	wireframe: true
});
const cube = new THREE.Mesh( geometry, gradientMaterial );
scene.add(cube);
scene.add( new THREE.AxesHelper( 20 ) );

// Camera position
camera.position.z = 5;

// Orbit controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', () => {
	renderer.render(scene, camera);
});

WindowResize(renderer, camera);

// Render loop
function animate() {
	controls.update()
    cube.rotation.x += 0.05;
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();