import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff, .1);

scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);


function addStar(){
    const geometryStar = new THREE.SphereGeometry((Math.random()), 24, 24);
    const materialStar = new THREE.MeshStandardMaterial({color: 0xffffff});
    const meshStar = new THREE.Mesh(geometryStar, materialStar);
    
    const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(50));
    
    meshStar.position.set(x, y, z);
    console.log(meshStar);
    scene.add(meshStar);
}

Array(50).fill().forEach(addStar);

const raycaster = new THREE.Raycaster();
let pointer = new THREE.Vector2();
let INTERSECTED;

document.addEventListener('click', onMouseClick);

function onMouseClick() {
  const intersects = raycaster.intersectObjects( scene.children, false );
  console.log(intersects[0].object);
}

document.addEventListener( 'mousemove', onPointerMove );

function onPointerMove( event ) {
  pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function animate() {
  raycaster.setFromCamera( pointer, camera );
  const intersects = raycaster.intersectObjects( scene.children, false );

  if ( intersects.length > 0 ) {
    if ( INTERSECTED != intersects[ 0 ].object ) {
      if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

      INTERSECTED = intersects[ 0 ].object;
      INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
      INTERSECTED.material.emissive.setHex( 0xff0000 );
    }
  } else {
    if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

    INTERSECTED = null;
  }

  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();