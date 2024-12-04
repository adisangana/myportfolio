let particles = [];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketch-holder');

    // Initialize particle system
    for (let i = 0; i < 1500; i++) {
        particles.push(new Particle());
    }

    // Initialize theme switcher
    const themeSwitcher = document.getElementById("theme-switcher");
    if (themeSwitcher) {
        themeSwitcher.addEventListener("click", toggleTheme);
    }

    // Initialize progress bars
    initializeProgressBars();
}

function draw() {
    background(0, 0, 0, 25); // Smooth blending for particle trails

    // Update and display all particles
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].repelFromMouse();
        particles[i].show();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Function to show the content when the button is clicked
function runSkillsScript(sectionId) {
    const content = document.getElementById(`${sectionId}-content`);
    if (content) {
        content.classList.toggle('hidden'); // Toggle visibility
    }
}

// Particle class
class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(random(-1, 1), random(-1, 1));
        this.acc = createVector(0, 0);
        this.size = random(2, 7); // Small particles for dust effect
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(2); // Smooth movement
        this.pos.add(this.vel);
        this.acc.mult(0);

        // Bounce particles at the edges
        if (this.pos.x > width || this.pos.x < 0) this.vel.x *= -1;
        if (this.pos.y > height || this.pos.y < 0) this.vel.y *= -1;
    }

    repelFromMouse() {
        let mouse = createVector(mouseX, mouseY);
        let force = p5.Vector.sub(this.pos, mouse);
        let distance = force.mag();

        if (distance < 100) {
            let strength = map(distance, 0, 100, 5, 0);
            force.setMag(strength);
            this.acc.add(force);
        }
    }

    show() {
        noStroke();
        fill(255, 255, 255, 150); // White particles with transparency
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}

// Theme switcher functionality
function toggleTheme() {
    const body = document.body;
    body.classList.toggle("dark-theme");

    // Adjust particle color for dark mode
    const isDarkTheme = body.classList.contains("dark-theme");
    const particleColor = isDarkTheme ? [200, 200, 200, 150] : [50, 50, 50, 150];

    for (let particle of particles) {
        particle.color = particleColor;
    }
}

// Initialize progress bars for skills
function initializeProgressBars() {
    const skills = [
        { id: "progress-javascript", level: 90 },
        { id: "progress-python", level: 85 },
        { id: "progress-cpp", level: 80 },
        { id: "progress-react", level: 75 },
        { id: "progress-node", level: 70 },
    ];

    skills.forEach(skill => {
        const progressBar = document.getElementById(skill.id);
        if (progressBar) {
            progressBar.style.width = `${skill.level}%`;
        }
    });
}

// Contact form submission functionality
function handleFormSubmission(event) {
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById("contact-name").value;
    const email = document.getElementById("contact-email").value;
    const message = document.getElementById("contact-message").value;

    if (!name || !email || !message) {
        alert("Please fill out all fields.");
        return;
    }

    console.log("Form submitted:", { name, email, message });
    alert("Thank you for reaching out! Your message has been sent.");
}

// Attach form submission handler
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", handleFormSubmission);
    }
});
