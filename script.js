const beerFill = document.getElementById('beerFill');
let bubbles = [];
let maxScrollPercent = 0; // track the highest scroll

// Page navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    const mainPages = ['home', 'features', 'about', 'contact', 'download'];
    if (mainPages.includes(pageId)) {
        document.getElementById('home').classList.add('active');

        const target = document.getElementById(pageId);
        if (target) {
            const headerHeight = document.querySelector('nav').offsetHeight || 0;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    } else {
        document.getElementById(pageId).classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}



// Beer fill on scroll
function updateBeerFill() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
	const scrollPercent = Math.min((scrollTop / docHeight) * 100 * 1.4, 100);
    
    // Update maxScrollPercent only if higher than before
    if (scrollPercent > maxScrollPercent) {
        maxScrollPercent = scrollPercent;
        beerFill.style.height = Math.min(maxScrollPercent, 100) + '%';

        // Add bubbles when beer is filling
        if (maxScrollPercent > 5 && Math.random() > 0.9) {
            createBubble();
        }
    }
}

function createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    const size = Math.random() * 15 + 8;
    const left = Math.random() * 100;
    const duration = Math.random() * 3 + 3;
    
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = left + '%';
    bubble.style.bottom = '0';
    bubble.style.animationDuration = duration + 's';
    
    beerFill.appendChild(bubble);
    
    setTimeout(() => {
        bubble.remove();
    }, duration * 1000);
}

// Update on scroll
window.addEventListener('scroll', updateBeerFill);
window.addEventListener('resize', updateBeerFill);

// Initial update
updateBeerFill();

// Continuous bubble generation when beer is visible
setInterval(() => {
    if (maxScrollPercent > 10 && Math.random() > 0.7) {
        createBubble();
    }
}, 500);

function showComingSoon(event) {
    event.preventDefault();
    alert("App coming soon! Check back here for download links.");
}