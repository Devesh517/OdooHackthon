// Common JavaScript for ReWear Application

// Global variables
let currentUser = null;
let isMobileMenuOpen = false;

// Initialize common functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeCommon();
    checkUserSession();
    setupEventListeners();
});

// Initialize common elements
function initializeCommon() {
    // Add header and footer if they don't exist
    if (!document.querySelector('.header')) {
        addHeader();
    }
    if (!document.querySelector('.footer')) {
        addFooter();
    }
    
    // Set active navigation based on current page
    setActiveNavigation();
    
    // Initialize mobile menu
    initializeMobileMenu();
}

// Add header to the page
function addHeader() {
    const header = document.createElement('header');
    header.className = 'header';
    
    const currentPage = getCurrentPage();
    const isAuthPage = ['login.html', 'newusr.html'].includes(currentPage);
    const isAdminPage = currentPage === 'admin.html';
    if (isAuthPage) {
        // Simple header for auth pages
        header.innerHTML = `
            <div class="header-content">
                <a href="landing.html" class="logo">
                    <img src="../Images/icon.png" alt="ReWear" class="logo-icon">
                    <span>ReWear</span>
                </a>
            </div>
        `;
    } else {

    // =========================
    // ADMIN HEADER
    // =========================

    if (isAdminPage) {

        header.innerHTML = `
            <div class="header-content">

                <a href="admin.html" class="logo">
                    <img src="../Images/icon.png"
                            alt="ReWear"
                            class="logo-icon">

                    <span>ReWear Admin</span>
                </a>

                <div class="user-menu">

                    <div class="user-profile">
                        <img src="../Images/user.png"
                                alt="Profile"
                                class="user-avatar">

                        <span class="user-name">
                            Admin
                        </span>
                    </div>

                    <button class="logout-btn"
                        onclick="logout()">

                        Logout

                    </button>

                </div>

            </div>
        `;

    }

    // =========================
    // USER HEADER
    // =========================

    else {

        header.innerHTML = `
            <div class="header-content">

                <a href="landing.html" class="logo">
                    <img src="../Images/icon.png"
                            alt="ReWear"
                            class="logo-icon">

                    <span>ReWear</span>
                </a>

                <nav class="nav-menu">
                    <ul>
                        <li>
                            <a href="landing.html"
                               class="nav-link">

                               Home

                            </a>
                        </li>

                        <li>
                            <a href="user.html"
                               class="nav-link">

                               Dashboard

                            </a>
                        </li>

                        <li>
                            <a href="product.html"
                               class="nav-link">

                               Products

                            </a>
                        </li>

                        <li>
                            <a href="contact.html"
                               class="nav-link">

                               Contact

                            </a>
                        </li>
                    </ul>
                </nav>

                <div class="user-menu">

                    <div class="user-profile"
                        onclick="toggleUserMenu()">

                        <img src="../Images/user.png"
                             alt="Profile"
                             class="user-avatar">

                        <span class="user-name">
                            Guest
                        </span>

                    </div>

                    <button class="setting-btn"
                        onclick="btnsetting()">

                        Setting

                    </button>

                    <button class="logout-btn"
                        onclick="logout()">

                        Logout

                    </button>

                </div>

                <button class="mobile-menu-toggle"
                    onclick="toggleMobileMenu()">

                    ☰

                </button>

            </div>
        `;
    }
}
    
    // Insert header at the beginning of body
    document.body.insertBefore(header, document.body.firstChild);
}
// 🔹 Create settings UI (only once)
function btnsetting() {
  // Create only if not already created
  if (!document.getElementById('settingsSection')) {

    const div = document.createElement('div');
    div.id = 'settingsSection';
    div.className = 'settings hidden';

    div.innerHTML = `
        <div class="settings-box">
        <div class="settings-header">
        <h3>⚙️ Settings</h3>
        <button onclick="closesetting()">✕</button>
        </div>

        <div class="settings-tabs">
            <button class="settings-tab-btn active" onclick="showSetting('account', this)">👤 Account</button>
            <button class="settings-tab-btn" onclick="showSetting('security', this)">🔐 Security</button>
            <button class="settings-tab-btn" onclick="showSetting('appearance', this)">🌙 Appearance</button>
        </div>

        <div class="settings-content">
          <div id="account" class="setting-panel">
            <h4 class="panel-title">👤 Account Settings</h4>
            <div class="settings-options">
              <button class="settings-action-btn" onclick="editName()">
                <span class="btn-icon">✏️</span>
                <span class="btn-text">
                  <span class="btn-title">Change Name</span>
                  <span class="btn-subtitle">Update your display name</span>
                </span>
              </button>
              <button class="settings-action-btn" onclick="editEmail()">
                <span class="btn-icon">📧</span>
                <span class="btn-text">
                  <span class="btn-title">Change Email</span>
                  <span class="btn-subtitle">Update your email address</span>
                </span>
              </button>
            </div>
          </div>

          <div id="security" class="setting-panel hidden">
            <h4 class="panel-title">🔐 Security Settings</h4>
            <div class="settings-options">
              <button class="settings-action-btn" onclick="changePassword()">
                <span class="btn-icon">🔑</span>
                <span class="btn-text">
                  <span class="btn-title">Change Password</span>
                  <span class="btn-subtitle">Update your password for better security</span>
                </span>
              </button>
              <button class="settings-action-btn" onclick="twoFactor()">
                <span class="btn-icon">🛡️</span>
                <span class="btn-text">
                  <span class="btn-title">Two-Factor Authentication</span>
                  <span class="btn-subtitle">Enable 2FA for enhanced security</span>
                </span>
              </button>
            </div>
          </div>

          <div id="appearance" class="setting-panel hidden">
            <h4 class="panel-title">🌙 Appearance Settings</h4>
            <div class="settings-options">
              <button class="settings-action-btn" onclick="toggleDarkMode()">
                <span class="btn-icon">🌙</span>
                <span class="btn-text">
                  <span class="btn-title">Toggle Dark Mode</span>
                  <span class="btn-subtitle">Switch between light and dark theme</span>
                </span>
              </button>
              <button class="settings-action-btn" onclick="changeTheme()">
                <span class="btn-icon">🎨</span>
                <span class="btn-text">
                  <span class="btn-title">Change Theme Color</span>
                  <span class="btn-subtitle">Personalize your interface colors</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(div);
  }

  // ✅ Always open after creation
  createsetting();
}

// 🔹 Open settings
function createsetting() {
  const settings = document.getElementById('settingsSection');
  if (!settings) return;

  settings.classList.remove('hidden');
  showSetting('account');
}

// 🔹 Close settings
function closesetting() {
  const settings = document.getElementById('settingsSection');
  if (settings) {
    settings.classList.add('hidden');
  }
}

// 🔹 Switch tabs
function showSetting(type, buttonElement) {
  // Hide all panels
  document.querySelectorAll('.setting-panel').forEach(panel => {
    panel.classList.add('hidden');
  });

  // Show selected panel
  const activePanel = document.getElementById(type);
  if (activePanel) {
    activePanel.classList.remove('hidden');
  }

  // Update active button
  if (buttonElement) {
    document.querySelectorAll('.settings-tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    buttonElement.classList.add('active');
  }
}


// Add footer to the page
function addFooter() {
    const footer = document.createElement('footer');
    footer.className = 'footer';
    
    footer.innerHTML = `
        <div class="footer-content">
            <div class="footer-section">
                <h3>About ReWear</h3>
                <p>ReWear is a sustainable fashion platform that promotes clothing exchange and reduces textile waste. Join our community to give clothes a second life.</p>
                <div class="social-links">
                    <a href="#" title="Facebook"><img src="../Images/icons8-facebook-circled-48.gif" alt="Facebook"></a>
                    <a href="#" title="Twitter"><img src="../Images/icons8-x-96.png" alt="Twitter"></a>
                    <a href="#" title="Instagram"><img src="../Images/insta.png" alt="Instagram"></a>
                    <a href="#" title="LinkedIn"><img src="../Images/linkedin.png" alt="LinkedIn"></a>
                </div>
            </div>
            
            <div class="footer-section">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="landing.html">Home</a></li>
                    <li><a href="user.html">Dashboard</a></li>
                    <li><a href="#">How It Works</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="../HTML/contact.html">Support</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h3>Categories</h3>
                <ul>
                    <li><a href="../HTML/product.html?category=men">Men's Wear</a></li>
                    <li><a href="../HTML/product.html?category=women">Women's Wear</a></li>
                    <li><a href="../HTML/product.html?category=kids">Kids Clothing</a></li>
                    <li><a href="../HTML/product.html?category=accessories">Accessories</a></li>
                    <li><a href="../HTML/product.html?category=seasonal">Seasonal</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h3>Contact Info</h3>
                <p>Dargah Bajar Ajmer, Rajasthan</p>
                <p>devesh.dhanwani2005@gmail.com</p>
                <p>+916350537767</p>
            </div>
        </div>
        
        <div class="footer-bottom">
            <p>&copy; 2024 ReWear. All rights reserved. | Made with ❤️ for sustainable fashion</p>
        </div>
    `;
    
    // Append footer to body
    document.body.appendChild(footer);
}

// Get current page name
function getCurrentPage() {
    const path = window.location.pathname;
    return path.split('/').pop() || 'index.html';
}

// Set active navigation based on current page
function setActiveNavigation() {
    const currentPage = getCurrentPage();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

// Initialize mobile menu
function initializeMobileMenu() {
    // Add mobile menu HTML
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.id = 'mobileMenu';
    mobileMenu.innerHTML = `
        <div class="mobile-menu-header">
            <div class="logo">
                <img src="../Images/icon.png" alt="ReWear" class="logo-icon">
                <span>ReWear</span>
            </div>
            <button class="mobile-menu-close" onclick="toggleMobileMenu()">✕</button>
        </div>
        <nav class="mobile-nav">
            <ul>
                <li><a href="landing.html">Home</a></li>
                <li><a href="user.html">Dashboard</a></li>
                <li><a href="#">Products</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#" onclick="logout()">Logout</a></li>
            </ul>
        </nav>
    `;
    document.body.appendChild(mobileMenu);
}
// Toggle mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;
    if (isMobileMenuOpen) {
        mobileMenu.classList.remove('show');
        body.style.overflow = 'auto';
    } else {
        mobileMenu.classList.add('show');
        body.style.overflow = 'hidden';
    }
    isMobileMenuOpen = !isMobileMenuOpen;
}
// Toggle user menu
function toggleUserMenu() {
if (!document.getElementById('settingsSection')) {
    const div = document.createElement('div');
    div.id = 'settingsSection';
    div.className = 'settings hidden';
    div.innerHTML = `
        <div class="settings-box">
        <div class="settings-header">
        <h3>⚙️ USER Profile and Settings</h3>
        <button onclick="closesetting()">✕</button>
        </div>
        <div class="settings-tabs">
            <button class="settings-tab-btn active" onclick="showSetting('account', this)">👤 Account</button>
            <button class="settings-tab-btn" onclick="showSetting('security', this)">🔐 Security</button>
            <button class="settings-tab-btn" onclick="showSetting('appearance', this)">🌙 Appearance</button>
        </div>
        <div class="settings-content">
            <div id="account" class="setting-panel">
            <h4 class="panel-title">👤 Account Settings</h4>
            <div class="settings-options">
                <button class="settings-action-btn" onclick="editName()">
                <span class="btn-icon">✏️</span>
                <span class="btn-text">
                    <span class="btn-title">Change Name</span>
                    <span class="btn-subtitle">Update your display name</span>
                </span>
                </button>
                <button class="settings-action-btn" onclick="editEmail()">
                <span class="btn-icon">📧</span>
                <span class="btn-text">
                    <span class="btn-title">Change Email</span>
                    <span class="btn-subtitle">Update your email address</span>
                </span>
                </button>
            </div>
            </div>
            <div id="security" class="setting-panel hidden">
            <h4 class="panel-title">🔐 Security Settings</h4>
            <div class="settings-options">
                <button class="settings-action-btn" onclick="changePassword()">
                <span class="btn-icon">🔑</span>
                <span class="btn-text">
                    <span class="btn-title">Change Password</span>
                    <span class="btn-subtitle">Update your password for better security</span>
                </span>
                </button>
                <button class="settings-action-btn" onclick="twoFactor()">
                <span class="btn-icon">🛡️</span>
                <span class="btn-text">
                    <span class="btn-title">Two-Factor Authentication</span>
                    <span class="btn-subtitle">Enable 2FA for enhanced security</span>
                </span>
                </button>
            </div>
            </div>
            <div id="appearance" class="setting-panel hidden">
            <h4 class="panel-title">🌙 Appearance Settings</h4>
            <div class="settings-options">
                <button class="settings-action-btn" onclick="toggleDarkMode()">
                <span class="btn-icon">🌙</span>
                <span class="btn-text">
                    <span class="btn-title">Toggle Dark Mode</span>
                    <span class="btn-subtitle">Switch between light and dark theme</span>
                </span>
                </button>
                <button class="settings-action-btn" onclick="changeTheme()">
                <span class="btn-icon">🎨</span>
                <span class="btn-text">
                    <span class="btn-title">Change Theme Color</span>
                    <span class="btn-subtitle">Personalize your interface colors</span>
                </span>
                </button>
            </div>
            </div>
        </div>
        </div>
    `;

    document.body.appendChild(div);
}

  // ✅ Always open after creation
createsetting();
}

// Check user session
function checkUserSession() {
    const token = localStorage.getItem("token");

    if (token) {
        // ✅ User is logged in
        updateUserInterfaceJWT();
    } else {
        // ❌ Not logged in → protect pages
        const protectedPages = ['user.html', 'admin.html'];
        const currentPage = getCurrentPage();

        if (protectedPages.includes(currentPage)) {
            showToast('Please login to access this page', 'warning');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        }
    }
}
function updateUserInterfaceJWT() {

    const currentPage = getCurrentPage();

    const userNameElement =
        document.querySelector('.user-name');

    if (!userNameElement) return;

    const username =
        localStorage.getItem("username");

    const role =
        localStorage.getItem("role");

    // =========================
    // ADMIN PAGE
    // =========================

    if (currentPage === "admin.html") {
        if (role === "ADMIN") {
            userNameElement.textContent =
                username || "Admin";
        } else {
            userNameElement.textContent =
                "Unauthorized";
        }
        return;
    }
    // =========================
    // USER PAGE
    // =========================
    userNameElement.textContent =
        username || "User";
}

// Update user interface based on current user
function updateUserInterface() {
    if (!currentUser) return;
    
    const userNameElement = document.querySelector('.user-name');
    const userAvatarElement = document.querySelector('.user-avatar');
    
    if (userNameElement) {
        userNameElement.textContent = currentUser.username || 'User';
    }
    
    if (userAvatarElement) {
        userAvatarElement.src = currentUser.avatar || '../Images/profile pic.jpg';
    }
}

// Logout function
function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    showToast('Logged out successfully', 'success');

    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}

// Show toast notification
function showToast(message, type = 'success') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Hide and remove toast
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 4000);
}

// Show loading overlay
function showLoading() {
    let overlay = document.getElementById('loadingOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'loadingOverlay';
        overlay.className = 'loading-overlay';
        overlay.innerHTML = '<div class="loading-spinner"></div>';
        document.body.appendChild(overlay);
    }
    overlay.style.display = 'flex';
}

// Hide loading overlay
function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

// Setup event listeners
function setupEventListeners() {
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        
        if (isMobileMenuOpen && 
            !mobileMenu.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            toggleMobileMenu();
        }
    });
    
    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMobileMenuOpen) {
            toggleMobileMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && isMobileMenuOpen) {
            toggleMobileMenu();
        }
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Form validation utilities
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password && password.length >= 6;
}

function validateUsername(username) {
    return username && username.trim().length >= 3;
}

// API simulation functions
function simulateApiCall(data, delay = 1000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, delay);
    });
}

// Local storage utilities
function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

function getFromLocalStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

// Animation utilities
function fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let start = null;
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const opacity = Math.min(progress / duration, 1);
        
        element.style.opacity = opacity;
        
        if (progress < duration) {
            requestAnimationFrame(animate);
        }
    }
    requestAnimationFrame(animate);
}

function fadeOut(element, duration = 300) {
    let start = null;
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const opacity = Math.max(1 - progress / duration, 0);
        
        element.style.opacity = opacity;
        
        if (progress < duration) {
            requestAnimationFrame(animate);
        } else {
            element.style.display = 'none';
        }
    }
    requestAnimationFrame(animate);
}

// Settings action handlers
function editName() {
    showToast('Edit name feature coming soon!', 'info');
}

function editEmail() {
    showToast('Edit email feature coming soon!', 'info');
}

function changePassword() {
    showToast('Change password feature coming soon!', 'info');
}

function twoFactor() {
    showToast('Two-factor authentication feature coming soon!', 'info');
}

function changeTheme() {
    showToast('Change theme feature coming soon!', 'info');
}

function toggleDarkMode() {
    showToast('Dark mode feature coming soon!', 'info');
}

// Export functions for use in other scripts
window.ReWearCommon = {
    showToast,
    showLoading,
    hideLoading,
    logout,
    validateEmail,
    validatePassword,
    validateUsername,
    debounce,
    throttle,
    fadeIn,
    fadeOut,
    saveToLocalStorage,
    getFromLocalStorage
};
