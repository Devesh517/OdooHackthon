// Sample product data (using IDs 101-105 to avoid conflicts with landing page products)
const allProducts = [
  { id: 101, title: "Denim Jacket",  category: "men", size: "L", condition: "Excellent", points: 150, badge: "New", image: "../Images/denim.jpg" },
  { id: 5, title: "Summer Dress",  category: "women", size: "M", condition: "Good", points: 120, image: "../Images/summerdress.jpg" },
  { id: 9, title: "Kids T-Shirt", category: "kids", size: "S", condition: "Like New", points: 80, image: "../Images/kidstshirt.jpg" },
  { id: 11, title: "Leather Bag", category: "accessories", size: "One Size", condition: "Good", points: 200, badge: "Premium", image: "../Images/leatherbag.jpg" },
  { id: 102, title: "Winter Coat", category: "winter", size: "XL", condition: "Excellent", points: 250, image: "../Images/wintercoat.jpg" },
  { id: 103, title: "Beach Shorts", category: "summer", size: "M", condition: "Good", points: 90, image: "../Images/beachshorts.jpg" },
  { id: 104, title: "Formal Shirt", category: "men", size: "L", condition: "Like New", points: 110, image: "../Images/formalshirt.jpg" },
  { id: 105, title: "Sneakers", category: "accessories", size: "42", condition: "Good", points: 180, badge: "Popular", image: "../Images/sneakers.jpg" },
];

let displayedProducts = [];
let currentFilter = 'all';
let productsPerPage = 6;
let currentPage = 0;

// Initialize page
function initializePage() {
  displayedProducts = [...allProducts];
  renderProducts();
}

// Render products
function renderProducts(append = false) {
  const grid = document.getElementById('product-grid');
  const startIndex = append ? currentPage * productsPerPage : 0;
  const endIndex = append ? (currentPage + 1) * productsPerPage : productsPerPage;
  const productsToShow = displayedProducts.slice(startIndex, endIndex);

  if (!append) {
    grid.innerHTML = '';
    currentPage = 0;
  }

  if (productsToShow.length === 0 && !append) {
    document.getElementById('noProducts').style.display = 'block';
    document.getElementById('loadMoreBtn').style.display = 'none';
    return;
  } else {
    document.getElementById('noProducts').style.display = 'none';
  }

  productsToShow.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
      <img src="${product.image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect width="200" height="200" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3EProduct Image%3C/text%3E%3C/svg%3E'}" alt="${product.title}" class="product-image">
      <h3 class="product-title">${product.title}</h3>
      <div class="product-details">
        <span class="product-size">Size: ${product.size}</span>
        <span class="product-condition">${product.condition}</span>
      </div>
      <div class="product-points">${product.points} Points</div>
      <div class="product-actions">
        <button class="view-btn" onclick="viewProduct(${product.id})">View Details</button>
        <button class="wishlist-btn" onclick="toggleWishlist(${product.id}, this)">♥</button>
      </div>
    `;
    grid.appendChild(card);
  });

  // Show/hide load more button
  const hasMore = (currentPage + 1) * productsPerPage < displayedProducts.length;
  document.getElementById('loadMoreBtn').style.display = hasMore ? 'block' : 'none';
}

// Filter products
function filterProducts(button, filter) {
  // Update active button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  button.classList.add('active');

  currentFilter = filter;
  
  if (filter === 'all') {
    displayedProducts = [...allProducts];
  } else {
    displayedProducts = allProducts.filter(product => 
      product.category === filter || 
      (filter === 'winter' && product.title.toLowerCase().includes('winter')) ||
      (filter === 'summer' && product.title.toLowerCase().includes('summer'))
    );
  }

  renderProducts();
}

// Search products
function searchProducts() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  
  if (searchTerm === '') {
    displayedProducts = currentFilter === 'all' ? [...allProducts] : 
      allProducts.filter(p => p.category === currentFilter);
  } else {
    displayedProducts = allProducts.filter(product => 
      product.title.toLowerCase().includes(searchTerm) &&
      (currentFilter === 'all' || product.category === currentFilter)
    );
  }

  renderProducts();
}

// Sort products
function sortProducts() {
  const sortValue = document.getElementById('sortSelect').value;
  
  switch(sortValue) {
    case 'newest':
      displayedProducts.sort((a, b) => b.id - a.id);
      break;
    case 'points-high':
      displayedProducts.sort((a, b) => b.points - a.points);
      break;
    case 'points-low':
      displayedProducts.sort((a, b) => a.points - b.points);
      break;
    case 'name':
      displayedProducts.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }

  renderProducts();
}

// Load more products
function loadMoreProducts() {
  currentPage++;
  renderProducts(true);
}

// View product details
function viewProduct(productId) {
  console.log('Viewing product:', productId);
  const product = allProducts.find(p => p.id === productId);
  if (product) {
    showToast(`Opening ${product.title}...`, 'success');
     // Here you would typically navigate to a product detail page
    setTimeout(() => {
      window.location.href = `prdctdetail.html?id=${productId}`;
    }, 1000);
  }
}

// Toggle wishlist
function toggleWishlist(productId, button) {
  button.classList.toggle('active');
  if (button.classList.contains('active')) {
    button.style.background = 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)';
    button.style.color = 'white';
  } else {
    button.style.background = 'rgba(231, 76, 60, 0.1)';
    button.style.color = '#e74c3c';
  }
}

// Add search on enter key
document.getElementById('searchInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    searchProducts();
  }
});

// Initialize on load
document.addEventListener('DOMContentLoaded', initializePage);
