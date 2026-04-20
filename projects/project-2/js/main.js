// LOADING
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function create3DScene(canvasId, modelPath, width, height) {
    const canvas = document.querySelector(canvasId);


    // CAMERA
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 3.5;

    //SCENE
    const scene = new THREE.Scene()


    // CANVAS AND RENDERER
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);


    // MOVEMENT CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);


    // LIGHTS
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 2).normalize();
    scene.add(light, new THREE.AmbientLight(0xffffff, 1), new THREE.DirectionalLight(0xffffff, 2));


    // LOAD MODELS
    const loader = new GLTFLoader();
    loader.load(modelPath, (gltf) => {
        scene.add(gltf.scene);
    });


    // LOAD FRAMES
    function animate() {
        requestAnimationFrame(animate);
        controls.update(); // Smooth controls
        renderer.render(scene, camera);
    }
    animate();
}

// Initialize both canvases with different models
create3DScene('#canvas-final', 'assets/monkey-square-sphere.glb', 1125, 750);
create3DScene('#canvas-monkey', 'assets/monkey.glb', 530, 530);


// program tells user how many frames have loaded 
