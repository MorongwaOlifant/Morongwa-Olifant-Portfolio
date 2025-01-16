// Smooth Scroll for Navigation Links
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = link.getAttribute('href').slice(1); // Get target section ID
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// WhatsApp Button Alert
const whatsappButton = document.querySelector('.whatsapp-button');
if (whatsappButton) {
    whatsappButton.addEventListener('click', (event) => {
        event.preventDefault();
        const userConfirmed = confirm('Do you want to open WhatsApp?');
        if (userConfirmed) {
            window.open('https://wa.me/your-number', '_blank');
        }
    });
}

// Back to Top Button
const backToTopButton = document.createElement('button');
backToTopButton.innerText = '↑';
backToTopButton.style.position = 'fixed';
backToTopButton.style.bottom = '20px';
backToTopButton.style.right = '20px';
backToTopButton.style.padding = '10px 20px';
backToTopButton.style.display = 'none'; // Initially hidden
backToTopButton.style.cursor = 'pointer';
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
