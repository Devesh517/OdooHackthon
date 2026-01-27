const userData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  location: 'New York, NY',
  memberSince: 'January 2024',
  totalPoints: 1250,
  bio: 'Fashion enthusiast and sustainability advocate. Love giving clothes a second life and connecting with like-minded people in the ReWear community.',
  avatar: '../Images/profile pic.jpg'
};

let userListings = [
  { id: 1, title: 'Blue Denim Jacket', image: '../Images/shirt.jpg', size: 'M', condition: 'Good', points: 75, status: 'Active', category: 'mens', dateListed: '2024-01-10' },
  { id: 2, title: 'Summer Dress', image: '../Images/cloth.png', size: 'S', condition: 'Like New', points: 60, status: 'Active', category: 'womens', dateListed: '2024-01-08' },
  { id: 3, title: 'Casual T-Shirt', image: '../Images/tshirt.jpg', size: 'L', condition: 'Used', points: 25, status: 'Traded', category: 'mens', dateListed: '2024-01-05' }
];

const purchasedItems = [
  { id: 1, title: 'Winter Hoodie', image: '../Images/denim.jpg', size: 'L', condition: 'Excellent', points: 85, purchaseDate: '2024-01-15', seller: 'Sarah M.', isFavorite: true },
  { id: 2, title: 'Vintage Jeans', image: '../Images/denim.jpg', size: '32', condition: 'Good', points: 45, purchaseDate: '2024-01-12', seller: 'Mike R.', isFavorite: false },
  { id: 3, title: 'Designer Blouse', image: '../Images/kurti.jpg', size: 'M', condition: 'Like New', points: 95, purchaseDate: '2024-01-08', seller: 'Emma L.', isFavorite: true }
];

const tradingHistory = [
  { id: 1, type: 'trade', status: 'completed', date: '2024-01-15', myItem: { title: 'Casual T-Shirt', image: '../Images/tshirt.jpg', points: 25 }, theirItem: { title: 'Winter Hoodie', image: '../Images/denim.jpg', points: 85 }, partner: 'Sarah M.', pointsGained: 60 }
];

const wishlistItems = [
  { id: 1, title: 'Designer Handbag', image: '../Images/icon.png', points: 150, category: 'accessories', addedDate: '2024-01-18' }
];

const userActivity = [
  { type: 'trade', message: 'Successfully traded "Casual T-Shirt" for "Winter Hoodie"', date: '2024-01-15', points: '+60' },
  { type: 'listing', message: 'Listed new item "Blue Denim Jacket"', date: '2024-01-10', points: '+75' }
];

// --- Initialization ---
document.addEventListener('DOMContentLoaded', function() {
  loadUserData();
  
  // Load saved listings from localStorage
  const savedListings = JSON.parse(localStorage.getItem('userListings')) || [];
  if (savedListings.length > 0) {
    const existingIds = userListings.map(l => l.id);
    savedListings.forEach(item => {
      if (!existingIds.includes(item.id)) {
        userListings.push(item);
      }
    });
  }
  
  populateListings();
  updateListingStats();
  populatePurchasedItems();
  populateTradingHistory();
  populateWishlist();
  populateActivity();
  updateStats();
});

let currentListingFilter = 'all';

// --- Functions ---

/**
 * Renders the user listings into the container
 */
