
// Check if we're viewing an existing product or creating a new one
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
const isEditMode = urlParams.get('edit') === 'true';

// Unified product data from all pages
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
    subcategory: 'shirts',
    description: 'A stylish blue denim shirt in excellent condition. Perfect for casual wear and goes well with any outfit.'
  },
  {
    id: 2,
    name: 'White Formal Shirt',
    image: '../Images/whiteshirt.jpg',
    size: 'L',
    condition: 'Like New',
    points: 45,
    category: 'mens',
    subcategory: 'shirts',
    description: 'Professional white formal shirt, barely worn.'
  },
  {
    id: 3,
    name: 'Black Jeans',
    image: '../Images/blackjeans.jpg',
    size: '32',
    condition: 'Used',
    points: 35,
    category: 'mens',
    subcategory: 'pants',
    description: 'Comfortable black jeans in good used condition.'
  },
  {
    id: 4,
    name: 'Khaki Chinos',
    image: '../Images/khakichinos.jpg',
    size: '34',
    condition: 'Good',
    points: 40,
    category: 'mens',
    subcategory: 'pants',
    description: 'Versatile khaki chinos for any occasion.'
  },
  {
    id: 5,
    name: 'Summer Dress',
    image: '../Images/summerdress.jpg',
    size: 'S',
    condition: 'Good',
    points: 45,
    category: 'womens',
    subcategory: 'dresses',
    description: 'Light and breezy summer dress, perfect for warm weather.'
  },
  {
    id: 6,
    name: 'Floral Kurti',
    image: '../Images/floralkurti.jpg',
    size: 'L',
    condition: 'Like New',
    points: 40,
    category: 'womens',
    subcategory: 'dresses',
    description: 'Beautiful floral kurti, barely worn. Traditional yet modern design.'
  },
  {
    id: 7,
    name: 'Silk Blouse',
    image: '../Images/silkblouse.jpg',
    size: 'M',
    condition: 'Excellent',
    points: 55,
    category: 'womens',
    subcategory: 'tops',
    description: 'Elegant silk blouse in excellent condition.'
  },
  {
    id: 8,
    name: 'Cotton Top',
    image: '../Images/cottontop.jpg',
    size: 'S',
    condition: 'Good',
    points: 30,
    category: 'womens',
    subcategory: 'tops',
    description: 'Comfortable cotton top for everyday wear.'
  },
  {
    id: 9,
    name: 'Kids T-Shirt',
    image: '../Images/kidstshirt.jpg',
    size: 'S',
    condition: 'Good',
    points: 20,
    category: 'kids',
    subcategory: 'boys',
    description: 'Fun kids t-shirt with vibrant colors.'
  },
  {
    id: 10,
    name: 'Princess Dress',
    image: '../Images/princessdress.jpg',
    size: 'XS',
    condition: 'Like New',
    points: 35,
    category: 'kids',
    subcategory: 'girls',
    description: 'Adorable princess dress for special occasions.'
  },
  {
    id: 11,
    name: 'Leather Handbag',
    image: '../Images/leatherbag.jpg',
    size: 'One Size',
    condition: 'Good',
    points: 80,
    category: 'accessories',
    subcategory: 'bags',
    description: 'Genuine leather handbag with multiple compartments.'
  },
  {
    id: 12,
    name: 'Silver Necklace',
    image: '../Images/silverneclace.jpg',
    size: 'One Size',
    condition: 'Excellent',
    points: 60,
    category: 'accessories',
    subcategory: 'jewelry',
    description: 'Beautiful silver necklace, minimalist design.'
  },
  {
    id: 13,
    name: 'Winter Hoodie',
    image: '../Images/winterhoddie.jpg',
    size: 'XL',
    condition: 'Excellent',
    points: 60,
    category: 'winter',
    subcategory: 'jackets',
    description: 'Warm winter hoodie for cold days.'
  },
  {
    id: 14,
    name: 'Wool Jacket',
    image: '../Images/wooljacket.jpg',
    size: 'L',
    condition: 'Good',
    points: 70,
    category: 'winter',
    subcategory: 'jackets',
    description: 'Classic wool jacket in excellent condition.'
  },
  {
    id: 15,
    name: 'Knit Sweater',
    image: '../Images/knittedsweater.jpg',
    size: 'M',
    condition: 'Like New',
    points: 50,
    category: 'winter',
    subcategory: 'sweaters',
    description: 'Cozy knit sweater, barely worn.'
  },
  {
    id: 16,
    name: 'Denim Shorts',
    image: '../Images/denimshorts.jpg',
    size: '32',
    condition: 'Good',
    points: 35,
    category: 'summer',
    subcategory: 'shorts',
    description: 'Comfortable denim shorts for summer.'
  },
  {
    id: 17,
    name: 'Casual T-Shirt',
    image: '../Images/casualt-shirt.jpg',
    size: 'M',
    condition: 'Like New',
    points: 30,
    category: 'summer',
    subcategory: 'tshirts',
    description: 'Versatile casual t-shirt in great condition.'
  },
  {
    id: 18,
    name: 'Graphic T-Shirt',
    image: '../Images/graphict-shirt.jpg',
    size: 'L',
    condition: 'Good',
    points: 25,
    category: 'summer',
    subcategory: 'tshirts',
    description: 'Trendy graphic t-shirt with cool design.'
  },
  // Product page items (IDs 1-8 in product.js, remapped to avoid conflicts)
  {
    id: 101,
    name: 'Denim Jacket',
    image: '../Images/denim.jpg',
    size: 'L',
    condition: 'Excellent',
    points: 150,
    category: 'mens',
    subcategory: 'jackets',
    description: 'Stylish denim jacket in excellent condition. Perfect for any casual outfit.'
  },
  {
    id: 102,
    name: 'Winter Coat',
    image: '../Images/wintercoat.jpg',
    size: 'XL',
    condition: 'Excellent',
    points: 250,
    category: 'winter',
    subcategory: 'coats',
    description: 'Premium winter coat, excellent condition.'
  },
  {
    id: 103,
    name: 'Beach Shorts',
    image: '../Images/beachshorts.jpg',
    size: 'M',
    condition: 'Good',
    points: 90,
    category: 'summer',
    subcategory: 'shorts',
    description: 'Comfortable beach shorts for summer activities.'
  },
  {
    id: 104,
    name: 'Formal Shirt',
    image: '../Images/formalshirt.jpg',
    size: 'L',
    condition: 'Like New',
    points: 110,
    category: 'mens',
    subcategory: 'shirts',
    description: 'Professional formal shirt, like new condition.'
  },
  {
    id: 105,
    name: 'Sneakers',
    image: '../Images/sneakers.jpg',
    size: '42',
    condition: 'Good',
    points: 180,
    category: 'accessories',
    subcategory: 'footwear',
    description: 'Quality sneakers in good condition.'
  }
];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  if (productId) {
    // View existing product
    showProductView();
    loadProductData();
  } else {
    // Create new product
    showUploadView();
  }
  
  setupFormHandling();
});

