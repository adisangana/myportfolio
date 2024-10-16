let particles = [];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketch-holder');

    // Create a larger set of smaller particles
    for (let i = 0; i < 300; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(0, 0, 0, 25); // Slightly transparent black for smooth blending

    // Update and display all particles
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].circleAroundMouse();
        particles[i].show();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Particle class for particles that either circle around the mouse or move freely
class Particle {
    constructor() {
        // Initial position and velocity of particles
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(random(-1, 1), random(-1, 1)); // Slower velocity for subtle movement
        this.acc = createVector(0, 0);
        this.size = random(2, 7); // Small particle size for fine dust-like effect
        this.angle = random(TWO_PI); // Angle for circular movement
        this.distance = random(100, 300); // Distance from the mouse for the general movement
        this.isNearMouse = false; // To detect if the particle is near the mouse
    }

    update() {
        // Apply velocity to position
        this.pos.add(this.vel);
        
        // Reset acceleration each frame
        this.acc.mult(0);

        // Check if particle is near the mouse
        let d = dist(this.pos.x, this.pos.y, mouseX, mouseY);
        if (d < 150) { // Near the mouse
            this.isNearMouse = true;
        } else {
            this.isNearMouse = false;
        }

        // Bounce particles at the edges
        if (this.pos.x > width || this.pos.x < 0) {
            this.vel.x *= -1;
        }
        if (this.pos.y > height || this.pos.y < 0) {
            this.vel.y *= -1;
        }
    }

    // Circle around the mouse if close, otherwise move naturally
    circleAroundMouse() {
        if (this.isNearMouse) {
            // If the particle is near the mouse, orbit in a very tight radius
            this.angle += 0.1; // Adjust speed of circular motion
            let offsetX = cos(this.angle) * 20; // Very small radius around the mouse (20 pixels)
            let offsetY = sin(this.angle) * 20;

            this.pos.x = mouseX + offsetX;
            this.pos.y = mouseY + offsetY;
        } else {
            // Particles not near the mouse move naturally
            this.pos.add(this.vel);
        }
    }

    show() {
        noStroke();
        fill(255, 255, 255, 150); // White particles with some transparency
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}
