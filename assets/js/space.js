// Three.js Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas').appendChild(renderer.domElement);

// Create a particle system
const particlesGeometry = new THREE.BufferGeometry();
const particleCount = 5000;
const posArray = new Float32Array(particleCount * 3);
const velocities = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 200;
    velocities[i] = (Math.random() - 0.5) * 0.02;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const material = new THREE.PointsMaterial({
    size: 0.5,
    color: 0xffffff,
    transparent: true,
    opacity: 0.6
});
const particlesMesh = new THREE.Points(particlesGeometry, material);
scene.add(particlesMesh);

camera.position.z = 50;

function updateParticles() {
    const positions = particlesGeometry.attributes.position.array;
    const limit = 100;
    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] += velocities[i];
        if (positions[i] > limit) {
            positions[i] = limit;
            velocities[i] *= -1;
        } else if (positions[i] < -limit) {
            positions[i] = -limit;
            velocities[i] *= -1;
        }
    }
    particlesGeometry.attributes.position.needsUpdate = true;
}

function animate() {
    requestAnimationFrame(animate);
    updateParticles();
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
