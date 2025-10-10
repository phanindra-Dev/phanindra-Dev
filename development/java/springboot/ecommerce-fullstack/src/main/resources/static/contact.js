const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const form = document.getElementById('contactForm');

// Hamburger Menu Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Form Submit Handler
form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const product = document.getElementById('product').value;  // Product input
    const message = document.getElementById('message').value;

    // Prepare data for API call
    const formData = {
        name: name,
        email: email,
        phone: phone,
        product: product,
        message: message
    };
    console.log('Form Data:', formData);
    // Display loading or submission status
    document.querySelector('.submitting').textContent = "Sending...";

    // Make API call (Replace with your API endpoint)
    fetch('http://localhost:8080/contact/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
    })

    .then(response => response.json())
    .then(data => {
        // Handle response (Success)
        if (data.success) {
            document.querySelector('#form-message-warning').style.display = 'none';
            document.querySelector('#form-message-success').style.display = 'block';
            document.querySelector('#form-message-success').textContent = 'Your message was sent successfully!';
            form.reset();
        } else {
            document.querySelector('#form-message-success').style.display = 'none';
            document.querySelector('#form-message-warning').style.display = 'block';
            document.querySelector('#form-message-warning').textContent = 'There was an issue sending your message. Please try again.';
        }
    })
    .catch(error => {
        // Handle error
        document.querySelector('#form-message-success').style.display = 'none';
        document.querySelector('#form-message-warning').style.display = 'block';
        document.querySelector('#form-message-warning').textContent = 'Error: ' + error.message;
    })
    .finally(() => {
        // Hide submitting message
        document.querySelector('.submitting').textContent = '';
    });
});
