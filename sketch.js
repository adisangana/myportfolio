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

// Particle class
class Particle {
    constructor() {
        // Initial position and velocity of particles
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(random(-2, 2), random(-2, 2));
        this.acc = createVector(0, 0);
        this.size = random(3, 10); // Reduced particle size for finer particles
        this.angle = random(TWO_PI); // Angle for circular movement
        this.distance = random(50, 150); // Distance from the mouse
    }

    update() {
        // Apply acceleration to velocity
        this.vel.add(this.acc);
        this.vel.limit(4); // Limit the speed
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

    circleAroundMouse() {
        // Create circular motion around the mouse
        let mouse = createVector(mouseX, mouseY);
        
        // Increment angle for circular motion
        this.angle += 0.05; // Adjust speed of circular motion
        let offsetX = cos(this.angle) * this.distance; // X offset for circular motion
        let offsetY = sin(this.angle) * this.distance; // Y offset for circular motion
        
        // Set particle position around the mouse
        this.pos.x = mouse.x + offsetX;
        this.pos.y = mouse.y + offsetY;
    }

    show() {
        noStroke();
        fill(255, 255, 255, 150); // White particles with some transparency
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}
