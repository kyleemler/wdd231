// Navigation menu toggle for responsive design
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = navMenu.querySelectorAll('a');

    // Toggle menu on hamburger click
    menuToggle.addEventListener('click', function () {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('open');
    });

    // Close menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });

    // Close menu when window is resized to larger screen
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 768) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('open');
        }
    });

    // Set active link based on current page
    const currentLocation = location.href;
    navLinks.forEach(link => {
        if (link.href === currentLocation) {
            link.classList.add('active');
        }
    });
});
