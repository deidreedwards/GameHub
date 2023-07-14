// Add JavaScript code for button click event

window.addEventListener('DOMContentLoaded', (event) => {
    const container = document.querySelector('.container');
    container.style.opacity = 1; // Ensures the fade-in animation doesn't happen on page refresh
  });
  
  const btn = document.querySelector('.btn');
  btn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevents the default link behavior
    const container = document.querySelector('.container');
    container.style.animation = 'fade-out 1s forwards';
    
    // Redirect to GameHub page after the fade-out animation finishes
    setTimeout(() => {
      window.location.href = 'gamehub.html';
    }, 1000);
  });
  