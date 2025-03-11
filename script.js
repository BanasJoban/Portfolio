// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // ===== THEME TOGGLE =====
  const themeToggle = document.getElementById("theme-toggle");
  const toggleIcon = document.querySelector(".toggle-icon");

  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem("theme");
  if (
    savedTheme === "dark" ||
    (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.body.classList.add("dark-theme");
    toggleIcon.textContent = "☀️";
  }

  // Toggle theme function
  function toggleTheme() {
    document.body.classList.toggle("dark-theme");

    // Update icon and save preference
    if (document.body.classList.contains("dark-theme")) {
      toggleIcon.textContent = "☀️";
      localStorage.setItem("theme", "dark");
    } else {
      toggleIcon.textContent = "🌙";
      localStorage.setItem("theme", "light");
    }
  }

  // Add click event to theme toggle button
  themeToggle.addEventListener("click", toggleTheme);

  // ===== MOBILE MENU TOGGLE =====
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  mobileMenuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("nav-active");

    // Animate the hamburger icon to an X
    const bars = document.querySelectorAll(".bar");
    bars.forEach((bar) => bar.classList.toggle("active"));

    if (navLinks.classList.contains("nav-active")) {
      bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)";
      bars[1].style.opacity = "0";
      bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)";
    } else {
      bars[0].style.transform = "none";
      bars[1].style.opacity = "1";
      bars[2].style.transform = "none";
    }
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", function () {
      if (navLinks.classList.contains("nav-active")) {
        navLinks.classList.remove("nav-active");

        // Reset hamburger icon
        const bars = document.querySelectorAll(".bar");
        bars[0].style.transform = "none";
        bars[1].style.opacity = "1";
        bars[2].style.transform = "none";
      }
    });
  });

  // ===== SKILL BARS ANIMATION =====
  // Animate skill bars when they come into view
  const skillLevels = document.querySelectorAll(".skill-level");

  // Set initial width to 0
  skillLevels.forEach((skill) => {
    skill.style.width = "0";
  });

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Function to animate skill bars
  function animateSkillBars() {
    skillLevels.forEach((skill) => {
      if (isInViewport(skill)) {
        // Get the width from the style attribute
        const width = skill.style.width;
        // Set a CSS variable for the animation
        skill.style.setProperty("--skill-width", width);
        // Add the animation class
        skill.classList.add("animate-skill");
      }
    });
  }

  // Check on scroll
  window.addEventListener("scroll", animateSkillBars);
  // Check on initial load
  animateSkillBars();

  // ===== FADE-IN ANIMATION =====
  // Add fade-in animation to elements
  const fadeElements = document.querySelectorAll(
    ".section-title, .project-card, .contact-item"
  );

  fadeElements.forEach((element) => {
    element.classList.add("fade-in");
  });

  function checkFadeElements() {
    fadeElements.forEach((element) => {
      if (isInViewport(element)) {
        element.classList.add("visible");
      }
    });
  }

  // Check on scroll
  window.addEventListener("scroll", checkFadeElements);
  // Check on initial load
  checkFadeElements();

  // ===== FORM SUBMISSION =====
  const contactForm = document.getElementById("contact-form");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Simple form validation
    if (name && email && message) {
      // In a real application, you would send this data to a server
      // For this demo, we'll just show an alert
      alert(
        `Thank you for your message, ${name}! This is a demo form, so no message was actually sent.`
      );
      contactForm.reset();
    } else {
      alert("Please fill in all fields.");
    }
  });

  // ===== SMOOTH SCROLLING =====
  // Add smooth scrolling to all links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Get the target's position
        const targetPosition =
          targetElement.getBoundingClientRect().top + window.pageYOffset;
        // Adjust for header height
        const headerOffset = 70;
        const offsetPosition = targetPosition - headerOffset;

        // Smooth scroll to target
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});
