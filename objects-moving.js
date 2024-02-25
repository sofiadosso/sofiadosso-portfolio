// Function to generate a random number between min and max
function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

// Function to create a new particle
function createParticle() {
    const particle = document.createElement('img');
    particle.src = 'images/vector-6.png';
    particle.className = 'appearing-image';

    // Calculation of the maximum allowable width for the left position
    let maxLeft;
    if (window.innerWidth <= 1025) { // Considers devices with width less than or equal to 1025px as mobile
        maxLeft = window.innerWidth - 100; // Uses the width of the entire viewport
    } else {
        maxLeft = window.innerWidth - particle.width; // Limit width per desktop
    }

    const maxTop = document.body.clientHeight - particle.height;
    const initialX = randomBetween(0, maxLeft);
    const initialY = randomBetween(0, maxTop);
    particle.style.left = `${initialX}px`;
    particle.style.top = `${initialY}px`;

    document.getElementById('particles').appendChild(particle);

    const animationDuration = randomBetween(1, 3); // Duration of random appearance between 1 and 3 seconds

    // Animation of the appearance of the particle
    particle.animate([
        { opacity: 0 }, // Start with opacity 0
        { opacity: 1 } // Arrival with opacity 1
    ], {
        duration: animationDuration * 1000, // Converts duration to milliseconds
        easing: 'linear',
        iterations: 1,
        fill: 'forwards'
    });

    // Removes the particle once the animation is finished
    setTimeout(() => {
        particle.remove();
    }, animationDuration * 1000);
}

// Continuously generates new particles at random intervals
setInterval(() => {
    createParticle();
}, 100); // Constant interval for continuous particle generation