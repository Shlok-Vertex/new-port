// Enhanced JavaScript for Futuristic Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initThemeToggle();
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initSkillProgress();
    initProjects();
    initTimeline();
    initContactForm();
    initBackToTop();
    initParticles();
    initTypingEffect();
    initStatsCounter();
    initMagneticButtons();
    init3DEffects();
});

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add transition effect
        document.body.style.transition = 'background-color 0.5s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 500);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Navbar Scroll Effects
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Hide/show navbar based on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        
        // Add glow effect when at top
        if (scrollTop === 0) {
            navbar.style.boxShadow = '0 10px 50px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 247, 255, 0.1)';
        } else {
            navbar.style.boxShadow = '0 10px 50px rgba(0, 0, 0, 0.3)';
        }
        
        lastScrollTop = scrollTop;
        
        // Update active nav link
        updateActiveNavLink();
    });
}

// Mobile Menu
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.getElementById('closeMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    closeMenu.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Update Active Nav Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    let currentSection = '';
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update desktop nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
    
    // Update mobile nav links
    mobileLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add specific animations based on element type
                if (entry.target.classList.contains('skill-card')) {
                    const skillLevel = entry.target.getAttribute('data-skill');
                    const progressBar = entry.target.querySelector('.level-progress');
                    if (progressBar) {
                        setTimeout(() => {
                            progressBar.style.width = `${skillLevel}%`;
                        }, 300);
                    }
                }
                
                if (entry.target.classList.contains('story-text')) {
                    entry.target.classList.add('reveal-text');
                }
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    document.querySelectorAll('.reveal-text, .skill-card, .timeline-item, .project-card').forEach(el => {
        observer.observe(el);
    });
}

// Skill Progress Animation
function initSkillProgress() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const skillLevel = this.getAttribute('data-skill');
            const progressBar = this.querySelector('.level-progress');
            if (progressBar) {
                progressBar.style.width = `${skillLevel}%`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('visible')) {
                const progressBar = this.querySelector('.level-progress');
                if (progressBar) {
                    progressBar.style.width = '0';
                }
            }
        });
    });
}

// Projects Filter and Initialization
function initProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Sample projects data
    const projects = [
        {
            id: 1,
            title: "Quantum Dashboard",
            description: "A futuristic admin dashboard with real-time analytics and AI insights.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            tags: ["React", "D3.js", "Node.js", "AI"],
            category: "web",
            liveUrl: "#",
            codeUrl: "#",
            delay: 0
        },
        {
            id: 2,
            title: "NeuroFit App",
            description: "AI-powered fitness application with personalized workout plans.",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            tags: ["React Native", "TensorFlow", "GraphQL"],
            category: "mobile",
            liveUrl: "#",
            codeUrl: "#",
            delay: 1
        },
        {
            id: 3,
            title: "Galaxy UI Kit",
            description: "Futuristic design system with 100+ components and animations.",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            tags: ["Figma", "CSS", "JavaScript"],
            category: "ui",
            liveUrl: "#",
            codeUrl: "#",
            delay: 2
        },
        {
            id: 4,
            title: "AI Code Assistant",
            description: "Machine learning tool that suggests code improvements in real-time.",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            tags: ["Python", "TensorFlow", "FastAPI"],
            category: "ai",
            liveUrl: "#",
            codeUrl: "#",
            delay: 3
        }
    ];
    
    // Render projects
    function renderProjects(filter = 'all') {
        projectsGrid.innerHTML = '';
        
        const filteredProjects = filter === 'all' 
            ? projects 
            : projects.filter(project => project.category === filter);
        
        filteredProjects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card enhanced-glass';
            projectCard.style.setProperty('--delay', project.delay);
            
            projectCard.innerHTML = `
                <img src="${project.image}" alt="${project.title}" class="project-image">
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="project-buttons">
                        <a href="${project.liveUrl}" class="project-btn btn-live">Live Demo</a>
                        <a href="${project.codeUrl}" class="project-btn btn-code">View Code</a>
                    </div>
                </div>
            `;
            
            projectsGrid.appendChild(projectCard);
        });
        
        // Re-initialize scroll animations for new cards
        setTimeout(() => {
            const projectCards = document.querySelectorAll('.project-card');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });
            
            projectCards.forEach(card => observer.observe(card));
        }, 100);
    }
    
    // Initialize with all projects
    renderProjects();
    
    // Filter buttons event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            const filter = this.getAttribute('data-filter');
            renderProjects(filter);
        });
    });
}

