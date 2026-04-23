import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function create3DScene(canvasId, modelPath, width, height) {
    const canvas = document.querySelector(canvasId);
    const statsOverlay = document.getElementById('stats-overlay'); 

    const scene = new THREE.Scene();

    scene.fog = new THREE.FogExp2(0x0D0D0D, 0.3);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;


    const video = document.createElement('video');
    video.autoplay = true;
    video.playsInline = true;

    navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } }).then(stream => {
        video.srcObject = stream;
        video.play();
    });

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.colorSpace = THREE.SRGBColorSpace;


    const camera1 = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera1.position.set(0, 0, 3.5);

    const camera2 = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera2.position.set(3, 3, 3);
    camera2.lookAt(0, 0, 0);
    camera2.layers.enable(1);
    camera2.layers.enable(2);
    camera2.layers.enable(0);

    const helper = new THREE.CameraHelper(camera1);
    helper.layers.set(2);
     scene.add(helper);

    scene.add(camera1); 
    scene.add(camera2);
    let activeCamera = camera1;


    const planeGeo = new THREE.PlaneGeometry(2, 2);
    const planeMat = new THREE.MeshBasicMaterial({ map: videoTexture, side: THREE.DoubleSide });
    const webcamPlane = new THREE.Mesh(planeGeo, planeMat);
    webcamPlane.layers.set(1);
    webcamPlane.scale.x = -1;
    webcamPlane.position.set(0, 0, -camera1.near);
    camera1.add(webcamPlane);
    
    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(1024, { format: THREE.RGBAFormat });
    const cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRenderTarget);
    cubeCamera.layers.set(1);
    scene.add(cubeCamera);

    videoTexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = videoTexture;

    const controls = new OrbitControls(activeCamera, renderer.domElement);
    if (canvasId === '#canvas-final') {
        controls.enableDamping = true;
    }

    const spotLight = new THREE.SpotLight(0xffffff, 200);
    spotLight.position.set(2, 5, 2);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.9;
    spotLight.castShadow = true;
    scene.add(spotLight);

    const spotTarget = new THREE.Object3D();
    scene.add(spotTarget);
    spotLight.target = spotTarget;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1); 
    scene.add(ambientLight);

    let mirrorObject = null;
    const loader = new GLTFLoader();
    
 loader.load(modelPath, (gltf) => {
        mirrorObject = gltf.scene;

        if (canvasId === '#canvas-final') {
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

    if (canvasId === '#canvas-final') {
        const particlesCount = 5000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }

        const particleGeo = new THREE.BufferGeometry();
        particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particleMat = new THREE.PointsMaterial({
            size: 0.02,
            color: 0xffffff,
            transparent: true,
            opacity: 0.5
        });

        particleSystem = new THREE.Points(particleGeo, particleMat);
        scene.add(particleSystem);
    }
    
    let lastTime = performance.now();
    let frames = 0;
    let fps = 0;

    function animate() {
        requestAnimationFrame(animate);

        if (particleSystem) {
        particleSystem.rotation.y += 0.0005;
    }

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

        if (mirrorObject) {
                const dist = activeCamera.position.distanceTo(mirrorObject.position);
                const scaleFactor = 2 / dist;
                webcamPlane.scale.set(-scaleFactor * 1.77, scaleFactor, 1);

                mirrorObject.visible = false;
                cubeCamera.position.copy(mirrorObject.position);
                cubeCamera.update(renderer, scene);
                mirrorObject.visible = true;
            }

        controls.object = activeCamera;
        helper.update();
        helper.visible = (activeCamera !== camera1);
        controls.update(); 
        renderer.render(scene, activeCamera);
    }
    animate();

    window.addEventListener('keydown', (e) => {
        if (canvasId === '#canvas-monkey') return;
        if (e.key === '1') activeCamera = camera1;
        if (e.key === '2') activeCamera = camera2;
    });
}

create3DScene('#canvas-final', 'assets/final.glb', 1125, 750);
create3DScene('#canvas-monkey', 'assets/monkey.glb', 530, 530);