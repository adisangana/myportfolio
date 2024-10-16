let particles = [];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketch-holder');

    // Increase the number of smaller particles
    for (let i = 0; i < 1500; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(240, 240, 240, 25); // Light gray background with slight opacity

    // Update and display all particles
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].show();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Particle class for fine dust-like particles
class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(random(-0.5, 0.5), random(-0.5, 0.5)); // Slow velocity for subtle movement
        this.acc = createVector(0, 0);
        this.size = random(1, 4); // Very small particles for fine dust effect
    }

    update() {
        // Apply velocity to position
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
        fill(255, 255, 255, 150); // Light white particles with some transparency
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}
