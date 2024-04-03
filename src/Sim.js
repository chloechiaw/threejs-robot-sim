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

  // Lighting should work
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
  const controls = new OrbitControls(camera, renderer.domElement);

  
  const uiControls = {
    baseRotation: 0,
    middleRotation: 0,
    armRotation: 0,
  };

  const gui = new dat.GUI();
  gui.add(uiControls, 'baseRotation', -Math.PI, Math.PI).name('Base Rotation').onChange(() => {
    base.rotation.y = uiControls.baseRotation;
  });
  gui.add(uiControls, 'middleRotation', -Math.PI, Math.PI).name('Middle Rotation').onChange(() => {
    middle.rotation.y = uiControls.middleRotation;
  });
  gui.add(uiControls, 'armRotation', -Math.PI, Math.PI).name('Arm Rotation').onChange(() => {
    arm.rotation.x = uiControls.armRotation;
  });

  const updateRobot = () => {
    base.rotation.y = uiControls.baseRotation;
    middle.rotation.y = uiControls.middleRotation;
    arm.rotation.x = uiControls.armRotation;
  };

  const animate = () => {
    requestAnimationFrame(animate);
    updateRobot(); 
    renderer.render(scene, camera);
  };
  animate();
    .add(uiControls, "middleRotation", -Math.PI, Math.PI)
    .name("Middle Rotation")
    .onChange(() => {
      middle.rotation.y = uiControls.middleRotation;
    });

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

  // I think thsi works
  scene.add(base);
  base.add(middle);
  arm.add(arm);


  camera.position.z = 20;

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };
  animate();
};
export default RobotArm;
// Scene setup
