// ===================================
// Hello Turf - Hero Animation with p5.js
// Static image background with particle overlay
// ===================================

let particles = [];
let backgroundImage;
const particleCount = 100;

function preload() {
    // Load single background image
    backgroundImage = loadImage('images/turf-1.jpg');
}

function setup() {
    // Create canvas to fit hero section
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('hero-canvas');
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    // Display static background image
    if (backgroundImage) {
        image(backgroundImage, 0, 0, width, height);
    }
    
    // Add subtle overlay gradient for better text readability
    drawGradientOverlay();
    
    // Animated grid pattern
    drawGridPattern();
    
    // Update and display particles
    for (let particle of particles) {
        particle.update();
        particle.display();
    }
    
    // Add floating grass elements
    drawFloatingElements();
}

function drawGradientOverlay() {
    // Dark overlay for text readability
    let gradient = drawingContext.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(0, 102, 204, 0.4)');
    gradient.addColorStop(0.5, 'rgba(26, 26, 46, 0.3)');
    gradient.addColorStop(1, 'rgba(46, 204, 113, 0.4)');
    
    drawingContext.fillStyle = gradient;
    drawingContext.fillRect(0, 0, width, height);
}

function drawGridPattern() {
    // Subtle animated grid
    stroke(255, 255, 255, 15);
    strokeWeight(1);
    noFill();
    
    let gridSize = 50;
    let offset = (frameCount * 0.5) % gridSize;
    
    for (let x = -offset; x < width + gridSize; x += gridSize) {
        line(x, 0, x, height);
    }
    for (let y = -offset; y < height + gridSize; y += gridSize) {
        line(0, y, width, y);
    }
}

function drawFloatingElements() {
    // Draw subtle floating dots
    for (let i = 0; i < 20; i++) {
        let x = (frameCount * 0.3 + i * 50) % width;
        let y = height / 2 + sin(frameCount * 0.01 + i) * 100;
        let size = sin(frameCount * 0.02 + i) * 3 + 3;
        
        noStroke();
        fill(255, 255, 255, 30);
        circle(x, y, size);
    }
}

// Particle class - floating grass-inspired particles
class Particle {
    constructor() {
        this.reset();
        this.y = random(height);
        this.life = random(100);
    }
    
    reset() {
        this.x = random(width);
        this.y = -20;
        this.size = random(3, 8);
        this.speedY = random(0.5, 1.5);
        this.speedX = random(-0.5, 0.5);
        this.life = 100;
        this.alpha = random(100, 200);
        this.rotation = random(TWO_PI);
        this.rotationSpeed = random(-0.02, 0.02);
        this.colorType = random(['green', 'white', 'blue']);
    }
    
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        this.life -= 0.2;
        
        // Gentle floating motion
        this.x += sin(frameCount * 0.02 + this.y * 0.01) * 0.5;
        
        // Reset when particle goes off screen or dies
        if (this.y > height + 20 || this.life <= 0 || this.x < -20 || this.x > width + 20) {
            this.reset();
        }
    }
    
    display() {
        let particleColor;
        let lifeAlpha = this.alpha * (this.life / 100);
        
        if (this.colorType === 'green') {
            particleColor = color(46, 204, 113, lifeAlpha);
        } else if (this.colorType === 'blue') {
            particleColor = color(52, 152, 219, lifeAlpha);
        } else {
            particleColor = color(255, 255, 255, lifeAlpha);
        }
        
        push();
        translate(this.x, this.y);
        rotate(this.rotation);
        
        // Draw grass blade shape
        noStroke();
        fill(particleColor);
        
        if (this.size > 5) {
            // Larger particles as grass blades
            beginShape();
            vertex(0, -this.size);
            vertex(this.size * 0.3, 0);
            vertex(0, this.size);
            vertex(-this.size * 0.3, 0);
            endShape(CLOSE);
        } else {
            // Smaller particles as dots
            circle(0, 0, this.size);
        }
        
        pop();
    }
}

// Resize canvas when window resizes
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Interactive mouse effect
function mouseMoved() {
    // Create particles near mouse
    if (random(1) > 0.85) {
        let p = particles[floor(random(particles.length))];
        p.x = mouseX + random(-50, 50);
        p.y = mouseY + random(-50, 50);
        p.life = 100;
        p.speedY = random(-2, 2);
        p.speedX = random(-2, 2);
    }
}
