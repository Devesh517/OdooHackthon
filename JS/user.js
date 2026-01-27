// User data
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

const userListings = [
    {
      id: 1,
      title: 'Blue Denim Jacket',
      image: '../Images/shirt.jpg',
      size: 'M',
      condition: 'Good',
      points: 75,
    status: 'Active',
    category: 'mens',
    dateListed: '2024-01-10'
    },
    {
      id: 2,
      title: 'Summer Dress',
      image: '../Images/cloth.png',
      size: 'S',
      condition: 'Like New',
      points: 60,
    status: 'Active',
    category: 'womens',
    dateListed: '2024-01-08'
    },
    {
      id: 3,
      title: 'Casual T-Shirt',
      image: '../Images/tshirt.jpg',
      size: 'L',
      condition: 'Used',
      points: 25,
    status: 'Traded',
    category: 'mens',
    dateListed: '2024-01-05'
  }
];

const purchasedItems = [
  {
    id: 1,
    title: 'Winter Hoodie',
    image: '../Images/denim.jpg',
    size: 'L',
    condition: 'Excellent',
    points: 85,
    purchaseDate: '2024-01-15',
    seller: 'Sarah M.',
    isFavorite: true
  },
  {
    id: 2,
    title: 'Vintage Jeans',
    image: '../Images/denim.jpg',
    size: '32',
    condition: 'Good',
    points: 45,
    purchaseDate: '2024-01-12',
    seller: 'Mike R.',
    isFavorite: false
  },
  {
    id: 3,
    title: 'Designer Blouse',
    image: '../Images/kurti.jpg',
    size: 'M',
    condition: 'Like New',
    points: 95,
    purchaseDate: '2024-01-08',
    seller: 'Emma L.',
    isFavorite: true
  }
];

const tradingHistory = [
  {
    id: 1,
    type: 'trade',
    status: 'completed',
    date: '2024-01-15',
    myItem: {
      title: 'Casual T-Shirt',
      image: '../Images/tshirt.jpg',
      points: 25
    },
    theirItem: {
      title: 'Winter Hoodie',
      image: '../Images/denim.jpg',
      points: 85
    },
    partner: 'Sarah M.',
    pointsGained: 60
  },
  {
    id: 2,
    type: 'sale',
    status: 'completed',
    date: '2024-01-12',
    myItem: {
      title: 'Blue Denim Jacket',
      image: '../Images/shirt.jpg',
      points: 75
    },
    theirItem: null,
    partner: 'Alex K.',
    pointsGained: 75
  },
  {
    id: 3,
    type: 'trade',
    status: 'pending',
    date: '2024-01-20',
    myItem: {
      title: 'Summer Dress',
      image: '../Images/cloth.png',
      points: 60
    },
    theirItem: {
      title: 'Leather Jacket',
      image: '../Images/shirt.jpg',
      points: 120
    },
    partner: 'David W.',
    pointsGained: 60
  }
];

