// Contact Form
const contactForm = document.getElementById('contactForm');
const inquiryResult = document.getElementById('inquiryResult');

const apiBase = 'http://127.0.0.1:8000';

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const plan = urlParams.get('plan');
  
  if (plan) {
    const serviceSelect = document.querySelector('select[name="service"]');
    if (serviceSelect) {
      let optionExists = false;
      for (let i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].value.toLowerCase() === plan.toLowerCase() || 
            serviceSelect.options[i].text.toLowerCase().includes(plan.toLowerCase())) {
          serviceSelect.selectedIndex = i;
          optionExists = true;
          break;
        }
      }
      
      if (!optionExists) {
        const newOption = document.createElement('option');
        newOption.value = plan;
        newOption.text = `${plan}`;
        newOption.selected = true;
        serviceSelect.appendChild(newOption);
      }
    }
  }
});

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const business = formData.get('company');
  const service = formData.get('service');
  const message = formData.get('message');

  // Send inquiry to backend so it can save and send WhatsApp/SMS
  let inquiryId = null;
  let errorMessage = null;

  try {
    const response = await fetch(`${apiBase}/api/submit-inquiry/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        company: business,
        selected_plan: service,
        message,
      }),
    });

    const json = await response.json();

    if (!response.ok || !json.success) {
      errorMessage = json.error || 'Failed to submit inquiry.';
    } else {
      inquiryId = json.inquiry_id;
    }
  } catch (error) {
    errorMessage = error.message || 'Network error';
  }

  contactForm.style.display = 'none';
  inquiryResult.classList.add('active');

  if (errorMessage) {
    inquiryResult.innerHTML = `
      <h3>Oops, something went wrong</h3>
      <p>${errorMessage}</p>
      <p>Please try again or reach out to us directly.</p>
    `;
    return;
  }

  const whatsappMessage = `Hello Grovix Studio!\n\nInquiry ID: #${inquiryId}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nBusiness: ${business}\n${service ? `Interested in: ${service}` : ''}\n\nMessage: ${message}`;

  inquiryResult.innerHTML = `
    <div class="success-card">
      <h3>Your Inquiry ID</h3>
      <div class="inquiry-id">#${inquiryId}</div>
      <p style="color: rgba(255, 255, 255, 0.7);">Please save this ID for future reference</p>

      <div class="info-box">
        <h3>What happens next?</h3>
        <p>✅ We've received your inquiry for <strong>${service || 'your selected plan'}</strong></p>
        <p>✅ A confirmation will be sent to <strong>${email}</strong></p>
        <p>✅ Our team will review your requirements</p>
        <p>✅ We'll contact you within 24 hours</p>
      </div>

      <div class="info-box">
        <h3>Need immediate assistance?</h3>
        <p><strong>Phone:</strong> +91 70090 66489</p>
        <p><strong>Email:</strong> grovixstudios.official@gmail.com</p>
      </div>

      <div style="display: flex; justify-content: center; align-items: center; margin-top: 30px;">
        <a href="/home.html" class="btn-primary" style="display: flex; align-items: center; justify-content: center; height: 60px; padding: 0 40px; margin: 0;">BACK TO HOME</a>
      </div>

      <p style="margin-top: 35px; color: rgba(255, 255, 255, 0.6);">Questions? Contact us at <a href="mailto:grovixstudios.official@gmail.com" style="color: #00d9ff; text-decoration: none;">grovixstudios.official@gmail.com</a></p>
    </div>
  `;
});
