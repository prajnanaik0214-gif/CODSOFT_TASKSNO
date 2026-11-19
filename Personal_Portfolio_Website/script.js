
/* =========================================
   1. SELECT HTML ELEMENTS
========================================= */

// Select the mobile menu button
const menuToggle = document.querySelector(".menu-toggle");

// Select the navigation links
const navLinks = document.querySelector(".nav-links");

// Select all navigation link elements
const navItems = document.querySelectorAll(".nav-links a");

// Select the home section heading
const homeHeading = document.querySelector(".home-content h2");

// Select contact form
const contactForm = document.getElementById("contact-form");

// Select form status message
const formStatus = document.getElementById("form-status");


// =========================================
// 2. MOBILE NAVIGATION MENU
// =========================================

// Check whether the menu elements exist
if (menuToggle && navLinks) {

    // Open and close menu when button is clicked
    menuToggle.addEventListener("click", function () {

        // Add or remove active class
        navLinks.classList.toggle("active");

        // Check whether menu is open
        const isOpen = navLinks.classList.contains("active");

        // Update accessibility attribute
        menuToggle.setAttribute("aria-expanded", isOpen);

        // Change menu icon
        menuToggle.textContent = isOpen ? "✕" : "☰";

    });


    // Close menu after clicking a navigation link
    navItems.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.textContent = "☰";

        });

    });


    // Close menu when Escape key is pressed
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.textContent = "☰";

        }

    });

}


// =========================================
// 3. TYPING ANIMATION
// =========================================

if (homeHeading) {

    // Different professional titles
    const roles = [
        "Computer Science Engineering Student",
        "Aspiring Software Developer",
        "Frontend Developer",
        "Technology Enthusiast"
    ];

    let roleIndex = 0;
    let characterIndex = 0;

    let deleting = false;

    // Check reduced motion preference
    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    // Function to create typing animation
    function typeAnimation() {

        const currentRole = roles[roleIndex];

        if (!deleting) {

            // Add one character
            homeHeading.textContent =
                currentRole.substring(0, characterIndex + 1);

            characterIndex++;

            // Start deleting when word is complete
            if (characterIndex === currentRole.length) {

                deleting = true;

                setTimeout(typeAnimation, 1500);

                return;

            }

        } else {

            // Remove one character
            homeHeading.textContent =
                currentRole.substring(0, characterIndex - 1);

            characterIndex--;

            // Move to next title
            if (characterIndex === 0) {

                deleting = false;

                roleIndex = (roleIndex + 1) % roles.length;

            }

        }

        // Typing and deleting speed
        const speed = deleting ? 45 : 85;

        setTimeout(typeAnimation, speed);

    }


    // Start animation
    if (reducedMotion) {

        homeHeading.textContent = roles[0];

    } else {

        homeHeading.textContent = "";

        typeAnimation();

    }

}


// =========================================
// 4. SCROLL REVEAL ANIMATION
// =========================================

// Select elements to animate
const revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".home-content, " +
    ".home-image, " +
    ".about-text, " +
    ".detail-card, " +
    ".skill-card, " +
    ".project-card, " +
    ".resume-content, " +
    ".contact-info, " +
    ".contact-form"
);


// Check reduced motion preference
const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


// Apply reveal animation
if (prefersReducedMotion) {

    revealElements.forEach(function (element) {

        element.classList.add("is-visible");

    });

} else if ("IntersectionObserver" in window) {

    revealElements.forEach(function (element) {

        element.classList.add("scroll-reveal");

    });


    // Create observer
    const observer = new IntersectionObserver(

        function (entries, observer) {

            entries.forEach(function (entry) {

                // Check if element is visible
                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    // Stop observing after animation
                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.15
        }

    );


    // Observe all selected elements
    revealElements.forEach(function (element) {

        observer.observe(element);

    });

} else {

    // Fallback for older browsers
    revealElements.forEach(function (element) {

        element.classList.add("is-visible");

    });

}


// =========================================
// 5. CONTACT FORM VALIDATION
// =========================================

if (contactForm && formStatus) {

    let statusTimeout;

    contactForm.addEventListener("submit", function (event) {

        // Prevent page from refreshing
        event.preventDefault();

        clearTimeout(statusTimeout);

        // Get input values
        const name = document.getElementById("name").value.trim();

        const email = document.getElementById("email").value.trim();

        const subject = document.getElementById("subject").value.trim();

        const message = document.getElementById("message").value.trim();


        // Clear previous message
        formStatus.textContent = "";


        // Check empty fields and HTML validation rules
        if (!contactForm.checkValidity()) {

            contactForm.reportValidity();

            formStatus.textContent =
                "Please enter valid information in all fields.";

            return;

        }


        // Additional name validation
        if (name.length < 2) {

            formStatus.textContent =
                "Name must contain at least 2 characters.";

            return;

        }


        // Additional email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            formStatus.textContent =
                "Please enter a valid email address.";

            return;

        }


        // Check subject
        if (subject.length === 0) {

            formStatus.textContent =
                "Please enter a subject.";

            return;

        }


        // Check message
        if (message.length < 10) {

            formStatus.textContent =
                "Message must contain at least 10 characters.";

            return;

        }


        // Display successful validation
        formStatus.textContent =
            "Thank you! Your message has been submitted.";

        // Reset form fields
        contactForm.reset();

        statusTimeout = setTimeout(function () {

            formStatus.textContent = "";

        }, 4000);

    });

}


// =========================================
// 6. BACK TO TOP BUTTON
// =========================================

// Create button dynamically
const backToTop = document.createElement("button");

// Button text
backToTop.textContent = "↑";

// Accessibility label
backToTop.setAttribute("aria-label", "Back to top");

// Button styling
backToTop.style.position = "fixed";

backToTop.style.bottom = "25px";

backToTop.style.right = "25px";

backToTop.style.width = "48px";

backToTop.style.height = "48px";

backToTop.style.borderRadius = "50%";

backToTop.style.border = "none";

backToTop.style.background = "#3B82F6";

backToTop.style.color = "#FFFFFF";

backToTop.style.fontSize = "25px";

backToTop.style.fontWeight = "bold";

backToTop.style.cursor = "pointer";

backToTop.style.zIndex = "999";

backToTop.style.opacity = "0";

backToTop.style.visibility = "hidden";

backToTop.style.transition = "all 0.3s ease";

backToTop.style.boxShadow =
    "0 5px 20px rgba(59, 130, 246, 0.3)";


// Add button to webpage
document.body.appendChild(backToTop);


// Show button after scrolling
window.addEventListener("scroll", function () {

    if (window.scrollY > 400) {

        backToTop.style.opacity = "1";

        backToTop.style.visibility = "visible";

    } else {

        backToTop.style.opacity = "0";

        backToTop.style.visibility = "hidden";

    }

});


// Scroll to top when button is clicked
backToTop.addEventListener("click", function () {

    window.scrollTo({

        top: 0,

        behavior: prefersReducedMotion ? "instant" : "smooth"

    });

});


// =========================================
// 7. WEBSITE LOADED MESSAGE
// =========================================

console.log("Personal Portfolio Website Loaded Successfully!");

console.log("JavaScript functionality is ready!");