// Timeline Initialization
function initTimeline() {
    const timeline = document.querySelector('.timeline');
    
    // Sample timeline data
    const timelineData = [
        {
            date: "2022 - Present",
            title: "Senior Full-Stack Developer",
            company: "NovaTech Solutions",
            description: "Leading development of enterprise-level applications using React, Node.js, and microservices architecture."
        },
        {
            date: "2020 - 2022",
            title: "Frontend Developer",
            company: "Digital Dynamics",
            description: "Developed responsive web applications with React and Vue.js. Created user-friendly interfaces."
        },
        {
            date: "2018 - 2020",
            title: "MSc in Computer Science",
            company: "Stanford University",
            description: "Specialized in Human-Computer Interaction and Machine Learning. Published research on UI accessibility."
        },
        {
            date: "2014 - 2018",
            title: "BSc in Software Engineering",
            company: "MIT",
            description: "Graduated with honors. Focused on algorithms, data structures, and software architecture."
        }
    ];
    
    // Render timeline
    timelineData.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'}`;
        
        timelineItem.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content enhanced-glass">
                <div class="timeline-date">
                    <i class="far fa-calendar"></i>
                    ${item.date}
                </div>
                <h3>${item.title}</h3>
                <h4>${item.company}</h4>
                <p>${item.description}</p>
            </div>
        `;
        
        timeline.appendChild(timelineItem);
    });
    
    // Animate timeline on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.timeline-item').forEach(item => observer.observe(item));
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const originalText = btnText.textContent;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Disable form and show loading state
        const formData = new FormData(this);
        submitBtn.disabled = true;
        btnText.textContent = 'SENDING...';
        
        // Simulate API call with energy charging effect
        let progress = 0;
        const energyEffect = submitBtn.querySelector('.btn-energy');
        const chargeInterval = setInterval(() => {
            progress += 10;
            energyEffect.style.width = `${progress}px`;
            energyEffect.style.height = `${progress}px`;
            
            if (progress >= 300) {
                clearInterval(chargeInterval);
                
                // Show success state
                btnText.textContent = 'MESSAGE SENT!';
                submitBtn.style.background = 'linear-gradient(135deg, #00ff9d, #00b8c4)';
                
                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.disabled = false;
                    btnText.textContent = originalText;
                    submitBtn.style.background = '';
                    energyEffect.style.width = '0';
                    energyEffect.style.height = '0';
                    
                    // Success notification
                    showNotification('Message sent successfully!', 'success');
                }, 2000);
            }
        }, 50);
    });
    
    // Input focus effects
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Background Particles
function initParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 4 + 1;
        const posX = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = Math.random() * 10 + 20;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}vw`;
        particle.style.bottom = '-10px';
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        // Random color based on theme
        const colors = ['#00f7ff', '#9d4edd', '#ff00ff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        
        particlesContainer.appendChild(particle);
    }
}

// Typing Effect
function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    const texts = [
        "FULL-STACK DEVELOPER",
        "UI/UX DESIGNER",
        "TECH INNOVATOR",
        "PROBLEM SOLVER"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before typing next
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing effect after initial delay
    setTimeout(type, 1000);
}

// Stats Counter
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 16);
    });
}

// Magnetic Button Effect
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.magnetic');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) * 0.3;
            const deltaY = (y - centerY) * 0.3;
            
            this.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
}

// 3D Effects
function init3DEffects() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 20;
            const rotateX = (centerY - y) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Utility: Show Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles for notification
    if (!document.querySelector('.notification-style')) {
        const style = document.createElement('style');
        style.className = 'notification-style';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 30px;
                padding: 15px 25px;
                background: rgba(10, 10, 26, 0.95);
                border: 1px solid;
                border-radius: 10px;
                display: flex;
                align-items: center;
                gap: 15px;
                z-index: 9999;
                transform: translateX(400px);
                transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                backdrop-filter: blur(10px);
            }
            .notification.success {
                border-color: #00ff9d;
                color: #00ff9d;
            }
            .notification.error {
                border-color: #ff3d71;
                color: #ff3d71;
            }
            .notification i {
                font-size: 1.2rem;
            }
            .notification.show {
                transform: translateX(0);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 3000);
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});