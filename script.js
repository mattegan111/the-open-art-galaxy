import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
// Not yet implemented:
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff, .1);

scene.add(pointLight, ambientLight);

// Not yet implemented
// const controls = new OrbitControls(camera, renderer.domElement)

const geometryStar = new THREE.SphereGeometry((Math.random()), 24, 24);
const materialStar = new THREE.MeshStandardMaterial({color: 0xffffff});

function addStar(){
    const meshStar = new THREE.Mesh(geometryStar, materialStar);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(50));

    meshStar.position.set(x, y, z);
    scene.add(meshStar);
}

Array(50).fill().forEach(addStar);

//Not yet implemented
// function animate() {
//   requestAnimationFrame(animate);
//   controls.update();
//   renderer.render(scene, camera);
// }

// animate();

renderer.render(scene, camera);