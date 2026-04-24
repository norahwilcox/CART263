// import libraries
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// creates 3d scene
function create3DScene(canvasId, modelPath, width, height) {
    // selelct the specific HTML canvas for rendering
    const canvas = document.querySelector(canvasId);
    // Shows performance data
    const statsOverlay = document.getElementById('stats-overlay'); 
    // holds 3d objects, lights cameras etc
    const scene = new THREE.Scene();

    // adds fog
    scene.fog = new THREE.FogExp2(0x0D0D0D, 0.3);

    // draws the scene onto the canvas using WebGL
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;

    //creates hidden element that captures webcam feed
    const video = document.createElement('video');
    video.autoplay = true;
    video.playsInline = true;
    // requests access to the user's webcam
    navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } }).then(stream => {
        video.srcObject = stream;
        video.play();
    });

    // converts live video feed into texture for 3D object
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.colorSpace = THREE.SRGBColorSpace;

    // primary camera
    const camera1 = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera1.position.set(0, 0, 3.5);

    // secondary camera
    const camera2 = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera2.position.set(3, 3, 3);
    camera2.lookAt(0, 0, 0);
    // assigns layers to control visibility of objects for secondary camera
    camera2.layers.enable(1);
    camera2.layers.enable(2);
    camera2.layers.enable(0);

    // shows primary camera wireframe
    const helper = new THREE.CameraHelper(camera1);
    helper.layers.set(2);
     scene.add(helper);

    scene.add(camera1); 
    scene.add(camera2);
    // toggles between both cameras
    let activeCamera = camera1;

    // Geometry and material for the plane that displays the webcam feed
    const planeGeo = new THREE.PlaneGeometry(2, 2);
    const planeMat = new THREE.MeshBasicMaterial({ map: videoTexture, side: THREE.DoubleSide });
    const webcamPlane = new THREE.Mesh(planeGeo, planeMat);
    // sets layer so it can be filtered during rendering
    webcamPlane.layers.set(1);
    // flips feed horizontally for mirror effect
    webcamPlane.scale.x = -1;
    // positions the plane relative to the primary camera
    webcamPlane.position.set(0, 0, -camera1.near);
    camera1.add(webcamPlane);
    
    // stores 360 render for reflections
    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(1024, { format: THREE.RGBAFormat });
    // camera that looks in 6 dirrections to capture the enviornment 
    const cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRenderTarget);
    cubeCamera.layers.set(1);
    scene.add(cubeCamera);

    // uses video feed as global reflection source for materials
    videoTexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = videoTexture;

    // Allows user to control the active camera
    const controls = new OrbitControls(activeCamera, renderer.domElement);
    // smoother movement only for the last canvas
    if (canvasId === '#canvas-final') {
        controls.enableDamping = true;
    }

    // spotlight
    const spotLight = new THREE.SpotLight(0xffffff, 200);
    spotLight.position.set(2, 5, 2);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.9;
    spotLight.castShadow = true;
    scene.add(spotLight);

    // invisible point that the spotlight points towards
    const spotTarget = new THREE.Object3D();
    scene.add(spotTarget);
    spotLight.target = spotTarget;

    // ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); 
    scene.add(ambientLight);

    let mirrorObject = null;
    const loader = new GLTFLoader();
    
    // loads the 3d model
    loader.load(modelPath, (gltf) => {
        mirrorObject = gltf.scene;

        if (canvasId === '#canvas-final') {
            // iterates through model parts to apply reflective material
            mirrorObject.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.material = new THREE.MeshStandardMaterial({
                        color: 0xffffff,
                        metalness: 0.999,
                        roughness: 0.07,
                        envMap: cubeRenderTarget.texture,
                        envMapIntensity: 3.0
                    });
                }
            });
        }
        scene.add(mirrorObject);
    });

    let particleSystem = null; 

    // particle effect
    if (canvasId === '#canvas-final') {
        const particlesCount = 3500;
        const posArray = new Float32Array(particlesCount * 3);
        // randomize particles
        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }

        const particleGeo = new THREE.BufferGeometry();
        particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particleMat = new THREE.PointsMaterial({
            size: 0.02,
            color: 0xffffff,
            transparent: true,
            opacity: 0.2
        });

        particleSystem = new THREE.Points(particleGeo, particleMat);
        scene.add(particleSystem);
    }
    
    // calculating fps
    let lastTime = performance.now();
    let frames = 0;
    let fps = 0;

    // loop that renders every frame
    function animate() {
        requestAnimationFrame(animate);

        // slowly rotates particles
        if (particleSystem) {
        particleSystem.rotation.y += 0.0005;
    }
        // calculates and tracks fps
        const currentTime = performance.now();
        frames++;
        if (currentTime >= lastTime + 1000) {
            fps = frames;
            frames = 0;
            lastTime = currentTime;
        }

        // updates the UI if the secondary camera is active
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

        if (mirrorObject) {
            // adjusts webcam plane size based on distance to the object
                const dist = activeCamera.position.distanceTo(mirrorObject.position);
                const scaleFactor = 2 / dist;
                webcamPlane.scale.set(-scaleFactor * 1.77, scaleFactor, 1);
            // hides object, updates reflection camera and shows object again
                mirrorObject.visible = false;
                cubeCamera.position.copy(mirrorObject.position);
                cubeCamera.update(renderer, scene);
                mirrorObject.visible = true;
            }

        // controls move with the right camera
        controls.object = activeCamera;
        // updates the camera wireframe
        helper.update();
        // only shows wireframe when second camera is active
        helper.visible = (activeCamera !== camera1);
        controls.update(); 
        // execute render
        renderer.render(scene, activeCamera);
    }
    animate();

    // switches camera when 1 or 2 is pressed
    window.addEventListener('keydown', (e) => {
        if (canvasId === '#canvas-monkey') return;
        if (e.key === '1') activeCamera = camera1;
        if (e.key === '2') activeCamera = camera2;
    });
}

// inicialize the seperate scenes
create3DScene('#canvas-final', 'assets/final.glb', 1125, 750);
create3DScene('#canvas-monkey', 'assets/monkey.glb', 530, 530);