import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const RobotArm = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Lighting
  const light = new THREE.DirectionalLight(0xffffff, 1.0);
  light.position.set(10, 10, 10);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x404040));

  // Create rectangle
  const createRectangularPrism = (width, height, depth) => {
    return new THREE.BoxGeometry(width, height, depth);
  };

  const createCylinder = (radiusTop, radiusBottom, height, radialSegments) => {
    return new THREE.CylinderGeometry(
      radiusTop,
      radiusBottom,
      height,
      radialSegments
    );
  };

  const createBaseComponent = () => {
    const baseGeometry = createRectangularPrism(5, 1, 5);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    return new THREE.Mesh(baseGeometry, baseMaterial);
  };

  const createMiddleComponent = () => {
    const middleGeometry = createRectangularPrism(3, 0.5, 3);
    const middleMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    return new THREE.Mesh(middleGeometry, middleMaterial);
  };

  const createArmComponent = () => {
    const armGeometry = createCylinder(0.5, 0.5, 2, 32);
    const armMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
    return new THREE.Mesh(armGeometry, armMaterial);
  };

  const base = createBaseComponent();
  const middle = createMiddleComponent();
  const arm = createArmComponent();

  base.position.set(0, 0, 2.5);
  middle.position.set(0, 0, 7.5);
  arm.position.set(0, 0, 12.5);

  scene.add(base);
  base.add(middle);
  arm.add(arm);

  // Camera position
  camera.position.z = 20;

  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };
  animate();
};
export default RobotArm;
// Scene setup
