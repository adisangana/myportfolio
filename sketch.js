let particles = [];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketch-holder');

    // Create an initial set of particles
    for (let i = 0; i < 150; i++) { // Increased particle count for a denser effect
        particles.push(new Particle());
    }
}

function draw() {
    background(240, 240, 240, 25); // Light gray background with slight transparency for a motion trail effect

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
        this.acc = createVector(0, 0); // Acceleration will change when interacting with the mouse
        this.size = random(10, 30); // Larger particles for more visual effect
        this.maxSpeed = 5; // Maximum speed the particle can reach
    }

    update() {
        // Apply acceleration to velocity
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed); // Limit the velocity to maxSpeed
        this.pos.add(this.vel);

        // Reset acceleration each frame
        this.acc.mult(0);

        // Reverse direction if the particle hits the edges of the canvas
        if (this.pos.x > width || this.pos.x < 0) {
            this.vel.x *= -1;
        }
        if (this.pos.y > height || this.pos.y < 0) {
            this.vel.y *= -1;
        }
    }

    attractToMouse() {
        // Create a vector pointing from the particle to the mouse
        let mouse = createVector(mouseX, mouseY);
        let force = p5.Vector.sub(this.pos, mouse); // Now it repels from the mouse

        // Calculate the distance between the particle and the mouse
        let distance = force.mag(); 
        distance = constrain(distance, 10, 200); // Constrain distance to prevent too fast speeds
        let strength = (1 / (distance * distance)) * 1000; // Adjust the strength of repulsion
        force.setMag(strength); // Set the magnitude of the force based on distance

        // Apply the force to the particle's acceleration
        this.acc.add(force);
    }

    show() {
        noStroke();
        fill(50, 150, 200, 200); // Adjusted color to a more vibrant blue
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}
