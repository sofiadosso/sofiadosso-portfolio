document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    let cursorX = 0;
    let cursorY = 0;
    let scrolling = false;
    let requestId = null;
    let videoHovered = false;


    function updateCursorPosition(e) {
        cursorX = e.clientX;
        cursorY = e.clientY;

        if (!scrolling && !videoHovered) {
            updateCursor();
        }
    }

    function updateCursor() {
        const scrollX = window.pageXOffset;
        const scrollY = window.pageYOffset;
        cursor.style.left = cursorX + scrollX + 'px';
        cursor.style.top = cursorY + scrollY + 'px';

        // Save cursor position in local storage
        localStorage.setItem('cursorX', cursorX);
        localStorage.setItem('cursorY', cursorY);
    }

    function handleScroll() {
        scrolling = true;
        cursor.style.opacity = '0'; // rendi il cursore trasparente durante lo scrolling
        if (!requestId) {
            requestId = requestAnimationFrame(() => {
                updateCursor();
                scrolling = false;
                requestId = null;
            });
        }
    }

    function handleMouseMove() {
        if (!videoHovered) {
            cursor.style.opacity = '1'; // rendi il cursore opaco quando il mouse si muove sulla pagina
            updateCursor();
        }
    }

    document.addEventListener('mousemove', (e) => {
        updateCursorPosition(e);
        updateCursor(); // Aggiorna il cursore anche durante il movimento del mouse
    });

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousemove', handleMouseMove);

    // Restore cursor position from local storage
    const storedCursorX = localStorage.getItem('cursorX');
    const storedCursorY = localStorage.getItem('cursorY');
    if (storedCursorX && storedCursorY) {
        cursorX = parseInt(storedCursorX);
        cursorY = parseInt(storedCursorY);
        updateCursor();
    }

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.5)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });

    const videoFrames = document.querySelectorAll('iframe[src*="player.vimeo.com"]');
    videoFrames.forEach(videoFrame => {
        videoFrame.addEventListener('mouseenter', () => {
            cursor.style.opacity = '0';
            videoHovered = true;
        });
        videoFrame.addEventListener('mouseleave', () => {
            if (!scrolling) {
                cursor.style.opacity = '1';
            }
            videoHovered = false;
        });
    });
});