import * as THREE from 'three'
import { LoadGLTFByPath } from './Helpers/ModelHelper.js'

let renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#background"),
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.shadows = true;
renderer.shadowType = 1;
renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = 0;
renderer.toneMappingExposure = 1;
renderer.useLegacyLights = false;
renderer.toneMapping = THREE.NoToneMapping;
renderer.setClearColor(0xffffff, 0);
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();

let cameraList = [];

let camera;

LoadGLTFByPath(scene)
  .then(() => {
    retrieveListOfCameras(scene);
  })
  .catch((error) => {
    console.error("Error loading JSON scene:", error);
  });

function retrieveListOfCameras(scene) {
  scene.traverse(function (object) {
    if (object.isCamera) {
      cameraList.push(object);
    }
  });

  camera = cameraList[0];

  updateCameraAspect(camera);

  animate();
}

function updateCameraAspect(camera) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
};




    