document.addEventListener('DOMContentLoaded', () => {
    // Create particle animation
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 50;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
    
    // Add mouse trail effect
    document.addEventListener('mousemove', (e) => {
        createTrailParticle(e.clientX, e.clientY);
    });
    
    // Initialize typewriter effect
    const typedTextElement = document.querySelector('.typed-text');
    const phrases = [
        "Explore my work.",
        "Let's build something amazing.",
        "Creating digital experiences."
    ];
    
    if (typedTextElement) {
        typeWriterEffect(typedTextElement, phrases, 0, 0);
    }
});

// Create a single background particle
function createParticle(container) {
    const particle = document.createElement('div');
    
    // Set particle styles
    particle.style.position = 'absolute';
    particle.style.width = `${Math.random() * 3 + 1}px`;
    particle.style.height = particle.style.width;
    particle.style.backgroundColor = `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.random() * 0.5 + 0.1})`;
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    
    // Set random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    particle.style.left = `${posX}vw`;
    particle.style.top = `${posY}vh`;
    
    // Set animation
    const duration = Math.random() * 30 + 20;
    const delay = Math.random() * 5;
    particle.style.animation = `float ${duration}s linear ${delay}s infinite`;
    
    // Add keyframe for float animation if not already added
    if (!document.querySelector('#particle-animation')) {
        const style = document.createElement('style');
        style.id = 'particle-animation';
        style.textContent = `
            @keyframes float {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: ${Math.random() * 0.5 + 0.3};
                }
                33% {
                    transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) rotate(120deg);
                    opacity: ${Math.random() * 0.5 + 0.2};
                }
                66% {
                    transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) rotate(240deg);
                    opacity: ${Math.random() * 0.5 + 0.1};
                }
                100% {
                    transform: translate(0, 0) rotate(360deg);
                    opacity: ${Math.random() * 0.5 + 0.3};
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add particle to container
    container.appendChild(particle);
}

// Create particles for mouse trail effect
function createTrailParticle(x, y) {
    const trailParticle = document.createElement('div');
    
    // Set particle styles
    trailParticle.style.position = 'absolute';
    trailParticle.style.width = `${Math.random() * 5 + 3}px`;
    trailParticle.style.height = trailParticle.style.width;
    trailParticle.style.backgroundColor = `rgba(0, 255, 255, ${Math.random() * 0.5 + 0.3})`;
    trailParticle.style.borderRadius = '50%';
    trailParticle.style.pointerEvents = 'none';
    trailParticle.style.zIndex = '5';
    
    // Set position to mouse position
    trailParticle.style.left = `${x}px`;
    trailParticle.style.top = `${y}px`;
    
    // Add to document
    document.body.appendChild(trailParticle);
    
    // Animate and remove
    const duration = Math.random() * 2 + 1;
    trailParticle.animate([
        { 
            transform: 'scale(1)', 
            opacity: 1 
        },
        { 
            transform: `translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) scale(0)`, 
            opacity: 0 
        }
    ], {
        duration: duration * 1000,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    });
    
    // Remove after animation is complete
    setTimeout(() => {
        trailParticle.remove();
    }, duration * 1000);
}

// Typewriter effect function
function typeWriterEffect(element, phrases, phraseIndex, charIndex) {
    if (charIndex < phrases[phraseIndex].length) {
        // Typing the current phrase
        element.textContent += phrases[phraseIndex].charAt(charIndex);
        charIndex++;
        setTimeout(() => typeWriterEffect(element, phrases, phraseIndex, charIndex), 100);
    } else {
        // Finished typing current phrase, wait then erase
        setTimeout(() => eraseText(element, phrases, phraseIndex, charIndex), 2000);
    }
}

// Erase text function for typewriter effect
function eraseText(element, phrases, phraseIndex, charIndex) {
    if (charIndex > 0) {
        // Erasing the current phrase
        element.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(() => eraseText(element, phrases, phraseIndex, charIndex), 50);
    } else {
        // Move to next phrase
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(() => typeWriterEffect(element, phrases, phraseIndex, 0), 500);
    }
} 