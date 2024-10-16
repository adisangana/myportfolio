let particles = [];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketch-holder');

    // Create a larger number of particles for a finer, dust-like effect
    for (let i = 0; i < 300; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(0, 0, 0, 10); // Very subtle dark background for more depth

    // Update and display all particles
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].show();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Particle class for fine dust-like effect
class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(random(-0.5, 0.5), random(-0.5, 0.5)); // Slower velocity for fine particles
        this.size = random(2, 5); // Smaller particle size for fine dust effect
    }

    update() {
        this.pos.add(this.vel);

        // Bounce particles at the edges
        if (this.pos.x > width || this.pos.x < 0) {
            this.vel.x *= -1;
        }
        if (this.pos.y > height || this.pos.y < 0) {
            this.vel.y *= -1;
        }
    }

    show() {
        noStroke();
        fill(255, 255, 255, 100); // White, semi-transparent for dust-like particles
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}
