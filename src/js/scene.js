import * as THREE from 'three';

// Scene Setup
const canvas = document.getElementById('webgl');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3);
const velocities = new Float32Array(particlesCount * 3);
const colors = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i += 3) {
  posArray[i] = (Math.random() - 0.5) * 50;
  posArray[i + 1] = (Math.random() - 0.5) * 50;
  posArray[i + 2] = (Math.random() - 0.5) * 50;
  
  velocities[i] = (Math.random() - 0.5) * 0.02;
  velocities[i + 1] = (Math.random() - 0.5) * 0.02;
  velocities[i + 2] = (Math.random() - 0.5) * 0.02;
  
  // Random colors between blue and purple
  const colorChoice = Math.random();
  if (colorChoice > 0.5) {
    colors[i] = 0;
    colors[i + 1] = 0.85;
    colors[i + 2] = 1;
  } else {
    colors[i] = 0.66;
    colors[i + 1] = 0.33;
    colors[i + 2] = 0.97;
  }
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.04,
  vertexColors: true,
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Main Rotating Torus (Hero Object)
const torusGeometry = new THREE.TorusGeometry(2, 0.6, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({
  color: 0x00d9ff,
  emissive: 0x00d9ff,
  emissiveIntensity: 0.5,
  metalness: 0.8,
  roughness: 0.2,
  wireframe: true
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.set(3, 0, -2);
scene.add(torus);

// Floating Objects
const floatingObjects = [];

for (let i = 0; i < 15; i++) {
  const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
  const material = new THREE.MeshBasicMaterial({
    color: i % 2 === 0 ? 0x00d9ff : 0xa855f7,
    transparent: true,
    opacity: 0.3,
    wireframe: true
  });
  const cube = new THREE.Mesh(geometry, material);
  
  cube.position.set(
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 10
  );
  
  cube.rotation.set(
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    Math.random() * Math.PI
  );
  
  floatingObjects.push({
    mesh: cube,
    rotationSpeed: {
      x: (Math.random() - 0.5) * 0.01,
      y: (Math.random() - 0.5) * 0.01,
      z: (Math.random() - 0.5) * 0.01
    }
  });
  
  scene.add(cube);
}

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0x00d9ff, 2, 100);
pointLight1.position.set(5, 5, 5);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xa855f7, 2, 100);
pointLight2.position.set(-5, -5, 5);
scene.add(pointLight2);

// Mouse Tracking
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorGlow = document.querySelector('.cursor-glow');

if (cursor && cursorGlow) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    cursorGlow.style.left = (e.clientX - 150) + 'px';
    cursorGlow.style.top = (e.clientY - 150) + 'px';
  });

  const interactiveElements = document.querySelectorAll('a, button, .service-cube, .pricing-card, .portfolio-card, .team-member');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2)';
      cursor.style.borderColor = '#a855f7';
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.borderColor = '#00d9ff';
    });
  });
}

// Animation Loop
const clock = new THREE.Clock();
const mouse = { x: 0, y: 0 };

function animate() {
  requestAnimationFrame(animate);
  
  const elapsedTime = clock.getElapsedTime();
  
  mouse.x += (mouseX - mouse.x) * 0.05;
  mouse.y += (mouseY - mouse.y) * 0.05;
  
  camera.position.x = mouse.x * 0.5;
  camera.position.y = mouse.y * 0.5;
  camera.lookAt(scene.position);
  
  const positions = particlesGeometry.attributes.position.array;
  for (let i = 0; i < particlesCount; i++) {
    const i3 = i * 3;
    
    positions[i3] += velocities[i3];
    positions[i3 + 1] += velocities[i3 + 1];
    positions[i3 + 2] += velocities[i3 + 2];
    
    if (Math.abs(positions[i3]) > 25) velocities[i3] *= -1;
    if (Math.abs(positions[i3 + 1]) > 25) velocities[i3 + 1] *= -1;
    if (Math.abs(positions[i3 + 2]) > 25) velocities[i3 + 2] *= -1;
  }
  particlesGeometry.attributes.position.needsUpdate = true;
  
  particlesMesh.rotation.y = elapsedTime * 0.05;
  
  // Rotate main torus
  torus.rotation.x = elapsedTime * 0.3;
  torus.rotation.y = elapsedTime * 0.5;
  torus.position.y = Math.sin(elapsedTime * 0.5) * 0.5;
  
  floatingObjects.forEach(obj => {
    obj.mesh.rotation.x += obj.rotationSpeed.x;
    obj.mesh.rotation.y += obj.rotationSpeed.y;
    obj.mesh.rotation.z += obj.rotationSpeed.z;
    
    obj.mesh.position.y += Math.sin(elapsedTime + obj.mesh.position.x) * 0.001;
  });
  
  pointLight1.position.x = Math.sin(elapsedTime * 0.5) * 5;
  pointLight1.position.y = Math.cos(elapsedTime * 0.5) * 5;
  
  pointLight2.position.x = Math.cos(elapsedTime * 0.5) * 5;
  pointLight2.position.y = Math.sin(elapsedTime * 0.5) * 5;
  
  renderer.render(scene, camera);
}

animate();

// Resize Handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
