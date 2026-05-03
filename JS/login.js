 // DOM Elements
const form = document.getElementById('loginForm');
const loginButton = document.getElementById('loginButton');

 // Form validation state
let isFormValid = false;
let isSubmitting = false;

 // Sample user data for demonstration
async function submitLogin() {
    isSubmitting = true;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    loginButton.classList.add('loading');
    loginButton.disabled = true;
    try {
        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        let data;
            try {
            data = await response.json();
            }
            catch {
                data = null;
            }

        if (response.ok) {
            // ✅ store JWT token
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", username);
            showToast("Login successful!", "success");

            setTimeout(() => {
                window.location.href = "user.html";
            }, 1000);

        } else {
            showToast("Invalid credentials", "error");
        }

    } catch (error) {
    console.error(error); 
    showToast("Server error", "error");
}

    loginButton.classList.remove('loading');
    loginButton.disabled = false;
    isSubmitting = false;
}

 // Initialize form
document.addEventListener('DOMContentLoaded', function() {
    setupFormValidation();
    setupEventListeners();
    checkRememberedUser();
});

 // Setup form validation
function setupFormValidation() {
    form.addEventListener('submit', handleFormSubmit);
    
     // Add input event listeners for real-time validation
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
}

 // Setup event listeners
function setupEventListeners() {
     // Auto-save username if remember me is checked
    const rememberCheckbox = document.getElementById('remember');
    const usernameInput = document.getElementById('username');
    rememberCheckbox.addEventListener('change', function() {
        if (this.checked) {
            localStorage.setItem('rememberUsername', usernameInput.value);
        } else {
            localStorage.removeItem('rememberUsername');
        }
    });

     // Auto-fill username if remembered
    usernameInput.addEventListener('input', function() {
        if (rememberCheckbox.checked) {
            localStorage.setItem('rememberUsername', this.value);
        }
    });
}

 // Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    if (isSubmitting) return;
    // Validate all fields
    const isValid = validateAllFields();
    if (!isValid) {
        showToast('Please fix the errors in the form', 'error');
        return;
    }
    
     // Submit form
    submitLogin();
}

 // Validate all fields
function validateAllFields() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    let isValid = true;

    if (!validateUsername(username)) {
        isValid = false;
    }
    
    if (!validatePassword(password)) {
    isValid = false;
    }
    
    return isValid;
}

 // Field validators
function validateUsername(value) {
        if (!value.trim()) {
            showFieldError('username', 'Username or email is required');
            return false;
        }

     // Check if it's an email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value)) {
         // It's an email, validate email format
            if (!emailRegex.test(value)) {
                showFieldError('username', 'Please enter a valid email address');
                return false;
            }
        } else {
         // It's a username, validate username format
            if (value.trim().length < 3) {
                showFieldError('username', 'Username must be at least 3 characters');
                return false;
            }
        }
        
        showFieldSuccess('username');
        return true;
    }

    function validatePassword(value) {
        if (!value) {
            showFieldError('password', 'Password is required');
            return false;
        }
        
        if (value.length < 6) {
            showFieldError('password', 'Password must be at least 6 characters');
            return false;
        }
        
        showFieldSuccess('password');
        return true;
    }

 // Field validation helper
 function validateField(input) {
     const fieldName = input.name;
     const value = input.value;
     
     switch (fieldName) {
         case 'username':
             validateUsername(value);
             break;
         case 'password':
             validatePassword(value);
             break;
     }
 }

 // Show field error
 function showFieldError(fieldName, message) {
     const group = document.getElementById(fieldName + 'Group');
     const error = document.getElementById(fieldName + 'Error');
     
     group.classList.remove('success');
     group.classList.add('error');
     error.textContent = message;
     error.style.display = 'block';
 }

 // Show field success
 function showFieldSuccess(fieldName) {
     const group = document.getElementById(fieldName + 'Group');
     const error = document.getElementById(fieldName + 'Error');
     
     group.classList.remove('error');
     group.classList.add('success');
     error.style.display = 'none';
 }

 // Clear field error
function clearFieldError(input) {
    const fieldName = input.name;
    const group = document.getElementById(fieldName + 'Group');
    const error = document.getElementById(fieldName + 'Error');

    if (group) group.classList.remove('error', 'success');
    if (error) error.style.display = 'none';
}

 // Toggle password visibility
    function togglePassword() {
        const input = document.getElementById('password');
        const button = document.querySelector('.password-toggle');

        if (input.type === 'password') {
            input.type = 'text';
            button.textContent = '🙈';
        } else {
            input.type = 'password';
            button.textContent = '👁️';
        }
    }
 // Check remembered user
    function checkRememberedUser() {
        const rememberedUsername = localStorage.getItem('rememberUsername');
        if (rememberedUsername) {
            document.getElementById('username').value = rememberedUsername;
            document.getElementById('remember').checked = true;
        }
    }

 // Forgot password
 function forgotPassword() {
     showToast('Password reset functionality would open here', 'success');
 }

 // Keyboard shortcuts
 document.addEventListener('keydown', (e) => {
     if (e.ctrlKey && e.key === 'Enter') {
         e.preventDefault();
         form.dispatchEvent(new Event('submit'));
     }
 });

 // Demo credentials helper
 function showDemoCredentials() {
     showToast('Demo credentials: admin/admin123 or user/user123', 'success');
 }

 // Add demo credentials button (for development)
 setTimeout(() => {
     const demoBtn = document.createElement('button');
     demoBtn.textContent = 'Demo Credentials';
     demoBtn.style.cssText = `
         position: fixed;
         bottom: 20px;
         left: 20px;
         background: rgba(52, 152, 219, 0.9);
         color: white;
         border: none;
         padding: 10px 15px;
         border-radius: 8px;
         cursor: pointer;
         font-size: 12px;
         z-index: 1000;
     `;
     demoBtn.addEventListener('click', showDemoCredentials);
     document.body.appendChild(demoBtn);
 }, 1000);