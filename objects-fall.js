// Function to generate a random number between min and max
function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

// Function to create a new particle
function createParticle() {
    const particle = document.createElement('img');
    particle.src = 'images/vector-9.png';
    particle.className = 'falling-image';

    // Sets the horizontal position of the particle, limiting it to the width of the viewport minus the width of the particle itself
    let maxLeft;
    if (window.innerWidth < 1025) {
        // If the window width is less than 1025px (typically mobile devices), center the particle with respect to the viewport
        maxLeft = (window.innerWidth - 80);
    } else {
        // Otherwise, place it randomly along the entire width of the viewport
        maxLeft = window.innerWidth - particle.width;
    }
    const leftPosition = randomBetween(0, maxLeft);
    particle.style.left = `${leftPosition}px`;

    particle.style.top = '-20px'; // Start the fall from above the window
    document.getElementById('particles').appendChild(particle);

    const animationDuration = randomBetween(10, 20); // Durata della caduta casuale tra 10 e 20 secondi

    // Maximum body height
    const bodyHeight = document.body.clientHeight;

    // Animation of particle fall
    particle.animate([
        { transform: 'translateY(-20px)' },
        { transform: `translateY(${bodyHeight}px)` }
    ], {
        duration: animationDuration * 1000, // Convert duration to milliseconds
        easing: 'linear',
        iterations: 1,
        fill: 'forwards'
    });

    // Removes the particle once it has fallen below the body
    setTimeout(() => {
        particle.remove();
    }, animationDuration * 1000);
}

// Continuously generates new particles at random intervals
setInterval(() => {
    // Generates a random number of particles at each interval
    const numberOfParticles = Math.floor(randomBetween(1, 5)); // Random number between 1 and 5
    for (let i = 0; i < numberOfParticles; i++) {
        createParticle();
    }
}, randomBetween(500, 2000)); // Random interval between 0.5 and 2 seconds