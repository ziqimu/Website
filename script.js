// Dark mode toggle
const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;
const moonIcon = '<i class="fas fa-moon"></i>';
const sunIcon = '<i class="fas fa-sun"></i>';

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    enableDarkMode();
}

themeToggle.addEventListener('click', () => {
    if (root.style.getPropertyValue('--background-color') === '#f5f6fa') {
        enableDarkMode();
    } else {
        enableLightMode();
    }
});

function enableDarkMode() {
    root.style.setProperty('--background-color', '#1a1a1a');
    root.style.setProperty('--text-color', '#ffffff');
    root.style.setProperty('--card-background', '#2d2d2d');
    root.style.setProperty('--primary-color', '#ffffff');
    root.style.setProperty('--nav-background', '#2d2d2d');
    root.style.setProperty('--nav-text', '#ffffff');
    themeToggle.innerHTML = sunIcon;
    localStorage.setItem('theme', 'dark');
}

function enableLightMode() {
    root.style.setProperty('--background-color', '#f5f6fa');
    root.style.setProperty('--text-color', '#2c3e50');
    root.style.setProperty('--card-background', '#ffffff');
    root.style.setProperty('--primary-color', '#2c3e50');
    root.style.setProperty('--nav-background', '#ffffff');
    root.style.setProperty('--nav-text', '#2c3e50');
    themeToggle.innerHTML = moonIcon;
    localStorage.setItem('theme', 'light');
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation to cards when they come into view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.interest-card, .project-card, .publication-item').forEach(item => {
    observer.observe(item);
});

// Initialize tooltips for social icons
const tooltips = document.querySelectorAll('[data-tooltip]');
tooltips.forEach(tooltip => {
    tooltip.addEventListener('mouseenter', e => {
        const tooltipText = e.target.getAttribute('data-tooltip');
        const tooltipEl = document.createElement('div');
        tooltipEl.className = 'tooltip';
        tooltipEl.textContent = tooltipText;
        document.body.appendChild(tooltipEl);
        
        const rect = e.target.getBoundingClientRect();
        tooltipEl.style.top = rect.top - tooltipEl.offsetHeight - 10 + 'px';
        tooltipEl.style.left = rect.left + (rect.width - tooltipEl.offsetWidth) / 2 + 'px';
    });
    
    tooltip.addEventListener('mouseleave', () => {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) tooltip.remove();
    });
}); 

// Cursor star trail effect
(function initCursorStars() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    let lastSpawnTime = 0;
    const spawnIntervalMs = 40; // throttle

    function spawnStar(x, y) {
        const star = document.createElement('div');
        star.className = 'cursor-star';
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        const rotate = (Math.random() * 60 - 30).toFixed(1);
        const scale = (0.9 + Math.random() * 0.7).toFixed(2);
        const hue = Math.floor(Math.random() * 360);
        const saturation = 85;
        const lightness = 60;
        star.style.setProperty('--star-color', `hsl(${hue} ${saturation}% ${lightness}%)`);
        star.style.transform = `translate(-50%, -50%) rotate(${rotate}deg) scale(${scale})`;
        document.body.appendChild(star);
        const ttl = 1000 + Math.random() * 300;
        setTimeout(() => star.remove(), ttl);
    }

    window.addEventListener('mousemove', (e) => {
        const now = performance.now();
        if (now - lastSpawnTime < spawnIntervalMs) return;
        lastSpawnTime = now;
        spawnStar(e.clientX, e.clientY);
    }, { passive: true });
})();