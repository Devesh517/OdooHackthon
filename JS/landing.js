 // DOM Elements
 const slider = document.getElementById('slider');
 const slides = document.querySelectorAll('.slide');
 const dots = document.querySelectorAll('.dot');
 const productsContainer = document.getElementById('products');
 const loading = document.getElementById('loading');
 const categories = document.querySelectorAll('.category');

 // Slider variables
 let currentSlide = 0;
 let slideInterval;

// Sample product data with subcategories
const products = [
  // Men's Wear - Shirts
  {
    id: 1,
    name: 'Blue Denim Shirt',
    image: '../Images/denim.jpg',
    size: 'M',
    condition: 'Good',
    points: 50,
    category: 'mens',
    subcategory: 'shirts'
  },
  {
    id: 2,
    name: 'White Formal Shirt',
    image: '../Images/whiteshirt.jpg',
    size: 'L',
    condition: 'Like New',
    points: 45,
    category: 'mens',
    subcategory: 'shirts'
  },
  // Men's Wear - Pants
  {
    id: 3,
    name: 'Black Jeans',
    image: '../Images/blackjeans.jpg',
    size: '32',
    condition: 'Used',
    points: 35,
    category: 'mens',
    subcategory: 'pants'
  },
  {
    id: 4,
    name: 'Khaki Chinos',
    image: '../Images/khakichinos.jpg',
    size: '34',
    condition: 'Good',
    points: 40,
    category: 'mens',
    subcategory: 'pants'
  },
  // Women's Wear - Dresses
  {
    id: 5,
    name: 'Summer Dress',
    image: '../Images/summerdress.jpg',
    size: 'S',
    condition: 'Good',
    points: 45,
    category: 'womens',
    subcategory: 'dresses'
  },
  {
    id: 6,
    name: 'Floral Kurti',
    image: '../Images/floralkurti.jpg',
    size: 'L',
    condition: 'Like New',
    points: 40,
    category: 'womens',
    subcategory: 'dresses'
  },
  // Women's Wear - Tops
  {
    id: 7,
    name: 'Silk Blouse',
    image: '../Images/silkblouse.jpg',
    size: 'M',
    condition: 'Excellent',
    points: 55,
    category: 'womens',
    subcategory: 'tops'
  },
  {
    id: 8,
    name: 'Cotton Top',
    image: '../Images/cottontop.jpg',
    size: 'S',
    condition: 'Good',
    points: 30,
    category: 'womens',
    subcategory: 'tops'
  },
  // Kids - Boys
  {
    id: 9,
    name: 'Kids T-Shirt',
    image: '../Images/kidstshirt.jpg',
    size: 'S',
    condition: 'Good',
    points: 20,
    category: 'kids',
    subcategory: 'boys'
  },
  // Kids - Girls
  {
    id: 10,
    name: 'Princess Dress',
    image: '../Images/princessdress.jpg',
    size: 'XS',
    condition: 'Like New',
    points: 35,
    category: 'kids',
    subcategory: 'girls'
  },
  // Accessories - Bags
  {
    id: 11,
    name: 'Leather Handbag',
    image: '../Images/leatherbag.jpg',
    size: 'One Size',
    condition: 'Good',
    points: 80,
    category: 'accessories',
    subcategory: 'bags'
  },
  // Accessories - Jewelry
  {
    id: 12,
    name: 'Silver Necklace',
    image: '../Images/silverneclace.jpg',
    size: 'One Size',
    condition: 'Excellent',
    points: 60,
    category: 'accessories',
    subcategory: 'jewelry'
  },
  // Winter - Jackets
  {
    id: 13,
    name: 'Winter Hoodie',
    image: '../Images/winterhoddie.jpg',
    size: 'XL',
    condition: 'Excellent',
    points: 60,
    category: 'winter',
    subcategory: 'jackets'
  },
  {
    id: 14,
    name: 'Wool Jacket',
    image: '../Images/wooljacket.jpg',
    size: 'L',
    condition: 'Good',
    points: 70,
    category: 'winter',
    subcategory: 'jackets'
  },
  // Winter - Sweaters
  {
    id: 15,
    name: 'Knit Sweater',
    image: '../Images/knittedsweater.jpg',
    size: 'M',
    condition: 'Like New',
    points: 50,
    category: 'winter',
    subcategory: 'sweaters'
  },
  // Summer - Shorts
  {
    id: 16,
    name: 'Denim Shorts',
    image: '../Images/denimshorts.jpg',
    size: '32',
    condition: 'Good',
    points: 35,
    category: 'summer',
    subcategory: 'shorts'
  },
  // Summer - T-Shirts
  {
    id: 17,
    name: 'Casual T-Shirt',
    image: '../Images/casualt-shirt.jpg',
    size: 'M',
    condition: 'Like New',
    points: 30,
    category: 'summer',
    subcategory: 'tshirts'
  },
  {
    id: 18,
    name: 'Graphic T-Shirt',
    image: '../Images/graphict-shirt.jpg',
    size: 'L',
    condition: 'Good',
    points: 25,
    category: 'summer',
    subcategory: 'tshirts'
  }
];

let filteredProducts = [...products];
let currentCategory = 'all';
let currentSubcategory = 'all';

 // Initialize the page
 document.addEventListener('DOMContentLoaded', function() {
   populateProducts();
   startAutoSlide();
   setupEventListeners();
 });

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
    icon: "👔",
    subcategories: [
      { id: 'shirts', name: 'Shirts', icon: '👕' },
      { id: 'pants', name: 'Pants', icon: '👖' }
    ]
  },
  womens: {
    name: "Women's Wear",
    icon: "👗",
    subcategories: [
      { id: 'dresses', name: 'Dresses', icon: '👗' },
      { id: 'tops', name: 'Tops', icon: '👚' }
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
      { id: 'sweaters', name: 'Sweaters', icon: '🧶' }
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

// Populate subcategories grid
function populateSubcategories(category) {
  const subcategoriesGrid = document.getElementById('subcategoriesGrid');
  const subcategories = categoryData[category].subcategories;
  
  subcategoriesGrid.innerHTML = subcategories.map(sub => `
    <div class="subcategory-card" onclick="selectSubcategory('${category}', '${sub.id}')">
      <span class="subcategory-icon">${sub.icon}</span>
      <div class="subcategory-name">${sub.name}</div>
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
    product.category === category && product.subcategory === subcategory
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
  populateProducts();
  
  // Scroll to categories
  document.getElementById('categories').scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  });
  
  showToast('Showing all categories', 'success');
}

 // Populate products
 function populateProducts() {
   if (filteredProducts.length === 0) {
     productsContainer.innerHTML = `
       <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #7f8c8d;">
         <div style="font-size: 48px; margin-bottom: 15px;">🔍</div>
         <div style="font-size: 18px;">No products found</div>
         <div style="font-size: 14px; margin-top: 10px;">Try adjusting your category filter</div>
       </div>
     `;
     return;
   }

  productsContainer.innerHTML = filteredProducts.map(product => `
    <div class="product" onclick="viewProduct(${product.id})">
      <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='../Images/icon.png'">
      <div class="product-title">${product.name}</div>
      <div class="product-details">Size: ${product.size} | Condition: ${product.condition}</div>
      <div class="product-points">Points: ${product.points}</div>
      <button class="view-btn">View Details</button>
      </div>
  `).join('');
}

 // View product details
 function viewProduct(productId) {
   const product = products.find(p => p.id === productId);
   if (product) {
     showToast(`Opening ${product.name}...`, 'success');
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
     populateProducts();
   }, 1500);
 }

 // Initialize with loading effect
 simulateLoading();
