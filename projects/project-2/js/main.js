// LOADING
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function create3DScene(canvasId, modelPath, width, height) {
    const canvas = document.querySelector(canvasId);
    const statsOverlay = document.getElementById('stats-overlay'); 

    //SCENE
    const scene = new THREE.Scene()


    // WEBCAM
    const video = document.createElement('video');
    video.autoplay = true;
    video.playsInline = true;

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => { video.srcObject = stream; video.play(); })
        .catch(err => console.error("Webcam error:", err));

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.colorSpace = THREE.SRGBColorSpace;


    // CAMERA

    // Camera 1: illusion
    const camera1 = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera1.position.z = 3.5;
    const helper = new THREE.CameraHelper(camera1);
    scene.add(helper);


    // Camera 2: reality
    const camera2 = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera2.position.z = 5;
    camera2.position.y = 5;
    camera2.position.x = 5;

    let activeCamera = camera1;

    // Create plane for webcam
    const webcamGeo = new THREE.PlaneGeometry(1, 0.75); 
    const webcamMat = new THREE.MeshBasicMaterial({ map: videoTexture, side: THREE.DoubleSide });
    const webcamMesh = new THREE.Mesh(webcamGeo, webcamMat);

    webcamMesh.position.set(0, 0, 0); 
    webcamMesh.layers.set(1); 
    camera2.layers.enable(1); 
    camera1.add(webcamMesh); 

    scene.add(camera1); 
    scene.add(camera2);


    // CANVAS AND RENDERER
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);


    // MOVEMENT CONTROLS
    const controls = new OrbitControls(activeCamera, renderer.domElement);


    // LIGHTS
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 2).normalize();
    scene.add(light, new THREE.AmbientLight(0xffffff, 1), new THREE.DirectionalLight(0xffffff, 2));


    // LOAD MODELS
    const loader = new GLTFLoader();
    loader.load(modelPath, (gltf) => {
        scene.add(gltf.scene);
    });


    let lastTime = performance.now();
    let frames = 0;
    let fps = 0;

    // LOAD FRAMES
    function animate() {
        requestAnimationFrame(animate);

        const currentTime = performance.now();
        frames++;
        if (currentTime >= lastTime + 1000) {
            fps = frames;
            frames = 0;
            lastTime = currentTime;
        }

        if (activeCamera === camera2) {
            statsOverlay.style.display = 'block';
            const { x, y, z } = camera1.position;
            statsOverlay.innerHTML = `
                FPS: ${fps}<br>
                Camera Position: x:${x.toFixed(2)} y:${y.toFixed(2)} z:${z.toFixed(2)}
            `;
        } else if (canvasId === '#canvas-final') {
            statsOverlay.style.display = 'none';
        }

        controls.object = activeCamera;
        helper.update();
        helper.visible = (activeCamera !== camera1);
        controls.update(); 
        renderer.render(scene, activeCamera);
    }
    animate();

    window.addEventListener('keydown', (e) => {
        if (canvasId === '#canvas-monkey') return; // Do not switch cameras
    
        if (e.key === '1') activeCamera = camera1;
        if (e.key === '2') activeCamera = camera2;
    });
}


// Initialize both canvases with different models
create3DScene('#canvas-final', 'assets/monkey.glb', 1125, 750);
create3DScene('#canvas-monkey', 'assets/monkey.glb', 530, 530);