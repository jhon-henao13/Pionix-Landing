// Variables globales para sliders

// Variables para el slider de Misión y Visión
let currentSlideMisionVision = 0;

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    
    initializeMisionVisionSlider();  // Inicializar el slider de Misión y Visión
    initializeScrollAnimations();
    initializeSmoothScrolling();
    initializeParallaxEffects();
    initializeAdvancedEffects();
    initializeParticleSystem();
    initializeLogoAnimations();
    initializeTextEffects();
});

// Función para inicializar la navegación móvil
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    const navOverlay = document.getElementById('nav-overlay');

    if (!navToggle || !navMenu) return; // defensa por si fallan los ids

    // toggle click
    navToggle.addEventListener('click', function() {
        const isActive = navToggle.classList.toggle('active');
        navMenu.classList.toggle('active', isActive);

        // bloquear scroll en body con clase (más robusto que manipular inline overflow)
        document.body.classList.toggle('menu-open', isActive);

        // accesibilidad
        navToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');

        if (navOverlay) navOverlay.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // cerrar al clicar link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // esconder el menu si el usuario redimensiona más allá del breakpoint
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // comportamiento del navbar al hacer scroll (mantener tu lógica pero con defensas)
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            navbar.style.background = 'linear-gradient(180deg, rgba(0, 0, 0, 0.98) 0%, rgba(0, 0, 0, 0.95) 100%)';
            navbar.style.boxShadow = '0 8px 30px rgba(0, 255, 255, 0.15)';
            navbar.style.backdropFilter = 'blur(25px)';
        } else {
            navbar.style.background = 'linear-gradient(180deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.8) 100%)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            navbar.style.backdropFilter = 'blur(20px)';
        }

        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    });
}


// Slider de Misión y Visión
function initializeMisionVisionSlider() {
    const slidesMisionVision = document.querySelectorAll('.mision-vision-card');
    const dotsMisionVision = document.querySelectorAll('.dot-mision-vision');

    if (slidesMisionVision.length === 0) return;


     // Mostrar el primer slide de Misión y Visión
    showSlideMisionVision(0, slidesMisionVision, dotsMisionVision);

    
    // Event listeners para los dots de Misión y Visión
    dotsMisionVision.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlideMisionVision(index, slidesMisionVision, dotsMisionVision);
        });
    });

    // Auto-play del slider de Misión y Visión con pausa en hover
    let autoPlayIntervalMisionVision = setInterval(function() {
        currentSlideMisionVision = (currentSlideMisionVision + 1) % slidesMisionVision.length;
        showSlideMisionVision(currentSlideMisionVision, slidesMisionVision, dotsMisionVision);
    }, 6000);

    const sliderContainerMisionVision = document.querySelector('.mision-vision-slider');
    if (sliderContainerMisionVision) {
        sliderContainerMisionVision.addEventListener('mouseenter', () => clearInterval(autoPlayIntervalMisionVision));
        sliderContainerMisionVision.addEventListener('mouseleave', () => {
            autoPlayIntervalMisionVision = setInterval(function() {
                currentSlideMisionVision = (currentSlideMisionVision + 1) % slidesMisionVision.length;
                showSlideMisionVision(currentSlideMisionVision, slidesMisionVision, dotsMisionVision);
            }, 6000);
        });
    }
}

// Función para mostrar el slide actual de Misión y Visión
function showSlideMisionVision(index, slidesMisionVision, dotsMisionVision) {
    slidesMisionVision.forEach(slide => {
        slide.style.opacity = '0';
        slide.classList.remove('active');
    });

    dotsMisionVision.forEach(dot => {
        dot.classList.remove('active');
    });

    setTimeout(() => {
        slidesMisionVision[index].classList.add('active');
        slidesMisionVision[index].style.opacity = '1';
        dotsMisionVision[index].classList.add('active');
    }, 300);
    currentSlideMisionVision = index;
}


