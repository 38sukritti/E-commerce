import './styles/main.css';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ==================== SCENE SETUP ====================
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

// ==================== PARTICLES SYSTEM ====================
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 3000;
const posArray = new Float32Array(particlesCount * 3);
const velocities = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 50;
  velocities[i] = (Math.random() - 0.5) * 0.02;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.03,
  color: 0x00d9ff,
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// ==================== FLOATING OBJECTS ====================
const floatingObjects = [];

// Create glowing cubes
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

// ==================== LIGHTING ====================
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0x00d9ff, 2, 100);
pointLight1.position.set(5, 5, 5);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xa855f7, 2, 100);
pointLight2.position.set(-5, -5, 5);
scene.add(pointLight2);

// ==================== MOUSE TRACKING ====================
const mouse = {
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0
};

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  
  mouse.targetX = event.clientX;
  mouse.targetY = event.clientY;
});

// ==================== CUSTOM CURSOR ====================
const cursor = document.querySelector('.cursor');
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  
  cursorGlow.style.left = (e.clientX - 150) + 'px';
  cursorGlow.style.top = (e.clientY - 150) + 'px';
});

// Cursor interactions
const interactiveElements = document.querySelectorAll('a, button, .service-cube, .pricing-card, .portfolio-item');
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

// ==================== PARALLAX SYSTEM ====================
const parallaxElements = document.querySelectorAll('.service-cube, .pricing-card, .team-member, .portfolio-item');

document.addEventListener('mousemove', (e) => {
  const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
  const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
  
  parallaxElements.forEach((el, index) => {
    const speed = (index % 3 + 1) * 0.5;
    el.style.transform = `translateX(${xAxis * speed}px) translateY(${yAxis * speed}px)`;
  });
});

// ==================== SCROLL ANIMATIONS ====================
gsap.from('.hero-title .line', {
  y: 100,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: 'power4.out'
});

gsap.from('.hero-subtitle', {
  y: 50,
  opacity: 0,
  duration: 1,
  delay: 0.8,
  ease: 'power4.out'
});

gsap.from('.hero-buttons', {
  y: 50,
  opacity: 0,
  duration: 1,
  delay: 1,
  ease: 'power4.out'
});

// Service cubes animation
gsap.from('.service-cube', {
  scrollTrigger: {
    trigger: '.services-section',
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse'
  },
  y: 100,
  opacity: 0,
  duration: 0.8,
  stagger: 0.15,
  ease: 'power3.out'
});

// Pricing cards animation
gsap.from('.pricing-card', {
  scrollTrigger: {
    trigger: '.pricing-section',
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse'
  },
  y: 100,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: 'power3.out'
});

// Team members animation
gsap.from('.team-member', {
  scrollTrigger: {
    trigger: '.team-section',
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse'
  },
  scale: 0.8,
  opacity: 0,
  duration: 0.8,
  stagger: 0.3,
  ease: 'back.out(1.7)'
});

// ==================== PRICING CARD 3D TILT ====================
const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ==================== PLAN SELECTION ====================
const selectPlanButtons = document.querySelectorAll('.select-plan');

selectPlanButtons.forEach(button => {
  button.addEventListener('click', () => {
    const plan = button.getAttribute('data-plan');
    const price = button.getAttribute('data-price');
    const inquiryId = Math.floor(100000 + Math.random() * 900000);
    
    const message = `Hello Grovix Studio, I selected ${plan} Plan (₹${price}/month). Inquiry ID: #${inquiryId}`;
    const whatsappUrl = `https://wa.me/919999999999?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  });
});

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contactForm');
const inquiryResult = document.getElementById('inquiryResult');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const inquiryId = Math.floor(100000 + Math.random() * 900000);
  
  contactForm.style.display = 'none';
  inquiryResult.classList.add('active');
  
  inquiryResult.innerHTML = `
    <h3>Welcome to Grovix Studio</h3>
    <p>Your inquiry has been received</p>
    <div class="inquiry-id">#${inquiryId}</div>
    <p>Our sales strategist will contact you shortly.</p>
    <a href="https://wa.me/919999999999?text=${encodeURIComponent(`Hello, my inquiry ID is #${inquiryId}`)}" 
       class="whatsapp-btn" target="_blank">
      CONNECT VIA WHATSAPP
    </a>
  `;
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ==================== NAVBAR SCROLL EFFECT ====================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.style.padding = '15px 40px';
    navbar.style.background = 'rgba(255, 255, 255, 0.05)';
  } else {
    navbar.style.padding = '20px 40px';
    navbar.style.background = 'rgba(255, 255, 255, 0.03)';
  }
  
  lastScroll = currentScroll;
});

// ==================== ANIMATION LOOP ====================
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  
  const elapsedTime = clock.getElapsedTime();
  
  // Smooth mouse following
  mouse.x += (mouseX - mouse.x) * 0.05;
  mouse.y += (mouseY - mouse.y) * 0.05;
  
  // Camera movement based on mouse
  camera.position.x = mouse.x * 0.5;
  camera.position.y = mouse.y * 0.5;
  camera.lookAt(scene.position);
  
  // Animate particles
  const positions = particlesGeometry.attributes.position.array;
  for (let i = 0; i < particlesCount; i++) {
    const i3 = i * 3;
    
    positions[i3] += velocities[i3];
    positions[i3 + 1] += velocities[i3 + 1];
    positions[i3 + 2] += velocities[i3 + 2];
    
    // Boundary check
    if (Math.abs(positions[i3]) > 25) velocities[i3] *= -1;
    if (Math.abs(positions[i3 + 1]) > 25) velocities[i3 + 1] *= -1;
    if (Math.abs(positions[i3 + 2]) > 25) velocities[i3 + 2] *= -1;
  }
  particlesGeometry.attributes.position.needsUpdate = true;
  
  // Rotate particle mesh
  particlesMesh.rotation.y = elapsedTime * 0.05;
  
  // Animate floating objects
  floatingObjects.forEach(obj => {
    obj.mesh.rotation.x += obj.rotationSpeed.x;
    obj.mesh.rotation.y += obj.rotationSpeed.y;
    obj.mesh.rotation.z += obj.rotationSpeed.z;
    
    obj.mesh.position.y += Math.sin(elapsedTime + obj.mesh.position.x) * 0.001;
  });
  
  // Animate lights
  pointLight1.position.x = Math.sin(elapsedTime * 0.5) * 5;
  pointLight1.position.y = Math.cos(elapsedTime * 0.5) * 5;
  
  pointLight2.position.x = Math.cos(elapsedTime * 0.5) * 5;
  pointLight2.position.y = Math.sin(elapsedTime * 0.5) * 5;
  
  renderer.render(scene, camera);
}

animate();

// ==================== RESIZE HANDLER ====================
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// ==================== LOADING SEQUENCE ====================
window.addEventListener('load', () => {
  document.body.style.overflow = 'hidden';
  
  gsap.to('.hero', {
    opacity: 1,
    duration: 1,
    onComplete: () => {
      document.body.style.overflow = 'auto';
    }
  });
});

console.log('🚀 Grovix Studio - Digital Domination System Loaded');