// Show product view
function showProductView() {
  document.getElementById('productInfo').style.display = 'block';
  document.getElementById('uploadSection').style.display = 'none';
}

// Show upload view
function showUploadView() {
  document.getElementById('productInfo').style.display = 'none';
  document.getElementById('uploadSection').style.display = 'grid';
}

// Load product data
function loadProductData() {
  // ✅ Find the product by ID from URL
  const product = products.find(p => p.id === parseInt(productId));
  
  // Handle case where product is not found
  if (!product) {
    showToast('Product not found', 'error');
    setTimeout(() => {
      window.location.href = 'landing.html';
    }, 2000);
    return;
  }
  
  document.getElementById('productImage').src = product.image;
  document.getElementById('productTitle').textContent = product.name;
  document.getElementById('productMeta').textContent = `Posted by Seller • ${new Date().toLocaleDateString()}`;
  
  document.getElementById('productDetails').innerHTML = `
    <div class="detail-item">
      <div class="detail-label">Category</div>
      <div class="detail-value">${getCategoryName(product.category)}</div>
    </div>
    <div class="detail-item">
      <div class="detail-label">Size</div>
      <div class="detail-value">${product.size}</div>
    </div>
    <div class="detail-item">
      <div class="detail-label">Condition</div>
      <div class="detail-value">${product.condition}</div>
    </div>
    <div class="detail-item">
      <div class="detail-label">Points Value</div>
      <div class="detail-value">${product.points} points</div>
    </div>
  `;
  
  document.getElementById('productDescription').textContent = product.description || 'No description available.';
}


