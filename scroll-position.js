// Funzione per memorizzare la posizione di scrolling
function saveScrollPosition() {
    sessionStorage.setItem('scrollPosition', window.scrollY);
}

// Funzione per ripristinare la posizione di scrolling salvata
function restoreScrollPosition() {
    var scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, scrollPosition);
        sessionStorage.removeItem('scrollPosition');
    }
}

// Esegui la funzione per ripristinare la posizione di scrolling quando la pagina è completamente caricata
window.addEventListener('load', restoreScrollPosition);
// Esegui la funzione per salvare la posizione di scrolling quando la pagina sta per essere scaricata
window.addEventListener('beforeunload', saveScrollPosition);