// Animaciones de scroll mejoradas
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                // Efecto de contador para números
                if (entry.target.classList.contains('benefit-number')) {
                    const target = parseInt(entry.target.textContent);
                    animateCounter(entry.target, target, 2000);
                }
            }
        });
    }, observerOptions);

    // Observar elementos con data-aos
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Scroll suave mejorado
function initializeSmoothScrolling() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Efecto de highlight en el elemento objetivo
                targetElement.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.5)';
                setTimeout(() => {
                    targetElement.style.boxShadow = '';
                }, 2000);
            }
        });
    });
}

// Efectos parallax mejorados
function initializeParallaxEffects() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-glow-1, .hero-glow-2, .hero-glow-3');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrolled * speed);
            const xPos = (scrolled * 0.1) * (index % 2 === 0 ? 1 : -1);
            element.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Efectos avanzados
function initializeAdvancedEffects() {
    // Efectos de hover mejorados para botones CTA
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
            this.style.boxShadow = '0 20px 50px rgba(0, 255, 255, 0.8)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Efectos de hover para tarjetas de servicios
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
            this.style.boxShadow = '0 25px 50px rgba(0, 255, 255, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Efectos de hover para elementos de beneficios
    const benefitItems = document.querySelectorAll('.benefit-item');
    
    benefitItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(15px) scale(1.02)';
            this.style.boxShadow = '0 15px 30px rgba(0, 255, 255, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
}

// Sistema de partículas avanzado
function initializeParticleSystem() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Crear partículas dinámicas
    for (let i = 0; i < 30; i++) {
        createParticle(hero, i);
    }
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'dynamic-particle';
    
    const size = Math.random() * 4 + 2;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${index % 3 === 0 ? 'rgba(0, 255, 255, 0.8)' : 
                    index % 3 === 1 ? 'rgba(0, 0, 255, 0.6)' : 
                    'rgba(138, 43, 226, 0.7)'};
        border-radius: 50%;
        pointer-events: none;
        animation: particleFloat ${duration}s ease-in-out infinite;
        animation-delay: ${delay}s;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        z-index: 1;
    `;
    
    container.appendChild(particle);
}

// Animaciones del logo mejoradas
function initializeLogoAnimations() {
    const heroLogo = document.querySelector('.hero-logo');
    if (!heroLogo) return;
    
    // Efecto de rotación suave en hover
    heroLogo.addEventListener('mouseenter', function() {
        this.style.animation = 'logoGlow 2s ease-in-out infinite alternate, logoRotate 3s linear infinite';
    });
    
    heroLogo.addEventListener('mouseleave', function() {
        this.style.animation = 'logoGlow 4s ease-in-out infinite alternate';
    });
    
    // Efecto de click
    heroLogo.addEventListener('click', function() {
        this.style.transform = 'scale(1.2) rotate(360deg)';
        setTimeout(() => {
            this.style.transform = '';
        }, 600);
    });
}

// Efectos de texto avanzados
function initializeTextEffects() {
    const heroTitle = document.querySelector('.hero-title-main');
    if (heroTitle) {
        // Efecto de typing mejorado
        const originalText = heroTitle.textContent;
        typeWriterAdvanced(heroTitle, originalText, 100);
    }
    
    // Efecto de revelación de texto
    const descriptions = document.querySelectorAll('.hero-description, .section-subtitle');
    descriptions.forEach(desc => {
        desc.style.opacity = '0';
        desc.style.transform = 'translateY(30px)';
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transition = 'all 1s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });
        
        observer.observe(desc);
    });

    // Animación de estadísticas del hero
    initializeHeroStats();
}

// Animación de estadísticas del hero
function initializeHeroStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target.textContent;
                const isPercentage = target.includes('%');
                const isPlus = target.includes('+');
                
                let numericValue = parseInt(target.replace(/[^\d]/g, ''));
                
                animateStatCounter(entry.target, numericValue, isPercentage, isPlus);
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateStatCounter(element, target, isPercentage, isPlus) {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            let displayValue = Math.floor(start);
            if (isPercentage) {
                element.textContent = displayValue + '%';
            } else if (isPlus) {
                element.textContent = displayValue + '+';
            } else {
                element.textContent = displayValue + '+';
            }
            requestAnimationFrame(updateCounter);
        } else {
            if (isPercentage) {
                element.textContent = target + '%';
            } else if (isPlus) {
                element.textContent = target + '+';
            } else {
                element.textContent = target + '+';
            }
        }
    }
    
    updateCounter();
}

// Typing avanzado con efectos
function typeWriterAdvanced(element, text, speed) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            const char = text.charAt(i);
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = 'all 0.1s ease';
            
            element.appendChild(span);
            
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, 50);
            
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Animación de contador mejorada
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toString().padStart(2, '0');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toString().padStart(2, '0');
        }
    }
    
    updateCounter();
}

// Efectos de carga progresiva mejorados
function initializeProgressiveLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
            this.style.filter = 'brightness(1)';
        });
        
        img.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
        img.style.filter = 'brightness(0.8)';
        img.style.transition = 'all 0.8s ease';
    });
}

// Efectos de scroll para el indicador mejorado
function initializeScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        if (scrolled > windowHeight * 0.3) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(30px)';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
        }
    });
}

// Efectos de hover para enlaces sociales mejorados
function initializeSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotate(10deg) scale(1.1)';
            this.style.boxShadow = '0 10px 25px rgba(0, 255, 255, 0.5)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg) scale(1)';
            this.style.boxShadow = '';
        });
    });
}

// Función para mostrar mensaje de éxito al hacer clic en WhatsApp mejorada
function showWhatsAppMessage() {
    const buttons = document.querySelectorAll('a[href*="wa.me"]');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Crear notificación mejorada
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 30px;
                right: 30px;
                background: linear-gradient(135deg, #00FFFF, #8A2BE2);
                color: #000;
                padding: 20px 30px;
                border-radius: 15px;
                font-weight: 600;
                z-index: 10000;
                transform: translateX(100%) scale(0.8);
                transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                box-shadow: 0 10px 30px rgba(0, 255, 255, 0.4);
                border: 2px solid rgba(255, 255, 255, 0.2);
                backdrop-filter: blur(10px);
            `;
            notification.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <i class="fab fa-whatsapp" style="font-size: 1.2rem;"></i>
                    <span>¡Abriendo WhatsApp...</span>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            // Animar entrada
            setTimeout(() => {
                notification.style.transform = 'translateX(0) scale(1)';
            }, 100);
            
            // Remover después de 4 segundos
            setTimeout(() => {
                notification.style.transform = 'translateX(100%) scale(0.8)';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 400);
            }, 4000);
        });
    });
}

