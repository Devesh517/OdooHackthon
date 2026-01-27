function goToAddItem() {
  window.location.href = '../Folder/aa.html';
}

// Read data when coming back
document.addEventListener('DOMContentLoaded', () => {
  const data = sessionStorage.getItem('itemData');

  if (data) {
    const item = JSON.parse(data);
    showItem(item);

    // Clear after showing once
    sessionStorage.removeItem('itemData');
  }
});

function showItem(item) {
  const box = document.getElementById('result');

  box.innerHTML = `
    <h3>📦 Item Added</h3>
    <p><strong>Item Name:</strong> ${item.name}</p>
    <p><strong>Points:</strong> ${item.points}</p>
    <p><strong>Category:</strong> ${item.category}</p>
  `;
}
