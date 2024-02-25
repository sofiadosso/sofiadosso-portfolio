// Function to obtain a random number within a specified range
const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
};

// Function to animate the image to a new position in time
const animateImageToPosition = (image, newX, newY, duration) => {
    const startTime = performance.now();
    const startX = parseFloat(image.style.left) || 0;
    const startY = parseFloat(image.style.top) || 0;

    // Easing function to make animation more natural
    const easeOutQuad = (t) => t * (2 - t);

    const animateImage = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1); // Animation progress (0 to 1)
        const easedProgress = easeOutQuad(progress); // Applies easing to progression

        const interpolatedX = startX + (newX - startX) * easedProgress;
        const interpolatedY = startY + (newY - startY) * easedProgress;

        // Control to prevent the image from exiting the viewport to the right
        const windowWidth = window.innerWidth;
        const imageWidth = image.offsetWidth;
        const maxAllowedX = windowWidth - imageWidth;
        const clampedX = Math.max(0, Math.min(interpolatedX, maxAllowedX));

        // Control to prevent the image from exiting the vertical edges of the HTML
        const documentHeight = document.documentElement.scrollHeight;
        const imageHeight = image.offsetHeight;
        const maxAllowedY = documentHeight - imageHeight;
        const clampedY = Math.max(0, Math.min(interpolatedY, maxAllowedY));

        image.style.left = `${clampedX}px`;
        image.style.top = `${clampedY}px`;

        if (progress < 1) {
            requestAnimationFrame(animateImage);
        }
    };

    requestAnimationFrame(animateImage);
};

// Add an event handler for the mouseover event to interact with images
document.querySelectorAll('.floating-image').forEach(image => {
    const windowWidth = window.innerWidth;
    const documentHeight = document.documentElement.scrollHeight;

    const imageWidth = image.offsetWidth;
    const imageHeight = image.offsetHeight;

    const randomX = getRandomNumber(0, windowWidth - imageWidth);
    const randomY = getRandomNumber(0, documentHeight - 450);

    image.style.position = 'absolute'; // Set the initial position of the images
    image.style.left = `${randomX}px`; // Random X initial position
    image.style.top = `${randomY}px`; // Random Y initial position

    // Add touchstart event handler for both mobile devices and desktops
    image.addEventListener('touchstart', (event) => {
        const touch = event.touches[0];
        const offsetX = touch.clientX - parseFloat(image.style.left);
        const offsetY = touch.clientY - parseFloat(image.style.top);

        const touchMoveHandler = (event) => {
            event.preventDefault(); // Prevents page scrolling while dragging and dropping
            const touch = event.touches[0];
            const newX = touch.clientX - offsetX;
            const newY = touch.clientY - offsetY;
            animateImageToPosition(image, newX, newY, 0); // Durata dell'animazione: 0 (posizione immediata)
        };

        const touchEndHandler = () => {
            document.removeEventListener('touchmove', touchMoveHandler);
            document.removeEventListener('touchend', touchEndHandler);
        };

        document.addEventListener('touchmove', touchMoveHandler);
        document.addEventListener('touchend', touchEndHandler);
    });

    // Add mouseover event handler for desktops only
    image.addEventListener('mouseover', () => {
        const newX = getRandomNumber(0, windowWidth - imageWidth);
        const newY = getRandomNumber(0, documentHeight - imageHeight);
        animateImageToPosition(image, newX, newY, 1000); // Animation duration: 1000 ms
    });
});