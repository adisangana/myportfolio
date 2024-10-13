let particles = [];

function setup() {
    // Create canvas and attach it to the div with id 'sketch-holder'
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketch-holder');

    // Create an initial set of particles
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(240); // Light gray background

    // Update and display all particles
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].show();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function mouseMoved() {
    particles.push(new Particle());
}


class Particle {
    constructor() {
        // Initial position and speed of particles
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(random(-2, 2), random(-2, 2));
        this.size = random(10, 20);
    }

    update() {
        // Move the particle
        this.pos.add(this.vel);

        // Reverse direction if it hits the edge
        if (this.pos.x > width || this.pos.x < 0) {
            this.vel.x *= -1;
        }

        if (this.pos.y > height || this.pos.y < 0) {
            this.vel.y *= -1;
        }
    }

    show() {
        // Draw the particle as a circle
        noStroke();
        fill(50, 100, 150, 200);
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}
