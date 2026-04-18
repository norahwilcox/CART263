// LOADING
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// CAMERA
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10; 

//SCENE
const scene = new THREE.Scene() 
// scene.background = new THREE.Color('skyblue');

// CANVAS AND RENDERER
const canvas = document.querySelector('#three-ex');
const renderer = new THREE.WebGLRenderer({ 
    canvas: canvas, 
    alpha: true // This makes the canvas background transparent
});
renderer.setSize(1125, 750);
camera.aspect = 1125 / 750;
camera.updateProjectionMatrix();
renderer.setPixelRatio(window.devicePixelRatio);

// MOVEMENT CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);

// LIGHT
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.7));
scene.add(new THREE.HemisphereLight(0x5992d4, 1));

// LOAD MODEL
const loader = new GLTFLoader();
loader.load('assets/monkey-square-sphere.glb', function (gltf) {
    scene.add(gltf.scene);
}, undefined, function (error) {
    console.error(error);
});

// LOADS THE FRAMES
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// program tells user how many frames have loaded 