const wishlistItems = [
  {
    id: 1,
    title: 'Designer Handbag',
    image: '../Images/icon.png',
    points: 150,
    category: 'accessories',
    addedDate: '2024-01-18'
  },
  {
    id: 2,
    title: 'Vintage Watch',
    image: '../Images/icon.png',
    points: 200,
    category: 'accessories',
    addedDate: '2024-01-16'
  },
  {
    id: 3,
    title: 'Silk Scarf',
    image: '../Images/icon.png',
    points: 40,
    category: 'accessories',
    addedDate: '2024-01-14'
    }
  ];

  const userActivity = [
    {
      type: 'trade',
      message: 'Successfully traded "Casual T-Shirt" for "Winter Hoodie"',
      date: '2024-01-15',
    points: '+60'
  },
  {
    type: 'purchase',
    message: 'Purchased "Designer Blouse" from Emma L.',
    date: '2024-01-08',
    points: '-95'
    },
    {
      type: 'listing',
      message: 'Listed new item "Blue Denim Jacket"',
    date: '2024-01-10',
      points: '+75'
    },
    {
      type: 'rating',
      message: 'Received 5-star rating for "Summer Dress"',
      date: '2024-01-10',
      points: '+10'
    }
  ];

  // Initialize dashboard
  document.addEventListener('DOMContentLoaded', function () {
  console.log('Loading user dashboard');

  loadUserData();

  // ✅ Load listings ONLY from localStorage
  userListings = JSON.parse(localStorage.getItem('userListings')) || [];

  console.log('Listings loaded from storage:', userListings);

  populateListings();
  updateListingStats();
  populatePurchasedItems();
  populateTradingHistory();
  populateWishlist();
  populateActivity();
  updateStats();
});

  // Filter state
  let currentListingFilter = 'all';

  // Populate listings
  function populateListings(filter = 'all') {
    console.log('populateListings called with filter:', filter);
    console.log('userListings:', userListings);
    
    const container = document.getElementById('listingsContainer');
    
    if (!container) {
      console.error('listingsContainer element not found');
      return;
    }
    
    currentListingFilter = filter;
    
    let filteredListings = userListings;
    if (filter !== 'all') {
      filteredListings = userListings.filter(l => l.status.toLowerCase() === filter);
    }
    
    console.log('Filtered listings count:', filteredListings.length);
    console.log('Filtered listings:', filteredListings);
    
    if (filteredListings.length === 0) {
      console.log('No listings to display');
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">👕</div>
          <div class="empty-state-title">No ${filter === 'all' ? 'Listings' : filter.charAt(0).toUpperCase() + filter.slice(1) + ' Listings'}</div>
          <div class="empty-state-text">Start by listing your first item to trade!</div>
          <button class="btn btn-primary" onclick="addNewListing()">Add New Listing</button>
        </div>
      `;
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
            <span class="meta-item">✓ ${listing.condition}</span>
            <span class="meta-item">📅 ${listing.dateListed}</span>
          </div>
          <div class="listing-points">⭐ ${listing.points} Points</div>
          <div class="listing-actions">
            <button class="action-btn edit-btn" onclick="editListing(${listing.id})" title="Edit listing">✏️ Edit</button>
            <button class="action-btn view-btn" onclick="viewListing(${listing.id})" title="View listing">👁️ View</button>
            <button class="action-btn delete-btn" onclick="deleteListing(${listing.id})" title="Delete listing">🗑️ Delete</button>
          </div>
        </div>
      </div>
    `).join('');
    
    console.log('Listings rendered successfully');
  }

  // Filter listings
  function filterListings(filter, button) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    button.classList.add('active');
    
    // Repopulate with filter
    populateListings(filter);
  }

  // Update listing statistics
  function updateListingStats() {
    const totalListings = userListings.length;
    const activeListings = userListings.filter(l => l.status === 'Active').length;
    const tradedListings = userListings.filter(l => l.status === 'Traded').length;
    const totalPoints = userListings.reduce((sum, l) => sum + l.points, 0);
    
    document.getElementById('totalListings').textContent = totalListings;
    document.getElementById('activeListings').textContent = activeListings;
    document.getElementById('tradedListings').textContent = tradedListings;
    document.getElementById('listingPoints').textContent = totalPoints;
  }

  // Populate activity
  function populateActivity() {
    const container = document.getElementById('activityContainer');
    
    if (userActivity.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📊</div>
          <div class="empty-state-title">No Activity Yet</div>
          <div class="empty-state-text">Your activity will appear here once you start trading!</div>
        </div>
      `;
      return;
    }

    container.innerHTML = userActivity.map(activity => `
      <div class="listing-card">
        <div class="listing-info">
          <div class="listing-title">${activity.message}</div>
          <div class="listing-details">Date: ${activity.date}</div>
          <div class="listing-points">Points: ${activity.points}</div>
        </div>
      </div>
    `).join('');
  }

  // Action functions
  function editListing(id) {
    const listing = userListings.find(l => l.id === id);
    if (listing) {
      showToast(`Editing ${listing.title}...`, 'success');
      // Here you would typically open an edit modal or navigate to edit page
    }
  }

  function viewListing(id) {
    const listing = userListings.find(l => l.id === id);
    if (listing) {
      showToast(`Viewing ${listing.title}...`, 'success');
      // Here you would typically navigate to the listing detail page
    }
  }

  function deleteListing(id) {
    const listing = userListings.find(l => l.id === id);
    if (listing) {
      if (confirm(`Are you sure you want to delete "${listing.title}"?`)) {
        const index = userListings.indexOf(listing);
        userListings.splice(index, 1);
        
        // Update localStorage if this was a saved listing (ID is a large number from Date.now())
        if (id > 1000000000) {
          const savedListings = JSON.parse(localStorage.getItem('userListings')) || [];
          const savedIndex = savedListings.findIndex(l => l.id === id);
          if (savedIndex > -1) {
            savedListings.splice(savedIndex, 1);
            localStorage.setItem('userListings', JSON.stringify(savedListings));
          }
        }
        
        populateListings(currentListingFilter);
        updateListingStats();
        showToast(`${listing.title} deleted successfully`, 'success');
      }
    }
  }

// Load user data into profile
function loadUserData() {
  document.getElementById('userName').textContent = userData.name;
  document.getElementById('userEmail').textContent = userData.email;
  document.getElementById('userPhone').textContent = userData.phone;
  document.getElementById('userLocation').textContent = userData.location;
  document.getElementById('memberSince').textContent = userData.memberSince;
  document.getElementById('totalPoints').textContent = userData.totalPoints.toLocaleString();
  document.getElementById('userBio').textContent = userData.bio;
  document.getElementById('profileImage').src = userData.avatar;
}

// Update statistics
function updateStats() {
  document.getElementById('itemsListed').textContent = userListings.length;
  document.getElementById('itemsPurchased').textContent = purchasedItems.length;
  document.getElementById('successfulTrades').textContent = tradingHistory.filter(t => t.status === 'completed').length;
  document.getElementById('averageRating').textContent = '4.8';
  document.getElementById('memberLevel').textContent = 'Gold';
  
  const totalSpent = purchasedItems.reduce((sum, item) => sum + item.points, 0);
  const estimatedSavings = Math.round(totalSpent * 0.3); // Assuming 30% savings vs retail
  document.getElementById('savingsAmount').textContent = `$${estimatedSavings}`;
}

// Tab functionality
function showTab(tabName) {
  // Hide all tab contents
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Remove active class from all tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show selected tab content
  document.getElementById(tabName).classList.add('active');
  
  // Add active class to clicked button
  event.target.classList.add('active');
}

// Populate purchased items
function populatePurchasedItems() {
  const container = document.getElementById('purchasedContainer');
  
  if (purchasedItems.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🛒</div>
        <div class="empty-state-title">No Purchases Yet</div>
        <div class="empty-state-text">Start shopping to see your purchased items here!</div>
      </div>
    `;
    return;
  }

  container.innerHTML = purchasedItems.map(item => `
    <div class="item-card">
      <img src="${item.image}" alt="${item.title}" onerror="this.src='../Images/icon.png'">
      <div class="item-info">
        <div class="item-status status-${item.isFavorite ? 'active' : 'sold'}">
          ${item.isFavorite ? 'Favorite' : 'Purchased'}
        </div>
        <div class="item-title">${item.title}</div>
        <div class="item-details">Size: ${item.size} | Condition: ${item.condition} | Seller: ${item.seller}</div>
        <div class="item-price">Points: ${item.points} | Purchased: ${item.purchaseDate}</div>
        <div class="item-actions">
          <button class="action-btn edit-btn" onclick="viewItemDetails(${item.id})">View Details</button>
          <button class="action-btn ${item.isFavorite ? 'delete-btn' : 'edit-btn'}" onclick="toggleFavorite(${item.id})">
            ${item.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Populate trading history
function populateTradingHistory() {
  const container = document.getElementById('tradingContainer');
  
  if (tradingHistory.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔄</div>
        <div class="empty-state-title">No Trading History</div>
        <div class="empty-state-text">Your trading history will appear here once you start trading!</div>
      </div>
    `;
    return;
  }

  container.innerHTML = tradingHistory.map(trade => `
    <div class="trade-card">
      <div class="trade-header">
        <div class="trade-title">${trade.type === 'trade' ? 'Item Trade' : 'Item Sale'}</div>
        <div class="trade-date">${trade.date}</div>
      </div>
      <div class="trade-details">
        <div class="trade-item">
          <img src="${trade.myItem.image}" alt="${trade.myItem.title}" onerror="this.src='../Images/icon.png'">
          <div class="trade-item-info">
            <h4>Your Item</h4>
            <p>${trade.myItem.title}</p>
            <p>${trade.myItem.points} points</p>
          </div>
        </div>
        <div class="trade-arrow">${trade.type === 'trade' ? '⇄' : '→'}</div>
        <div class="trade-item">
          ${trade.theirItem ? `
            <img src="${trade.theirItem.image}" alt="${trade.theirItem.title}" onerror="this.src='../Images/icon.png'">
            <div class="trade-item-info">
              <h4>Their Item</h4>
              <p>${trade.theirItem.title}</p>
              <p>${trade.theirItem.points} points</p>
            </div>
          ` : `
            <div class="trade-item-info">
              <h4>Points Earned</h4>
              <p>+${trade.pointsGained} points</p>
            </div>
          `}
        </div>
      </div>
      <div class="item-actions">
        <span class="item-status status-${trade.status}">${trade.status.charAt(0).toUpperCase() + trade.status.slice(1)}</span>
        <span style="margin-left: auto; color: #7f8c8d;">Partner: ${trade.partner}</span>
      </div>
    </div>
  `).join('');
}

