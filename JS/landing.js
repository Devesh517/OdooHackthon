 // DOM Elements
  const slider = document.getElementById('slider');
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const grid = document.getElementById('products');
  const productsContainer = document.getElementById('products');
  const loading = document.getElementById('loading');
  const categories = document.querySelectorAll('.category');
  let currentPage = 0;
  let productsPerPage = 6;
  
  let products = [];

  let displayedProducts = [];

  let filteredProducts = [];

 // Slider variables
let currentSlide = 0;
let slideInterval;

let currentCategory = 'all';
let currentSubcategory = 'all';

 // Initialize the page
  document.addEventListener('DOMContentLoaded', function() {
    loadMarketplaceProducts();
    startAutoSlide();
    setupEventListeners();
});
  async function loadMarketplaceProducts() {
    try {
        const token =
            localStorage.getItem("token");
        const response = await fetch(
            "http://localhost:8080/api/listings/feed",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        if (!response.ok) {
            throw new Error("Failed to load products");
        }
        const data = await response.json();
        // Store globally
        products = data;
        displayedProducts = [...products];
        filteredProducts = [...products];
        renderProducts();
    } catch(error) {
        console.error(error);
    }
}
 // Setup event listeners
  function setupEventListeners() {
   // Keyboard navigation for slider
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
      }
    });
   // Touch/swipe support for slider
  let startX = 0;
  let endX = 0;
  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });
    slider.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = startX - endX;
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
         changeSlide(1); // Swipe left
        } else {
         changeSlide(-1); // Swipe right
        }
      }
    }
  }

 // Slider functions
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      dots[i].classList.remove('active');
    });
  slides[index].classList.add('active');
  dots[index].classList.add('active');
  currentSlide = index;
   // Update slides transform
  const slidesContainer = document.getElementById('slides');
   slidesContainer.style.transform = `translateX(-${index * 33.333}%)`;
  }

  function changeSlide(direction) {
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  function startAutoSlide() {
    slideInterval = setInterval(() => {
      changeSlide(1);
    }, 5000);
  }

  function stopAutoSlide() {
    clearInterval(slideInterval);
  }

// Category data with subcategories
const categoryData = {
  mens: {
    name: "Men's Wear",
    icon: "../Images/facebook.png",
    subcategories: [
      { id: 'shirts', name: 'Shirts', icon: '../Images/icons8-mens-hoodie-50.png' },
      { id: 'pants', name: 'Pants', icon: '../Images/icons8-chrome.gif' }
    ]
  },
  womens: {
    name: "Women's Wear",
    icon: "👗",
    subcategories: [
      { id: 'dresses', name: 'Dresses', icon: '../Images/cloth.png' },
      { id: 'tops', name: 'Tops', icon: '../Images/facebook.png' }
    ]
  },
  kids: {
    name: "Kids",
    icon: "👶",
    subcategories: [
      { id: 'boys', name: 'Boys', icon: '👦' },
      { id: 'girls', name: 'Girls', icon: '👧' }
    ]
  },
  accessories: {
    name: "Accessories",
    icon: "👜",
    subcategories: [
      { id: 'bags', name: 'Bags', icon: '👜' },
      { id: 'jewelry', name: 'Jewelry', icon: '💍' }
    ]
  },
  winter: {
    name: "Winter",
    icon: "❄️",
    subcategories: [
      { id: 'jackets', name: 'Jackets', icon: '🧥' },
      { id: 'sweaters', name: 'Sweaters', icon: '🧶'},
      { id: 'hoodies', name: 'Hoodies', icon: '🧶' }
    ]
  },
  summer: {
    name: "Summer",
    icon: "☀️",
    subcategories: [
      { id: 'shorts', name: 'Shorts', icon: '🩳' },
      { id: 'tshirts', name: 'T-Shirts', icon: '👕' }
    ]
  }
};

// Select category and show subcategories section
function selectCategory(category) {
  currentCategory = category;
  currentSubcategory = 'all';
  // Hide main categories and show selected category section
  document.getElementById('categories').style.display = 'none';
  document.getElementById('selectedCategorySection').style.display = 'block';
  // Update category title
  document.getElementById('selectedCategoryTitle').textContent = categoryData[category].name;
  // Populate subcategories
  populateSubcategories(category);
  // Show all products for this category
  filteredProducts = products.filter(product => product.category === category);
  populateCategoryProducts();
  // Scroll to the new section
  document.getElementById('selectedCategorySection').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
  showToast(`Showing ${categoryData[category].name}`, 'success');
}

function populateCategoryProducts() {
    const categoryProducts =
        document.getElementById('categoryProducts');
    if (filteredProducts.length === 0) {
        categoryProducts.innerHTML = `
            <div style="
                grid-column: 1 / -1;
                text-align: center;
                padding: 40px;
                color: #7f8c8d;
            ">
                <div style="
                    font-size: 48px;
                    margin-bottom: 15px;
                ">
                    🔍
                </div>
                <div style="font-size: 18px;">
                    No products found
                </div>
            </div>
        `;
        return;
    }
    categoryProducts.innerHTML =
        filteredProducts.map(product => `
        <div class="product"
              onclick="viewProduct(${product.id})">

            <img src="${product.imageUrl}"
                  alt="${product.title}"
                  class="product-image"
                  onerror="this.src='../Images/icon.png'">
            <div class="product-title">
                ${product.title}
            </div>
            <div class="product-details">
                Size: ${product.size}
            </div>
            <div class="product-details">
                Condition: ${product.conditionType}
            </div>
            <div class="product-details">
                Category: ${product.category}
            </div>
            <div class="product-points">
                ${product.points} Points
            </div>
            <button class="view-btn">
                View Details
            </button>
        </div>
    `).join('');
}

// Select subcategory
function selectSubcategory(category, subcategory) {
  currentSubcategory = subcategory;
  // Update active subcategory
  document.querySelectorAll('.subcategory-card').forEach(card => {
    card.classList.remove('active');
  });
  event.target.closest('.subcategory-card').classList.add('active');
  // Filter products by subcategory
  filteredProducts = products.filter(product =>
    product.category === category
);
  populateCategoryProducts();
  showToast(`Showing ${categoryData[category].name} - ${subcategory}`, 'success');
}

// Populate products in category section
function populateCategoryProducts() {
  const categoryProducts = document.getElementById('categoryProducts');
  if (filteredProducts.length === 0) {
    categoryProducts.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #7f8c8d;">
        <div style="font-size: 48px; margin-bottom: 15px;">🔍</div>
        <div style="font-size: 18px;">No products found</div>
        <div style="font-size: 14px; margin-top: 10px;">Try selecting a different subcategory</div>
      </div>
    `;
    return;
  }
  categoryProducts.innerHTML = filteredProducts.map(product => `
    <div class="product" onclick="viewProduct(${product.id})">
      <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='../Images/icon.png'">
      <div class="product-title">${product.name}</div>
      <div class="product-details">Size: ${product.size} | Condition: ${product.condition}</div>
      <div class="product-points">Points: ${product.points}</div>
      <button class="view-btn">View Details</button>
    </div>
  `).join('');
}

// Go back to all categories
function goBackToAllCategories() {
  currentCategory = 'all';
  currentSubcategory = 'all';
  // Show main categories and hide selected category section
  document.getElementById('categories').style.display = 'grid';
  document.getElementById('selectedCategorySection').style.display = 'none';
  // Reset to show all products
  filteredProducts = [...products];
  renderProducts();
  // Scroll to categories
  document.getElementById('categories').scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  });
  showToast('Showing all categories', 'success');
}

 // Populate product
function renderProducts(append = false) {
    const grid = document.getElementById('products');
    const startIndex = currentPage * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow =
        displayedProducts.slice(startIndex, endIndex);
    // Clear old products
    if (!append) {
        grid.innerHTML = '';
    }
    // No products found
    if (productsToShow.length === 0) {
        grid.innerHTML = `
            <div class="no-products">
                <h3>No Products Found</h3>
                <p>
                    No approved products available right now.
                </p>
            </div>
        `;
        return;
    }
    // Render products
    productsToShow.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product';
        card.innerHTML = `
            <img src="${product.imageUrl}"
                  class="product-image"
                  alt="${product.title}"
                  onerror="this.src='../Images/icon.png'"
                  onclick="viewProduct(${product.id})">
            <div class="product-title">
                ${product.title}
            </div>
            <div class="product-details">
                Size: ${product.size}
            </div>
            <div class="product-details">
                Condition: ${product.conditionType}
            </div>
            <div class="product-details">
                Category: ${product.category}
            </div>
            <div class="product-points">
                ${product.points} Points
            </div>
            <button class="view-btn"
                onclick="viewProduct(${product.id})">
                View Details
            </button>
        `;
        grid.appendChild(card);
    });

    // Load More Button Logic
    const loadMoreBtn =
        document.getElementById('loadMoreBtn');
    if (endIndex >= displayedProducts.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}
function loadMoreProducts() {
  currentPage++;
  renderProducts(true);
}
 // View product details
  function viewProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
      showToast(`Opening ${product.title}...`, 'success');
     // Here you would typically navigate to a product detail page
      setTimeout(() => {
        window.location.href = `prdctdetail.html?id=${productId}`;
      }, 1000);
    }
  }
 // Pause auto-slide when hovering over slider
  slider.addEventListener('mouseenter', stopAutoSlide);
  slider.addEventListener('mouseleave', startAutoSlide);
 // Add loading simulation
  function simulateLoading() {
  loading.style.display = 'block';
  setTimeout(() => {
    loading.style.display = 'none';
    renderProducts(); // ✅ correct
  }, 1500);
}
 // Initialize with loading effect
  simulateLoading();
