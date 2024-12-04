let particles = [];
let darkMode = true; // Initialize in dark mode

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketch-holder');

    // Initialize particles
    for (let i = 0; i < 1500; i++) {
        particles.push(new Particle());
    }

    // Theme switcher event listener
    const themeSwitcher = document.getElementById("theme-switcher");
    if (themeSwitcher) {
        themeSwitcher.addEventListener("click", toggleTheme);
    }

    // Event listener for the Skills section
    document.querySelectorAll(".progress-bar .progress").forEach((progressBar) => {
        progressBar.style.width = "0"; // Start with zero width
    });

    // Trigger progress bar animation when Skills section is shown
    document.querySelector("#about").addEventListener("transitionstart", animateProgressBars);
}

function draw() {
    // Background depends on theme
    background(darkMode ? 0 : 255, 25);

    // Update and display particles
    particles.forEach((particle) => {
        particle.update();
        particle.repelFromMouse();
        particle.show();
    });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Particle class
class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(random(-1, 1), random(-1, 1));
        this.acc = createVector(0, 0);
        this.size = random(2, 7);
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(2);
        this.pos.add(this.vel);
        this.acc.mult(0);

        // Bounce off edges
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
        fill(darkMode ? 255 : 0, 150); // White for dark mode, black for light mode
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}

// Toggle theme
function toggleTheme() {
    darkMode = !darkMode;

    // Update body background and text color
    document.body.style.backgroundColor = darkMode ? "#000" : "#fff";
    document.body.style.color = darkMode ? "#fff" : "#000";
}

// Animate progress bars
function animateProgressBars() {
    document.querySelectorAll(".progress-bar .progress").forEach((progressBar) => {
        const targetWidth = progressBar.getAttribute("data-progress");
        progressBar.style.width = targetWidth; // Set to target width
    });
}
