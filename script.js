const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    const expanded = navLinks.classList.contains('show');
    menuToggle.setAttribute('aria-expanded', expanded);
  });
}
