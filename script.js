// import code from a URL. We're importing stuff that helps working with 3D.

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";

// Create a 3D environment with a scene (a 3d space), camera (a point from which the scene is viewed) and a renderer (which takes the cameras vision and renders it to a 2d image we can see on a screen)

const scene = new THREE.Scene();
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(20);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

// Add some lighting to the scene

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);
const ambientLight = new THREE.AmbientLight(0xffffff, .1);

scene.add(pointLight, ambientLight);

// Initialise controls so the user can 'move'.

const controls = new OrbitControls(camera, renderer.domElement);

// get dir of planets (dev contributions)

async function getRepoDirData() {
  const mainDirRes = await fetch('https://api.github.com/repos/mattegan111/the-open-art-galaxy/git/trees/main');
  const mainDirData = await mainDirRes.json();
  const planetsDirTreeSha = mainDirData.tree.find(x => x.path == 'planets').sha;
  const planetsDirRes = await fetch(`https://api.github.com/repos/mattegan111/the-open-art-galaxy/git/trees/${planetsDirTreeSha}`);
  const planetsDirData = await planetsDirRes.json();
  return planetsDirData;
}

const planetsDirData = await getRepoDirData();

let x = 0;
let y = 0;
let z = 0;
async function addStar(planetName){
    const singlePlanetDirSha = planetsDirData.tree.find(x => x.path == planetName).sha
    const singlePlanetDirRes = await fetch(`https://api.github.com/repos/mattegan111/the-open-art-galaxy/git/trees/${singlePlanetDirSha}`);
    const singlePlanetDirData = await singlePlanetDirRes.json();

    const planetImage = singlePlanetDirData.tree.find(x => x.path == 'planetwrapper.jpg');
    
    let materialStar;

    if(planetImage != null){
      const moonTexture = new THREE.TextureLoader().load(`./planets/${planetName}/planetwrapper.jpg`);
      materialStar = new THREE.MeshStandardMaterial({map: moonTexture});
    } else {
      materialStar = new THREE.MeshStandardMaterial({color: 0xffffff});
    }

    const geometryStar = new THREE.SphereGeometry((Math.random()), 24, 24);
    let meshStar = new THREE.Mesh(geometryStar, materialStar);

    meshStar.name = planetName;
    
    const [xEdit, yEdit, zEdit] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(3));

    x = x + xEdit;
    y = y + 3 + yEdit;
    z = z - 3 + zEdit;

    meshStar.position.set(x, y, z);
    scene.add(meshStar);
}

planetsDirData.tree.forEach(tree => {
  addStar(tree.path)
});

const raycaster = new THREE.Raycaster();
let pointer = new THREE.Vector2();
let INTERSECTED;

document.addEventListener('click', onMouseClick);

function onMouseClick() {
  const intersects = raycaster.intersectObjects( scene.children, false );
  window.location = `./planets/${intersects[0].object.name}/index.html`;
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