// Populate wishlist
function populateWishlist() {
  const container = document.getElementById('wishlistContainer');
  
  if (wishlistItems.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">❤️</div>
        <div class="empty-state-title">Wishlist is Empty</div>
        <div class="empty-state-text">Add items to your wishlist to save them for later!</div>
      </div>
    `;
    return;
  }

  container.innerHTML = wishlistItems.map(item => `
    <div class="wishlist-item">
      <img src="${item.image}" alt="${item.title}" onerror="this.src='../Images/icon.png'">
      <div class="wishlist-info">
        <div class="wishlist-title">${item.title}</div>
        <div class="wishlist-price">${item.points} points</div>
        <div class="wishlist-actions">
          <button class="action-btn edit-btn" onclick="viewWishlistItem(${item.id})">View</button>
          <button class="action-btn delete-btn" onclick="removeFromWishlist(${item.id})">Remove</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Filter functions
function filterPurchased(filter) {
  // Update filter button states
  document.querySelectorAll('#purchased-items .filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
  
  // Filter logic would go here
  showToast(`Filtering by: ${filter}`, 'info');
}

function filterTrades(filter) {
  // Update filter button states
  document.querySelectorAll('#trading-history .filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
  
  // Filter logic would go here
  showToast(`Filtering by: ${filter}`, 'info');
}

// Action functions
function editProfile() {
  showToast('Profile editing functionality coming soon!', 'info');
}

function viewItemDetails(id) {
  const item = purchasedItems.find(i => i.id === id);
  if (item) {
    showToast(`Viewing details for: ${item.title}`, 'success');
  }
}

function toggleFavorite(id) {
  const item = purchasedItems.find(i => i.id === id);
  if (item) {
    item.isFavorite = !item.isFavorite;
    populatePurchasedItems();
    showToast(`${item.title} ${item.isFavorite ? 'added to' : 'removed from'} favorites`, 'success');
  }
}

function viewWishlistItem(id) {
  const item = wishlistItems.find(i => i.id === id);
  if (item) {
    showToast(`Viewing: ${item.title}`, 'success');
  }
}

function removeFromWishlist(id) {
  const item = wishlistItems.find(i => i.id === id);
  if (item && confirm(`Remove "${item.title}" from wishlist?`)) {
    const index = wishlistItems.indexOf(item);
    wishlistItems.splice(index, 1);
    populateWishlist();
    showToast(`${item.title} removed from wishlist`, 'success');
  }
}

function clearWishlist() {
  if (wishlistItems.length > 0 && confirm('Clear entire wishlist?')) {
    wishlistItems.length = 0;
    populateWishlist();
    showToast('Wishlist cleared', 'success');
  }
}

function addNewListing() {
  showToast('Redirecting to add new listing...', 'info');
  // In a real app, this would redirect to the product detail page
  setTimeout(() => {
    window.location.href = 'prdctdetail.html';
  }, 1000);
  }