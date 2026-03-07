document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.service-detail-block');
  const navLinks = document.querySelectorAll('.services-subnav a');

  // Set up the Intersection Observer to watch when sections enter the screen
  const observerOptions = {
    root: null,
    // Triggers when the section reaches the middle 50% of the viewport
    rootMargin: '-20% 0px -50% 0px', 
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 1. Get the ID of the section currently in view
        const currentId = entry.target.getAttribute('id');

        // 2. Remove 'active' class from all links
        navLinks.forEach(link => {
          link.classList.remove('active');
        });

        // 3. Add 'active' class to the corresponding nav link
        const activeLink = document.querySelector(`.services-subnav a[href="#${currentId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);

  // Apply the observer to all service detail blocks
  sections.forEach(section => {
    observer.observe(section);
  });
});