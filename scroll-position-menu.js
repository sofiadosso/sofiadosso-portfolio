// Function to store the status of the accordion
function saveAccordionState() {
    var accordionState = [];
    var contentBoxes = document.querySelectorAll('.contentbox');
    contentBoxes.forEach(function(box) {
        accordionState.push(box.classList.contains('active'));
    });
    sessionStorage.setItem('accordionState', JSON.stringify(accordionState));
}

// Function to reset the accordion state
function restoreAccordionState() {
    var accordionState = JSON.parse(sessionStorage.getItem('accordionState'));
    if (accordionState) {
        var contentBoxes = document.querySelectorAll('.contentbox');
        contentBoxes.forEach(function(box, index) {
            if (accordionState[index]) {
                box.classList.add('active');
            } else {
                box.classList.remove('active');
            }
        });
    }
}

// Run function to restore accordion state when page is fully loaded
window.addEventListener('load', restoreAccordionState);

// Run function to store accordion state when opening or closing a content-box
document.querySelectorAll('.menuitem').forEach(function(item) {
    item.addEventListener('click', saveAccordionState);
});
