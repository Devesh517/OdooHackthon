// DOM Elements
const form = document.getElementById('signupForm');
const signupButton = document.getElementById('signupButton');

// Form validation state
let isFormValid = false;
let isSubmitting = false;

// Initialize form
document.addEventListener('DOMContentLoaded', function() {
    setupFormValidation();
    setupEventListeners();
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
    // Real-time password confirmation validation
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    confirmPasswordInput.addEventListener('input', function() {
        if (this.value && passwordInput.value) {
            validatePasswordConfirmation();
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
    submitSignup();
}

// Validate all fields
function validateAllFields() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const phone = document.getElementById('phone').value;
    const terms = document.getElementById('terms').checked;
    
    let isValid = true;
    
    if (!validateFullName(fullName)) {
        isValid = false;
    }
    
    if (!validateEmail(email)) {
        isValid = false;
    }
    
    if (!validateUsername(username)) {
        isValid = false;
    }
    
    if (!validatePassword(password)) {
        isValid = false;
    }
    
    if (!validatePasswordConfirmation(password, confirmPassword)) {
        isValid = false;
    }
    
    if (!validatePhone(phone)) {
        isValid = false;
    }
    
    if (!terms) {
        showToast('Please accept the Terms of Service and Privacy Policy', 'error');
        isValid = false;
    }
    
    return isValid;
}

// Field validators
function validateFullName(value) {
    if (!value.trim()) {
        showFieldError('fullName', 'Full name is required');
        return false;
    }
    
    if (value.trim().length < 2) {
        showFieldError('fullName', 'Full name must be at least 2 characters');
        return false;
    }
    
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(value.trim())) {
        showFieldError('fullName', 'Full name can only contain letters and spaces');
        return false;
    }
    
    showFieldSuccess('fullName');
    return true;
}

function validateEmail(value) {
    if (!value.trim()) {
        showFieldError('email', 'Email is required');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        showFieldError('email', 'Please enter a valid email address');
        return false;
    }
    
    showFieldSuccess('email');
    return true;
}

function validateUsername(value) {
    if (!value.trim()) {
        showFieldError('username', 'Username is required');
        return false;
    }
    
    if (value.trim().length < 3) {
        showFieldError('username', 'Username must be at least 3 characters');
        return false;
    }
    
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(value)) {
        showFieldError('username', 'Username can only contain letters, numbers, and underscores');
        return false;
    }
    
    showFieldSuccess('username');
    return true;
}

function validatePassword(value) {
    if (!value) {
        showFieldError('password', 'Password is required');
        return false;
    }
    
    if (value.length < 8) {
        showFieldError('password', 'Password must be at least 8 characters');
        return false;
    }
    
    // Check for at least one uppercase, one lowercase, and one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    if (!passwordRegex.test(value)) {
        showFieldError('password', 'Password must contain at least one uppercase letter, one lowercase letter, and one number');
        return false;
    }
    
    showFieldSuccess('password');
    return true;
}

function validatePasswordConfirmation(password, confirmPassword) {
    if (!confirmPassword) {
        showFieldError('confirmPassword', 'Please confirm your password');
        return false;
    }
    
    if (password !== confirmPassword) {
        showFieldError('confirmPassword', 'Passwords do not match');
        return false;
    }
    
    showFieldSuccess('confirmPassword');
    return true;
}

function validatePhone(value) {
    if (!value.trim()) {
        showFieldError('phone', 'Phone number is required');
        return false;
    }
    
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
        showFieldError('phone', 'Please enter a valid phone number');
        return false;
    }
    
    showFieldSuccess('phone');
    return true;
}

// Field validation helper
function validateField(input) {
    const fieldName = input.name;
    const value = input.value;
    
    switch (fieldName) {
        case 'fullName':
            validateFullName(value);
            break;
        case 'email':
            validateEmail(value);
            break;
        case 'username':
            validateUsername(value);
            break;
        case 'password':
            validatePassword(value);
            break;
        case 'confirmPassword':
            validatePasswordConfirmation(document.getElementById('password').value, value);
            break;
        case 'phone':
            validatePhone(value);
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
    
    group.classList.remove('error', 'success');
    error.style.display = 'none';
}

// Toggle password visibility
function togglePassword() {
    const input = document.getElementById('password');
    const button = document.querySelector('#passwordGroup .password-toggle');
    
    if (input.type === 'password') {
        input.type = 'text';
        button.textContent = '🙈';
    } else {
        input.type = 'password';
        button.textContent = '👁️';
    }
}

function toggleConfirmPassword() {
    const input = document.getElementById('confirmPassword');
    const button = document.querySelector('#confirmPasswordGroup .password-toggle');
    
    if (input.type === 'password') {
        input.type = 'text';
        button.textContent = '🙈';
    } else {
        input.type = 'password';
        button.textContent = '👁️';
    }
}
async function submitSignup() {
    isSubmitting = true;
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        phone: document.getElementById('phone').value
    };
    signupButton.classList.add('loading');
    signupButton.disabled = true;
    try {
        const response = await fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            showToast("Signup successful!", "success");
            window.location.href = "login.html";
        } else {
            showToast("Signup failed", "error");
        }
    } catch (error) {
        console.log(error);
        showToast("Server error", "error");
    }
    signupButton.classList.remove('loading');
    signupButton.disabled = false;
    isSubmitting = false;
}

// Show terms and privacy
function showTerms() {
    showToast('Terms of Service would open here', 'info');
}

function showPrivacy() {
    showToast('Privacy Policy would open here', 'info');
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        form.dispatchEvent(new Event('submit'));
    }
});