// Function to memorize the scrolling position
function saveScrollPosition() {
    sessionStorage.setItem('scrollPosition', window.scrollY);
}

// Function to restore the saved scrolling position
function restoreScrollPosition() {
    var scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, scrollPosition);
        sessionStorage.removeItem('scrollPosition');
    }
}

// Run the function to restore the scrolling position when the page is fully loaded
window.addEventListener('load', restoreScrollPosition);
// Run the function to save the scrolling position when the page is about to be downloaded
window.addEventListener('beforeunload', saveScrollPosition);
