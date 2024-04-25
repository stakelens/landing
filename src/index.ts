import * as THREE from "three";
import { AsciiEffect } from "three/addons/effects/AsciiEffect.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

const effect = new AsciiEffect(renderer, " .:-+*=%@#", { invert: true });
effect.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(effect.domElement);
effect.domElement.style.color = "white";
effect.domElement.style.backgroundColor = "black";
effect.domElement.style.position = "fixed";
effect.domElement.style.top = "0";
effect.domElement.style.left = "0";
effect.domElement.style.opacity = "0.15";
effect.domElement.style.zIndex = "-1";

const loader = new GLTFLoader();

let model = null;
loader.load("star.glb", function (gltf) {
  model = gltf.scene.children[0];
  model.material = new THREE.MeshLambertMaterial({
    color: 0x00ff00,
  });
  model.scale.set(0.5, 0.5, 0.5);
  scene.add(model);
});

const pointLight = new THREE.PointLight(0xffffff, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

function animate() {
  requestAnimationFrame(animate);

  if (model) {
    model.rotation.x += 0.01;
    model.rotation.y += 0.01;
    model.rotation.z += 0.01;
  }

  effect.render(scene, camera);
}

animate();
