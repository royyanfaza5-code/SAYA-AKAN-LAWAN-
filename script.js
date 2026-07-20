document.addEventListener('DOMContentLoaded', () => {
    // 1. MOBILE MENU TOGGLE
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            // Toggle hamburger icon between list and X
            const icon = navToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('open')) {
                    icon.className = 'ri-close-line';
                } else {
                    icon.className = 'ri-menu-3-line';
                }
            }
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('open');
            const icon = navToggle ? navToggle.querySelector('i') : null;
            if (icon) icon.className = 'ri-menu-3-line';
        });
    });

    // 2. SCROLL HEADER CLASS
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. TYPING EFFECT IN HERO
    const textElement = document.querySelector('.hero-subtitle');
    if (textElement) {
        const professions = [
            'Web Developer',
            'Frontend Engineer',
            'UI/UX Enthusiast',
            'Pemecah Masalah'
        ];
        let professionIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let delay = 150;

        function typeEffect() {
            const currentProfession = professions[professionIndex];
            
            if (isDeleting) {
                textElement.textContent = currentProfession.substring(0, charIndex - 1);
                charIndex--;
                delay = 80;
            } else {
                textElement.textContent = currentProfession.substring(0, charIndex + 1);
                charIndex++;
                delay = 150;
            }

            if (!isDeleting && charIndex === currentProfession.length) {
                isDeleting = true;
                delay = 1500; // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                professionIndex = (professionIndex + 1) % professions.length;
                delay = 500; // Pause before typing next word
            }

            setTimeout(typeEffect, delay);
        }

        // Start typing effect
        setTimeout(typeEffect, 1000);
    }

    // 4. INTERSECTION OBSERVER FOR REVEAL ANIMATIONS
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 5. ANIMATE SKILL BARS ON SCROLL
    const skillsSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    
    if (skillsSection && skillBars.length > 0) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillBars.forEach(bar => {
                        const pct = bar.getAttribute('data-percentage');
                        bar.style.width = pct + '%';
                    });
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        skillsObserver.observe(skillsSection);
    }

    // 6. SCROLL SPY FOR ACTIVE NAV LINKS
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    });

    // 7. CONTACT FORM SIMULATION
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Mengirim... <span class="ping" style="width:10px; height:10px; background:white; display:inline-block; border-radius:50%"></span>';
            
            formStatus.style.display = 'none';

            // Simulate form submission
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                // Mock Success
                formStatus.className = 'form-status success';
                formStatus.innerHTML = '<i class="ri-checkbox-circle-fill"></i> Terima kasih! Pesan Anda telah berhasil dikirim.';
                formStatus.style.display = 'block';
                
                // Clear input fields
                contactForm.reset();
                
                // Fade out status after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);

            }, 1800);
        });
    }
});
