let particles = [];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketch-holder');

    // Create an initial set of particles
    for (let i = 0; i < 150; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(0, 0, 0, 25); // Slightly transparent black for smooth blending

    // Update and display all particles
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].attractToMouse();
        particles[i].show();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Particle class
class Particle {
    constructor() {
        // Initial position and velocity of particles
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(random(-2, 2), random(-2, 2));
        this.acc = createVector(0, 0);
        this.size = random(5, 15);
        this.maxSpeed = 4;
    }

    update() {
        // Apply acceleration to velocity
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);

        // Reset acceleration each frame
        this.acc.mult(0);

        // Reverse direction if the particle hits the edges
        if (this.pos.x > width || this.pos.x < 0) {
            this.vel.x *= -1;
        }
        if (this.pos.y > height || this.pos.y < 0) {
            this.vel.y *= -1;
        }
    }

    attractToMouse() {
        let mouse = createVector(mouseX, mouseY);
        let force = p5.Vector.sub(this.pos, mouse); // Repel particles from mouse

        let distance = force.mag();
        distance = constrain(distance, 10, 200); 
        let strength = (1 / (distance * distance)) * 1000; 
        force.setMag(strength);

        this.acc.add(force);
    }

    show() {
        noStroke();
        fill(255, 255, 255, 150); // White particles with some transparency
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}
