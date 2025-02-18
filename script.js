document.addEventListener("DOMContentLoaded", function () {
    const poeticLines = document.querySelectorAll('.poem-line');
    const nameElements = document.querySelectorAll('.name');
    let particlesEnabled = true;

    // Enhanced Dust Particles System
    function createParticle(x, y) {
        const particle = document.createElement("div");
        particle.className = "dust-particle";
        
        // Add random rotation and scale
        particle.style.transform = `
            rotate(${Math.random() * 360}deg)
            scale(${0.2 + Math.random() * 0.8})
        `;
        
        // Random animation path using translate
        const animateX = (Math.random() - 0.5) * 100;
        const animateY = (Math.random() - 0.5) * 100;
        particle.style.setProperty('--move-x', `${animateX}vw`);
        particle.style.setProperty('--move-y', `${animateY}vh`);

        if(x && y) {
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
        } else {
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.top = `${Math.random() * 100}vh`;
        }

        document.body.appendChild(particle);

        particle.addEventListener('animationend', () => particle.remove());
    }

    // Initialize particles
    function createParticleStorm(count = 30) {
        if(!particlesEnabled) return;
        for(let i = 0; i < count; i++) {
            setTimeout(() => createParticle(), i * 50);
        }
    }

    // Text interaction effect
    function setupTextInteraction() {
        poeticLines.forEach(line => {
            line.addEventListener('mouseenter', () => {
                line.style.animation = 'textGlow 1.5s ease-out';
                createParticleStorm(10);
            });
        });
    }

    // Name hover effect
    function setupNameInteraction() {
        nameElements.forEach(name => {
            name.addEventListener('mouseover', (e) => {
                const rect = e.target.getBoundingClientRect();
                createParticle(rect.left + rect.width/2, rect.top + rect.height/2);
            });
        });
    }

    // Toggle control
    function createToggle() {
        const toggle = document.createElement('div');
        toggle.className = 'particle-toggle';
        toggle.textContent = '✨ Toggle Particles';
        toggle.addEventListener('click', () => {
            particlesEnabled = !particlesEnabled;
            toggle.style.opacity = particlesEnabled ? 1 : 0.3;
        });
        document.body.appendChild(toggle);
    }

    // Parallax effect
    function setupParallax() {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            document.body.style.transform = `
                translate(${x}px, ${y}px)
            `;
        });
    }

    // Initialization
    createParticleStorm();
    setupTextInteraction();
    setupNameInteraction();
    createToggle();
    setupParallax();

    // Click interaction
    document.addEventListener('click', (e) => createParticle(e.clientX, e.clientY));

    // Periodic memory pulse
    setInterval(() => {
        poeticLines.forEach(line => {
            line.style.textShadow = `0 0 ${Math.random() * 10}px rgba(255,255,255,0.5)`;
        });
        if(particlesEnabled) createParticleStorm(5);
    }, 3000);
});
