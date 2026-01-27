// Form submission with animation
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Show success message
  const successMsg = document.getElementById('successMessage');
  successMsg.classList.add('show');
  
  // Reset form
  this.reset();
  
  // Hide message after 5 seconds
  setTimeout(() => {
    successMsg.classList.remove('show');
  }, 5000);
});

// Add floating label effect
const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.classList.add('focused');
  });
  
  input.addEventListener('blur', function() {
    if (!this.value) {
      this.parentElement.classList.remove('focused');
    }
  });
});