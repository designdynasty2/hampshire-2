/*===== HAMPSHIRE HOA WEBSITE SCRIPTS =====*/

// DOM Elements
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
const navLinks = document.querySelectorAll(".nav__link");
const navDropdowns = document.querySelectorAll(".nav__dropdown");
const header = document.getElementById("header");
const scrollTop = document.getElementById("scroll-top");
const faqItems = document.querySelectorAll(".faq__item");
const contactForm = document.getElementById("contact-form");

/*===== MOBILE NAVIGATION =====*/
// Show menu
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
    navToggle.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  });
}

// Hide menu
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
    navToggle.classList.remove("active");
    document.body.style.overflow = "auto"; // Restore scrolling
  });
}

// Close menu when clicking on nav links
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
    navToggle.classList.remove("active");
    document.body.style.overflow = "auto";
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.classList.remove("show-menu");
    navToggle.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

/*===== DROPDOWN NAVIGATION =====*/
navDropdowns.forEach((dropdown) => {
  const dropdownLink = dropdown.querySelector(".nav__link");

  dropdownLink.addEventListener("click", (e) => {
    e.preventDefault();

    // Close other dropdowns
    navDropdowns.forEach((otherDropdown) => {
      if (otherDropdown !== dropdown) {
        otherDropdown.classList.remove("show-dropdown");
      }
    });

    // Toggle current dropdown
    dropdown.classList.toggle("show-dropdown");
  });
});

// Close dropdowns when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav__dropdown")) {
    navDropdowns.forEach((dropdown) => {
      dropdown.classList.remove("show-dropdown");
    });
  }
});

/*===== HEADER SCROLL EFFECT =====*/
function scrollHeader() {
  if (this.scrollY >= 50) {
    header.classList.add("scroll-header");
  } else {
    header.classList.remove("scroll-header");
  }
}

window.addEventListener("scroll", scrollHeader);

/*===== ACTIVE LINK HIGHLIGHTING =====*/
function highlightActiveLink() {
  const sections = document.querySelectorAll("section[id]");
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute("id");
    const correspondingLink = document.querySelector(
      `.nav__link[href*="${sectionId}"]`
    );

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      // Remove active class from all links
      navLinks.forEach((link) => link.classList.remove("active-link"));
      // Add active class to current link
      if (correspondingLink) {
        correspondingLink.classList.add("active-link");
      }
    }
  });
}

window.addEventListener("scroll", highlightActiveLink);

/*===== SMOOTH SCROLLING =====*/
function smoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

smoothScroll();

/*===== SCROLL TO TOP BUTTON =====*/
function showScrollTop() {
  if (this.scrollY >= 400) {
    scrollTop.classList.add("show-scroll");
  } else {
    scrollTop.classList.remove("show-scroll");
  }
}

window.addEventListener("scroll", showScrollTop);

if (scrollTop) {
  scrollTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/*===== FAQ ACCORDION =====*/
faqItems.forEach((item) => {
  const question = item.querySelector(".faq__question");

  question.addEventListener("click", () => {
    // Close other FAQ items
    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
      }
    });

    // Toggle current FAQ item
    item.classList.toggle("active");
  });
});

/*===== CONTACT FORM HANDLING =====*/
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // Basic validation
    if (!name || !email || !subject || !message) {
      showNotification("Please fill in all required fields.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showNotification("Please enter a valid email address.", "error");
      return;
    }

    // Simulate form submission (replace with actual form handling)
    showNotification(
      "Thank you for your message! We will get back to you within 48 hours.",
      "success"
    );
    contactForm.reset();
  });
}