function populateListings(filter = 'all') {
  const container = document.getElementById('listingsContainer');
  if (!container) return;

  currentListingFilter = filter;
  let filteredListings = userListings;
  if (filter !== 'all') {
    filteredListings = userListings.filter(l => l.status.toLowerCase() === filter);
  }

  if (filteredListings.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">👕</div>
        <div class="empty-state-title">No ${filter === 'all' ? 'Listings' : filter}</div>
        <button class="btn btn-primary" onclick="addNewListing()">Add New Listing</button>
      </div>`;
    return;
  }

  container.innerHTML = filteredListings.map(listing => `
    <div class="listing-card">
      <div class="listing-image-wrapper">
        <img src="${listing.image}" alt="${listing.title}" onerror="this.src='../Images/icon.png'">
        <div class="listing-status-badge status-${listing.status.toLowerCase()}">${listing.status}</div>
      </div>
      <div class="listing-info">
        <div class="listing-title">${listing.title}</div>
        <div class="listing-meta">
          <span class="meta-item">📋 ${listing.size}</span>
          <span class="meta-item">📅 ${listing.dateListed}</span>
        </div>
        <div class="listing-points">⭐ ${listing.points} Points</div>
        <div class="listing-actions">
          <button class="action-btn edit-btn" onclick="editListing(${listing.id})">✏️ Edit</button>
          <button class="action-btn view-btn" onclick="viewListing(${listing.id})">👁️ View</button>
          <button class="action-btn delete-btn" onclick="deleteListing(${listing.id})">🗑️ Delete</button>
        </div>
      </div>
    </div>
  `).join('');
}

// --- Navigation ---
function addNewListing() {
  window.location.href = '../HTML/prdctdetail.html';
}

function viewListing(id) {
  window.location.href = `../HTML/prdctdetail.html?id=${id}`;
}

function editListing(id) {
  window.location.href = `../HTML/prdctdetail.html?id=${id}&edit=true`;
}

/**
 * Handles product submission with storage quota safety
 */
function submitProduct(data) {
  try {
    const previewImage = document.getElementById('previewImage');
    let imageToSave = previewImage ? previewImage.src : '../Images/icon.png';

    // Anti-Quota Error Logic: Replace large base64 strings with a placeholder
    if (imageToSave.length > 1000000) {
      console.warn("Image too large for localStorage, using default icon.");
      imageToSave = '../Images/icon.png'; 
    }

    const newListing = {
      id: Date.now(),
      title: data.name,
      image: imageToSave,
      size: data.size,
      condition: data.condition,
      points: parseInt(data.points),
      status: 'Active',
      category: data.category,
      dateListed: new Date().toISOString().split('T')[0],
      description: data.description
    };

    // Save Logic
    const savedListings = JSON.parse(localStorage.getItem('userListings')) || [];
    savedListings.push(newListing);
    localStorage.setItem('userListings', JSON.stringify(savedListings));
    
    showToast('Listing added successfully!', 'success');
    setTimeout(() => { window.location.href = 'user.html'; }, 1000);

  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      showToast('Storage full! Please clear browser data or use a smaller image.', 'error');
    }
    console.error("Submission error:", error);
  }
}

function deleteListing(id) {
  if (confirm(`Are you sure you want to delete this listing?`)) {
    userListings = userListings.filter(l => l.id !== id);
    
    const savedListings = JSON.parse(localStorage.getItem('userListings')) || [];
    const updatedListings = savedListings.filter(l => l.id !== id);
    localStorage.setItem('userListings', JSON.stringify(updatedListings));
    
    populateListings(currentListingFilter);
    updateListingStats();
    showToast('Listing deleted', 'success');
  }
}

// --- UI Helpers ---
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'error' ? '#e74c3c' : '#2ecc71'};
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        font-family: sans-serif;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function loadUserData() {
  const elements = {
    'userName': userData.name,
    'userEmail': userData.email,
    'userPhone': userData.phone,
    'userLocation': userData.location,
    'memberSince': userData.memberSince,
    'totalPoints': userData.totalPoints.toLocaleString(),
    'userBio': userData.bio
  };
  
  for (const [id, val] of Object.entries(elements)) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }
  
  const img = document.getElementById('profileImage');
  if (img) img.src = userData.avatar;
}

function updateStats() {
  if (document.getElementById('itemsListed')) document.getElementById('itemsListed').textContent = userListings.length;
  if (document.getElementById('itemsPurchased')) document.getElementById('itemsPurchased').textContent = purchasedItems.length;
  if (document.getElementById('successfulTrades')) document.getElementById('successfulTrades').textContent = tradingHistory.length;
}

function updateListingStats() {
  if (document.getElementById('totalListings')) document.getElementById('totalListings').textContent = userListings.length;
  if (document.getElementById('activeListings')) document.getElementById('activeListings').textContent = userListings.filter(l => l.status === 'Active').length;
  if (document.getElementById('tradedListings')) document.getElementById('tradedListings').textContent = userListings.filter(l => l.status === 'Traded').length;
}

function showTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  const targetTab = document.getElementById(tabName);
  if (targetTab) targetTab.classList.add('active');
  if (event.target) event.target.classList.add('active');
}

// --- List Population ---
function populatePurchasedItems() {
  const container = document.getElementById('purchasedContainer');
  if (!container) return;
  container.innerHTML = purchasedItems.map(item => `
    <div class="item-card">
      <img src="${item.image}" alt="${item.title}" onerror="this.src='../Images/icon.png'">
      <div class="item-info">
        <div class="item-title">${item.title}</div>
        <div class="item-price">Points: ${item.points}</div>
        <button class="action-btn view-btn" onclick="showToast('Purchase history view coming soon', 'info')">View Details</button>
      </div>
    </div>`).join('');
}

function populateTradingHistory() {
  const container = document.getElementById('tradingContainer');
  if (!container) return;
  container.innerHTML = tradingHistory.map(trade => `
    <div class="trade-card">
      <div class="trade-header">Trade on ${trade.date} - ${trade.status.toUpperCase()}</div>
      <div class="trade-details">${trade.myItem.title} ⇄ ${trade.theirItem.title}</div>
    </div>`).join('');
}

function populateWishlist() {
  const container = document.getElementById('wishlistContainer');
  if (!container) return;
  container.innerHTML = wishlistItems.map(item => `
    <div class="wishlist-item">
      <span>${item.title}</span>
      <button class="action-btn delete-btn" onclick="showToast('Removed from wishlist', 'success')">Remove</button>
    </div>`).join('');
}

function populateActivity() {
  const container = document.getElementById('activityContainer');
  if (!container) return;
  container.innerHTML = userActivity.map(act => `
    <div class="listing-card"><div class="listing-info">${act.message} (${act.date})</div></div>
  `).join('');
}