// Get category name
function getCategoryName(category) {
  const categories = {
    'mens': "Men's Wear",
    'womens': "Women's Wear",
    'kids': 'Kids',
    'accessories': 'Accessories',
    'winter': 'Winter',
    'summer': 'Summer'
  };
  return categories[category] || category;
}

// Setup form handling
function setupFormHandling() {
  const form = document.getElementById('productForm');
  
  if (!form) {
    console.error('Form with id "productForm" not found');
    showToast('Form not found. Please check the page.', 'error');
    return;
  }
  
  form.addEventListener('submit', handleFormSubmit);
}

// Handle form submission
function handleFormSubmit(e) {
  e.preventDefault();
  
  console.log('Form submitted');
  
  const form = document.getElementById('productForm');
  
  if (!form) {
    showToast('Error: Form not found', 'error');
    return;
  }
  
  const formData = new FormData(form);
  const productData = {
    name: formData.get('productName'),
    category: formData.get('category'),
    size: formData.get('size'),
    condition: formData.get('condition'),
    description: formData.get('description')
  };
  
  console.log('Form Data:', productData);
  
  // Validate form
  if (!validateForm(productData)) {
    return;
  }
  
  // Submit product
  submitProduct(productData);
}

// Validate form
function validateForm(data) {
  console.log('Validating form...', data);
  
  if (!data.name || !data.name.trim()) {
    showToast('Please enter a product name', 'error');
    return false;
  }
  
  if (!data.category) {
    showToast('Please select a category', 'error');
    return false;
  }
  
  if (!data.size) {
    showToast('Please select a size', 'error');
    return false;
  }
  
  if (!data.condition) {
    showToast('Please select a condition', 'error');
    return false;
  }
  
  if (!data.description || !data.description.trim()) {
    showToast('Please enter a description', 'error');
    return false;
  }
  
  console.log('Form validation passed');
  return true;
}

// Submit product
async function submitProduct(data) {

    const token = localStorage.getItem("token");

    const listingData = {
        title: data.name,
        category: data.category,
        size: data.size,
        conditionType: data.condition,
        points: 0,
        description: data.description,
        imageUrl: document.getElementById("previewImage").src
    };

    try {

        const response = await fetch("http://localhost:8080/api/listings/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(listingData)
        });

        if (!response.ok) {
            throw new Error("Failed to save listing");
        }

        showToast("Listing added successfully!", "success");

        setTimeout(() => {
            window.location.href = "user.html";
        }, 1500);

    } catch (error) {
        console.error(error);
        showToast("Error saving listing", "error");
    }
}

// Trigger file upload
function triggerFileUpload() {
  document.getElementById('imageUpload').click();
}

// Handle image upload
function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const previewImage = document.getElementById('previewImage');
      const uploadIcon = document.getElementById('uploadIcon');
      const uploadText = document.getElementById('uploadText');
      
      previewImage.src = e.target.result;
      previewImage.style.display = 'block';
      uploadIcon.style.display = 'none';
      uploadText.textContent = 'Image uploaded successfully';
    };
    reader.readAsDataURL(file);
  }
}

// Action functions
function initiateTrade() {
  showToast('Trade initiation feature coming soon!', 'info');
}

function contactSeller() {
  showToast('Contact feature coming soon!', 'info');
}

// Drag and drop functionality
const uploadBox = document.querySelector('.upload-box');

uploadBox.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadBox.style.borderColor = '#2980b9';
  uploadBox.style.background = 'linear-gradient(135deg, rgba(52, 152, 219, 0.1) 0%, rgba(52, 152, 219, 0.15) 100%)';
});

uploadBox.addEventListener('dragleave', (e) => {
  e.preventDefault();
  uploadBox.style.borderColor = '#3498db';
  uploadBox.style.background = 'linear-gradient(135deg, rgba(52, 152, 219, 0.05) 0%, rgba(52, 152, 219, 0.1) 100%)';
});

uploadBox.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadBox.style.borderColor = '#3498db';
  uploadBox.style.background = 'linear-gradient(135deg, rgba(52, 152, 219, 0.05) 0%, rgba(52, 152, 219, 0.1) 100%)';
  
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    const file = files[0];
    if (file.type.startsWith('image/')) {
      const input = document.getElementById('imageUpload');
      input.files = files;
      handleImageUpload({ target: { files: [file] } });
    } else {
      showToast('Please upload an image file', 'error');
    }
  }
});