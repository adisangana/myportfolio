let particles = [];
function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketch-holder');
    // Double the particle count
    for (let i = 0; i < 1500; i++) {
        particles.push(new Particle());
    }
}
function draw() {
    background(0, 0, 0, 25); // Slightly transparent black for smooth blending
    // Update and display all particles
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].repelFromMouse();
        particles[i].show();
    }
// Function to switch sections dynamically
function showSection(sectionId) {
    const sections = document.querySelectorAll('.hero-content');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.classList.add('active');
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
            section.classList.remove('active');
        }
    });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
// Function to show the content when the button is clicked
// Function to toggle content visibility when "Run" button is clicked
function runSkillsScript(sectionId) {
    const content = document.getElementById(`${sectionId}-content`);
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden'); // Show content
    if (content) { // Check if the element exists
        content.classList.toggle('hidden'); // Toggle visibility
    } else {
        content.classList.add('hidden'); // Toggle content visibility if already shown
        console.error(`Element with id "${sectionId}-content" not found.`);
    }
}

// Particle class
class Particle {
    constructor() {
        // Initial position and velocity of particles
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(random(-1, 1), random(-1, 1)); // Slow, natural movement
        this.acc = createVector(0, 0);
        this.size = random(2, 7); // Smaller particles for fine dust effect
    }
    update() {
        // Apply velocity to position
        this.vel.add(this.acc);
        this.vel.limit(2); // Limit speed for natural movement
        this.pos.add(this.vel);
        // Reset acceleration each frame
        this.acc.mult(0);
        // Bounce particles at the edges
        if (this.pos.x > width || this.pos.x < 0) {
            this.vel.x *= -1;
        }
        if (this.pos.y > height || this.pos.y < 0) {
            this.vel.y *= -1;
        }
    }
    // Slightly repel particles from the mouse
    repelFromMouse() {
        let mouse = createVector(mouseX, mouseY);
        let force = p5.Vector.sub(this.pos, mouse); // Vector pointing away from the mouse
        let distance = force.mag(); // Get distance between particle and mouse
        // Only apply repulsion if the particle is within a certain distance
        if (distance < 100) {
            let strength = map(distance, 0, 100, 5, 0); // Repel stronger when closer
            force.setMag(strength); // Set the strength of the repulsion
            this.acc.add(force); // Apply repulsion force
        }
    }
    show() {
        noStroke();
        fill(255, 255, 255, 150); // White particles with some transparency
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}
// Initialize with Home section as active
document.addEventListener("DOMContentLoaded", function() {
    showSection('home'); // Start with Home section active
});