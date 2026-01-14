document.addEventListener('DOMContentLoaded', () => {


    // Smooth Scrolling for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Reveal on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });

    // Project Cards unique hover effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('open');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close menu when clicking a link
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('open');
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }
    // CV Modal Logic
    const cvModal = document.getElementById('cv-modal');
    const cvBtn = document.getElementById('cv-trigger');
    const closeBtn = document.querySelector('.close-modal');

    // Open Modal
    cvBtn.addEventListener('click', (e) => {
        e.preventDefault();
        cvModal.style.display = 'flex';
        // Force reflow for transition
        setTimeout(() => {
            cvModal.style.opacity = '1';
        }, 10);
    });

    // Close Modal Function
    function closeModal() {
        cvModal.style.opacity = '0';
        setTimeout(() => {
            cvModal.style.display = 'none';
        }, 300);
    }

    // Close on X click
    closeBtn.addEventListener('click', closeModal);

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target == cvModal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cvModal.style.display === 'flex') {
            closeModal();
        }
    });
    // Email Copy Functionality
    const emailBtn = document.getElementById('email-btn');
    if (emailBtn) {
        const emailSpan = emailBtn.querySelector('.text');
        const originalText = emailSpan.textContent;

        emailBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText('william.lotz64@gmail.com');

                // Success Animation
                emailSpan.textContent = 'Email Copié !';
                emailBtn.classList.add('success');

                // Revert after 2s
                setTimeout(() => {
                    emailBtn.classList.remove('success');
                    // Small delay to allow transition if needed, or immediate
                    emailSpan.textContent = originalText;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
                // Fallback (e.g. open mailto as last resort)
                window.location.href = 'mailto:william.lotz64@gmail.com';
            }
        });
    }

});
