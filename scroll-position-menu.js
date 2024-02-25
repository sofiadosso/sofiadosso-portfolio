// Funzione per memorizzare lo stato dell'accordion
function saveAccordionState() {
    var accordionState = [];
    var contentBoxes = document.querySelectorAll('.contentbox');
    contentBoxes.forEach(function(box) {
        accordionState.push(box.classList.contains('active'));
    });
    sessionStorage.setItem('accordionState', JSON.stringify(accordionState));
}

// Funzione per ripristinare lo stato dell'accordion
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

// Esegui la funzione per ripristinare lo stato dell'accordion quando la pagina è completamente caricata
window.addEventListener('load', restoreAccordionState);

// Esegui la funzione per memorizzare lo stato dell'accordion quando si apre o chiude un content-box
document.querySelectorAll('.menuitem').forEach(function(item) {
    item.addEventListener('click', saveAccordionState);
});