// Función para detectar si el dispositivo es móvil
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustar animaciones para móviles mejorado
function adjustAnimationsForMobile() {
    if (isMobile()) {
        // Reducir la intensidad de algunas animaciones en móviles
        const animatedElements = document.querySelectorAll('[data-aos]');
        animatedElements.forEach(el => {
            el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        });
        
        // Reducir el número de partículas en móviles
        const particles = document.querySelectorAll('.dynamic-particle');
        particles.forEach((particle, index) => {
            if (index > 15) {
                particle.style.display = 'none';
            }
        });
    }
}

// Función para preload de imágenes críticas
function preloadCriticalImages() {
    const criticalImages = [
        './img/logo.jpeg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Función para optimizar performance en scroll
function optimizeScrollPerformance() {
    let ticking = false;
    
    function updateOnScroll() {
        // Aquí irían las actualizaciones que necesitan scroll
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}








// Inicializar todas las funciones
document.addEventListener('DOMContentLoaded', function() {
    initializeProgressiveLoading();
    initializeScrollIndicator();
    initializeSocialLinks();
    showWhatsAppMessage();
    adjustAnimationsForMobile();
    preloadCriticalImages();
    optimizeScrollPerformance();
});

// Agregar estilos CSS dinámicos para partículas
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes particleFloat {
        0% { 
            transform: translateY(0px) translateX(0px);
            opacity: 0.8;
        }
        50% { 
            transform: translateY(-30px) translateX(15px);
            opacity: 1;
        }
        100% { 
            transform: translateY(-60px) translateX(0px);
            opacity: 0.3;
        }
    }
    
    @keyframes logoRotate {
        0% { transform: scale(1.05) rotate(0deg); }
        100% { transform: scale(1.05) rotate(360deg); }
    }
`;
document.head.appendChild(dynamicStyles);


// Función para ocultar el splash loader una vez cargada la página
// === LOADER FUTURISTA ===
window.addEventListener("load", () => {
    const splash = document.getElementById("splash-loader");
    if (!splash) return;
    
    setTimeout(() => {
        splash.classList.add("hidden"); // se desvanece con transición CSS
    }, 1300); // un poco más de tiempo para que se vea la animación
});

// Hacer que el logo sea interactivo al hacer clic
document.querySelector('.splash-logo').addEventListener('click', function() {
    const logo = this;
    logo.style.transition = "transform 0.5s ease, filter 0.5s ease"; // Añadimos transición para hacer el efecto más suave
    logo.style.transform = 'scale(1.2)';
    logo.style.filter = 'drop-shadow(0 0 25px #8A2BE2)';  // Resplandor más fuerte al hacer clic
    
    setTimeout(function() {
        logo.style.transform = '';  // Regresar al tamaño original
        logo.style.filter = '';  // Restablecer el resplandor
    }, 500);
});





// ...al final del archivo...

// --- Agenda Interactiva Pionix ---

document.addEventListener('DOMContentLoaded', function() {
    const horarios = [
        "8:00am", "09:00am", "10:00am", "11:00am", "12:00pm",
        "2:00pm", "3:00pm", "4:00pm", "5:00pm", "6:00pm"
    ];

    const fechaInput = document.getElementById('agenda-fecha');
    const horaSelect = document.getElementById('agenda-hora');
    const servicioSelect = document.getElementById('agenda-servicio');
    const metodoSelect = document.getElementById('agenda-metodo');
    const form = document.getElementById('agenda-form');
    const msg = document.getElementById('agenda-msg');

    const calendarLinkDiv = document.getElementById('agenda-calendar-link');


    // Set min date to today y valor inicial
    if (fechaInput) {
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        fechaInput.min = todayStr;
        if (!fechaInput.value) fechaInput.value = todayStr;
    }

    // Función para actualizar las horas disponibles
    function actualizarHoras() {
    if (!horaSelect || !fechaInput.value) return;
    let reservas = JSON.parse(localStorage.getItem('pionix_reservas') || '[]');
    const ocupados = reservas.filter(r => r.fecha === fechaInput.value).map(r => r.hora);
    
    horaSelect.innerHTML = '<option value="">Selecciona una hora</option>';
    
    horarios.forEach(hora => {
        const opt = document.createElement('option');
        opt.value = hora;
        opt.textContent = ocupados.includes(hora) ? `${hora} (Ocupado)` : hora;
        opt.disabled = ocupados.includes(hora);
        horaSelect.appendChild(opt);
    });

    // Agregar opción "Otro..." manualmente
    const otroOpt = document.createElement('option');
    otroOpt.value = "otro";
    otroOpt.textContent = "Otro...";
    horaSelect.appendChild(otroOpt);
}






    // Mostrar/ocultar campo de hora personalizada
    horaSelect.addEventListener('change', function() {
        const customHoraInput = document.getElementById('agenda-hora-custom');
        if (horaSelect.value === 'otro') {
            customHoraInput.style.display = 'block';
            customHoraInput.required = true;
        } else {
            customHoraInput.style.display = 'none';
            customHoraInput.required = false;
        }
    });



    // Actualizar horas al cargar, al cambiar fecha o servicio
    if (fechaInput && horaSelect && servicioSelect) {
        fechaInput.addEventListener('change', actualizarHoras);
        servicioSelect.addEventListener('change', actualizarHoras);
        actualizarHoras(); // Llenar al cargar
    }


    // Función para crear el link de Google Calendar
    function crearEnlaceGoogleCalendar({nombre, servicio, fecha, hora, contacto}) {
        let [h, min, ampm] = hora.match(/(\d{1,2}):(\d{2})(am|pm)/i) || [];
        if (!h) {
            h = "08"; min = "00"; ampm = "am";
        }
        h = parseInt(h, 10);
        if (ampm && ampm.toLowerCase() === 'pm' && h < 12) h += 12;
        if (ampm && ampm.toLowerCase() === 'am' && h === 12) h = 0;
        const [year, month, day] = fecha.split('-');
        const start = `${year}${month}${day}T${String(h).padStart(2,'0')}${min}00`;
        let hFin = h + 1;
        if (hFin > 23) hFin = 23;
        const end = `${year}${month}${day}T${String(hFin).padStart(2,'0')}${min}00`;

        const text = encodeURIComponent(`Reserva Pionix - ${nombre}`);
        const details = encodeURIComponent(`Servicio: ${servicio}\nContacto: ${contacto}`);
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}`;
    }



    // Enviar reserva
    if (form) {
        form.addEventListener('submit', function(e) {

            if (calendarLinkDiv) calendarLinkDiv.innerHTML = "";


            e.preventDefault();
            const servicio = servicioSelect.value;
            const fecha = fechaInput.value;
            
            const horaSeleccionada = horaSelect.value;
            const horaPersonalizada = document.getElementById('agenda-hora-custom').value.trim();
            const hora = (horaSeleccionada === 'otro') ? horaPersonalizada : horaSeleccionada;

            const nombre = document.getElementById('agenda-nombre').value.trim();
            const contacto = document.getElementById('agenda-contacto').value.trim();
            const metodo = metodoSelect ? metodoSelect.value : 'whatsapp';

            if (!servicio || !fecha || !hora || !nombre || !contacto || !metodo) {
                msg.textContent = "Por favor completa todos los campos.";
                msg.style.color = "#ff4b7d";
                return;
            }

            if (horaSeleccionada === 'otro' && !/^(1[0-2]|0?[1-9]):[0-5][0-9](am|pm)$/i.test(horaPersonalizada)) {
                msg.textContent = "Por favor ingresa una hora válida (ej. 7:30pm)";
                msg.style.color = "#ff4b7d";
                return;
            }


            let reservas = JSON.parse(localStorage.getItem('pionix_reservas') || '[]');
            if (reservas.some(r => r.fecha === fecha && r.hora === hora)) {
                msg.textContent = "¡Ese horario ya está reservado! Elige otro.";
                msg.style.color = "#ff4b7d";
                return;
            }

            reservas.push({servicio, fecha, hora, nombre, contacto});
            localStorage.setItem('pionix_reservas', JSON.stringify(reservas));

            msg.textContent = "¡Reserva realizada con éxito! Te contactaremos pronto.";
            msg.style.color = "var(--primary-cyan)";
            

            // Generar y mostrar el link de Google Calendar
            const calendarUrl = crearEnlaceGoogleCalendar({nombre, servicio, fecha, hora, contacto});
            if (calendarLinkDiv) {
                calendarLinkDiv.innerHTML = `<a href="${calendarUrl}" target="_blank" class="cta-button secondary" style="margin-top:1rem;display:inline-block;">&#128197; Agregar a Google Calendar</a>`;
            }

            form.reset();


            // Volver a poner la fecha en hoy y actualizar horas
            if (fechaInput) {
                const today = new Date();
                const todayStr = today.toISOString().split('T')[0];
                fechaInput.value = todayStr;
            }
            actualizarHoras();

            setTimeout(() => {
                if (metodo === 'whatsapp') {
                    const url = `https://wa.me/573023426062?text=Hola Pionix!, soy ${encodeURIComponent(nombre)} y quiero reservar un ${encodeURIComponent(servicio)} para el ${fecha} a las ${hora}. Mi contacto: ${encodeURIComponent(contacto)}. Puedes guardar esta cita en tu calendario aquí: ${encodeURIComponent(calendarUrl)}`;

                    window.open(url, '_blank');
                } else if (metodo === 'email') {
                    const subject = encodeURIComponent(`Reserva de ${servicio} para ${fecha} a las ${hora}`);
                    const body = encodeURIComponent(`Hola, soy ${nombre} y quiero reservar un ${servicio} para el ${fecha} a las ${hora}.\nMi contacto: ${contacto}`);
                    window.open(`mailto:pionixcorp10@gmail.com?subject=${subject}&body=${body}`, '_blank');
                }
            }, 1200);
        });
    }
});