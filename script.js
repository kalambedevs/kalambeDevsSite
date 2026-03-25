// Initialize Lucide Icons
lucide.createIcons();

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

mobileMenuToggle.addEventListener('click', () => {
    const isOpen = !mobileNav.classList.contains('hidden');
    
    if (isOpen) {
        mobileNav.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    } else {
        mobileNav.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    }
});

// Close mobile menu when clicking a link
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    });
});

// Active Link Highlighting on Scroll
const sections = document.querySelectorAll('section, main');
const navLinks = document.querySelectorAll('.nav-link');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('nav-link-active');
        if (link.getAttribute('data-id') === current) {
            link.classList.add('nav-link-active');
        }
    });

    mobileLinks.forEach(link => {
        link.classList.remove('mobile-nav-active');
        if (link.getAttribute('data-id') === current) {
            link.classList.add('mobile-nav-active');
        }
    });
});

// Counter Animation
const counters = document.querySelectorAll('.counter-container');
const counterOptions = {
    threshold: 0.5
};

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const container = entry.target;
            const valueDisplay = container.querySelector('.counter-value');
            const endValue = parseInt(container.getAttribute('data-end'));
            const duration = 2000;
            let startTime = null;

            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = timestamp - startTime;
                const currentCount = Math.min(Math.floor((progress / duration) * endValue), endValue);
                
                valueDisplay.textContent = currentCount + (currentCount === endValue ? '+' : '');

                if (progress < duration) {
                    requestAnimationFrame(animate);
                }
            };
            requestAnimationFrame(animate);
            observer.unobserve(container);
        }
    });
}, counterOptions);

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// Timeline Scroll Animation
const timelineContainer = document.getElementById('timeline-container');
const timelineFill = document.getElementById('timeline-fill');
const timelineItems = document.querySelectorAll('.timeline-item');

if (timelineContainer && timelineFill) {
    window.addEventListener('scroll', () => {
        const containerRect = timelineContainer.getBoundingClientRect();
        const containerTop = containerRect.top;
        const containerHeight = containerRect.height;
        const windowHeight = window.innerHeight;

        // Start filling when the top of the container is at the middle of the screen
        let scrollPercentage = 0;
        const startPoint = windowHeight / 2;
        
        if (containerTop < startPoint) {
            const scrolledPastStart = startPoint - containerTop;
            scrollPercentage = (scrolledPastStart / containerHeight) * 100;
        }

        // Clamp between 0 and 100
        scrollPercentage = Math.max(0, Math.min(100, scrollPercentage));
        timelineFill.style.height = `${scrollPercentage}%`;
    });
}

// Intersection Observer for Timeline Items
const timelineObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});
