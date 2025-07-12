
  function showSection(id) {
    
    document.querySelectorAll('.section').forEach(section => {
      section.style.display = 'none';
    });
    document.getElementById(id).style.display = 'block';
  }
  window.onload = function () {
    showSection('user'); 
  };

