// Contact Form
const contactForm = document.getElementById('contactForm');
const inquiryResult = document.getElementById('inquiryResult');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const business = formData.get('business');
  const service = formData.get('service');
  const message = formData.get('message');
  
  const inquiryId = Math.floor(100000 + Math.random() * 900000);
  
  contactForm.style.display = 'none';
  inquiryResult.classList.add('active');
  
  const whatsappMessage = `Hello Grovix Studio!

Inquiry ID: #${inquiryId}
Name: ${name}
Email: ${email}
Phone: ${phone}
Business: ${business}
${service ? `Interested in: ${service}` : ''}

Message: ${message}`;
  
  inquiryResult.innerHTML = `
    <h3>Welcome to Grovix Studio</h3>
    <p>Your inquiry has been received</p>
    <div class="inquiry-id">#${inquiryId}</div>
    <p>Our sales strategist will contact you shortly.</p>
    <a href="https://wa.me/919999999999?text=${encodeURIComponent(whatsappMessage)}" 
       class="whatsapp-btn" target="_blank">
      CONNECT VIA WHATSAPP
    </a>
  `;
});