/*===== UTILITY FUNCTIONS =====*/
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification--${type}`;
  notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__message">${message}</span>
            <button class="notification__close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

  // Add notification styles if not already present
  if (!document.querySelector("#notification-styles")) {
    const styles = document.createElement("style");
    styles.id = "notification-styles";
    styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                max-width: 400px;
                padding: 1rem;
                border-radius: 0.5rem;
                box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
                z-index: 9999;
                animation: slideInRight 0.3s ease-out;
            }
            
            .notification--success {
                background-color: #10b981;
                color: white;
            }
            
            .notification--error {
                background-color: #ef4444;
                color: white;
            }
            
            .notification--info {
                background-color: #3b82f6;
                color: white;
            }
            
            .notification__content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
            }
            
            .notification__close {
                background: none;
                border: none;
                color: inherit;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                line-height: 1;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @media (max-width: 768px) {
                .notification {
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;
    document.head.appendChild(styles);
  }

  // Add to page
  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

/*===== LAZY LOADING IMAGES =====*/
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

/*===== PERFORMANCE OPTIMIZATIONS =====*/
// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll events
const debouncedScrollHeader = debounce(scrollHeader, 10);
const debouncedHighlightActiveLink = debounce(highlightActiveLink, 10);
const debouncedShowScrollTop = debounce(showScrollTop, 10);

// Replace original scroll listeners with debounced versions
window.removeEventListener("scroll", scrollHeader);
window.removeEventListener("scroll", highlightActiveLink);
window.removeEventListener("scroll", showScrollTop);

window.addEventListener("scroll", debouncedScrollHeader);
window.addEventListener("scroll", debouncedHighlightActiveLink);
window.addEventListener("scroll", debouncedShowScrollTop);

/*===== ACCESSIBILITY ENHANCEMENTS =====*/
// Keyboard navigation for dropdowns
navDropdowns.forEach((dropdown) => {
  const dropdownLink = dropdown.querySelector(".nav__link");
  const dropdownMenu = dropdown.querySelector(".nav__dropdown-menu");
  const dropdownLinks = dropdown.querySelectorAll(".nav__dropdown-link");

  dropdownLink.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      dropdown.classList.toggle("show-dropdown");
      if (dropdown.classList.contains("show-dropdown")) {
        dropdownLinks[0]?.focus();
      }
    }

    if (e.key === "Escape") {
      dropdown.classList.remove("show-dropdown");
      dropdownLink.focus();
    }
  });

  dropdownLinks.forEach((link, index) => {
    link.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextLink = dropdownLinks[index + 1] || dropdownLinks[0];
        nextLink.focus();
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevLink =
          dropdownLinks[index - 1] || dropdownLinks[dropdownLinks.length - 1];
        prevLink.focus();
      }

      if (e.key === "Escape") {
        dropdown.classList.remove("show-dropdown");
        dropdownLink.focus();
      }
    });
  });
});

// Keyboard navigation for FAQ
faqItems.forEach((item) => {
  const question = item.querySelector(".faq__question");

  question.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      item.classList.toggle("active");
    }
  });
});

// Focus management for mobile menu
if (navToggle && navClose) {
  navToggle.addEventListener("click", () => {
    setTimeout(() => {
      navClose.focus();
    }, 100);
  });

  navClose.addEventListener("click", () => {
    navToggle.focus();
  });
}

/*===== AOS ANIMATION INITIALIZATION =====*/
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
      delay: 0,
      disable: function () {
        // Disable animations on mobile devices for better performance
        return window.innerWidth < 768;
      },
    });
  }

  // Initialize lazy loading
  if ("IntersectionObserver" in window) {
    lazyLoadImages();
  }

  // Set initial active link
  highlightActiveLink();
});

/*===== RESIZE HANDLER =====*/
window.addEventListener(
  "resize",
  debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768) {
      navMenu.classList.remove("show-menu");
      navToggle.classList.remove("active");
      document.body.style.overflow = "auto";

      // Close all dropdowns
      navDropdowns.forEach((dropdown) => {
        dropdown.classList.remove("show-dropdown");
      });
    }

    // Refresh AOS on resize
    if (typeof AOS !== "undefined") {
      AOS.refresh();
    }
  }, 250)
);

/*===== ERROR HANDLING =====*/
window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error);
  // You could send error reports to a logging service here
});

/*===== PRELOADER (OPTIONAL) =====*/
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 300);
  }
});

/*===== EXTERNAL LINK HANDLING =====*/
document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href^="http"]');
  if (link && !link.href.includes(window.location.hostname)) {
    // Add visual indicator for external links
    if (!link.querySelector(".external-icon")) {
      const icon = document.createElement("span");
      icon.className = "external-icon";
      icon.innerHTML = " ↗";
      icon.style.fontSize = "0.8em";
      icon.style.opacity = "0.7";
      link.appendChild(icon);
    }
  }
});

/*===== PRINT OPTIMIZATION =====*/
window.addEventListener("beforeprint", () => {
  // Expand all FAQ items for printing
  faqItems.forEach((item) => {
    item.classList.add("active");
  });
});

window.addEventListener("afterprint", () => {
  // Collapse FAQ items after printing
  faqItems.forEach((item) => {
    item.classList.remove("active");
  });
});

/*===== DEVELOPMENT HELPERS =====*/
if (process?.env?.NODE_ENV === "development") {
  // Add development helpers
  console.log("Hampshire HOA Website - Development Mode");

  // Log performance metrics
  window.addEventListener("load", () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType("navigation")[0];
      console.log(
        "Page Load Time:",
        perfData.loadEventEnd - perfData.loadEventStart,
        "ms"
      );
    }, 0);
  });
}

/*===== HERO SLIDESHOW =====*/
class HeroSlideshow {
  constructor() {
    this.slides = document.querySelectorAll(".hero__slide");
    this.currentSlide = 0;
    this.slideInterval = null;
    this.autoplayDelay = 5000; // 5 seconds for smoother experience

    this.init();
  }

  init() {
    if (this.slides.length === 0) return;

    // Pause autoplay on hover for better user experience
    const heroElement = document.querySelector(".hero");
    if (heroElement) {
      heroElement.addEventListener("mouseenter", () => this.pauseAutoplay());
      heroElement.addEventListener("mouseleave", () => this.startAutoplay());
    }

    // Start autoplay
    this.startAutoplay();

    // Preload images for smooth transitions
    this.preloadImages();
  }

  goToSlide(index) {
    // Remove active class from current slide
    this.slides[this.currentSlide].classList.remove("active");

    // Update current slide
    this.currentSlide = index;

    // Add active class to new slide
    this.slides[this.currentSlide].classList.add("active");
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length;
    this.goToSlide(nextIndex);
  }

  startAutoplay() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoplayDelay);
  }

  pauseAutoplay() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = null;
    }
  }

  preloadImages() {
    this.slides.forEach((slide) => {
      const img = slide.querySelector("img");
      if (img && img.src) {
        const preloadImg = new Image();
        preloadImg.src = img.src;
      }
    });
  }
}

// Initialize hero slideshow when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new HeroSlideshow();

  // Initialize AOS animations
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      offset: 100,
      delay: 0,
    });
  }
});

/*===== SERVICE WORKER REGISTRATION (OPTIONAL) =====*/
if ("serviceWorker" in navigator && window.location.protocol === "https:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
