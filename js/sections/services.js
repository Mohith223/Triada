// Keep track of the current view and the timer
let currentView = 'companies';
let autoToggleTimer;
const TOGGLE_INTERVAL = 7000; // 7000 milliseconds = 7 seconds

// 1. The core function that handles the visual switching
function applyToggleView(view) {
  const toggleContainer = document.querySelector('.toggle-container');
  const gridCompanies = document.getElementById('grid-companies');
  const gridTalent = document.getElementById('grid-talent');
  const btnCompanies = document.getElementById('btn-companies');
  const btnTalent = document.getElementById('btn-talent');
  const ctaBtn = document.getElementById('cta-btn');

  // Safeguard: If elements don't exist yet, do nothing
  if (!gridCompanies || !gridTalent || !btnCompanies || !btnTalent) return;

  if (view === 'companies') {
    // Update Buttons
    btnCompanies.classList.add('active');
    btnCompanies.setAttribute('aria-selected', 'true');
    btnTalent.classList.remove('active');
    btnTalent.setAttribute('aria-selected', 'false');
    
    // Slide Pill Left
    toggleContainer.classList.remove('talent-active');
    
    // Swap Grids
    gridCompanies.classList.add('active-grid');
    gridTalent.classList.remove('active-grid');
    
    // Update CTA
    if (ctaBtn) {
      ctaBtn.textContent = 'Explore All Services';
      ctaBtn.href = 'html/pages/services.html';
    }
    
    currentView = 'companies';
    
  } else if (view === 'talent') {
    // Update Buttons
    btnTalent.classList.add('active');
    btnTalent.setAttribute('aria-selected', 'true');
    btnCompanies.classList.remove('active');
    btnCompanies.setAttribute('aria-selected', 'false');
    
    // Slide Pill Right
    toggleContainer.classList.add('talent-active');
    
    // Swap Grids
    gridTalent.classList.add('active-grid');
    gridCompanies.classList.remove('active-grid');
    
    // Update CTA
    if (ctaBtn) {
      ctaBtn.textContent = 'View Open Roles';
      ctaBtn.href = 'html/pages/careers.html';
    }
    
    currentView = 'talent';
  }
}

// 2. Timer management functions
function startAutoToggle() {
  // Clear any existing timer just to be safe
  clearInterval(autoToggleTimer);
  
  // Start a new interval
  autoToggleTimer = setInterval(() => {
    const nextView = currentView === 'companies' ? 'talent' : 'companies';
    applyToggleView(nextView);
  }, TOGGLE_INTERVAL);
}

function resetAutoToggle() {
  // If the user clicks manually, restart the clock so it doesn't switch on them immediately
  clearInterval(autoToggleTimer);
  startAutoToggle();
}

// 3. Listen for manual clicks via Event Delegation
document.addEventListener('click', (event) => {
  const btn = event.target.closest('.toggle-btn');
  if (!btn) return; // Ignore clicks that aren't on the toggle buttons

  const targetView = btn.id === 'btn-companies' ? 'companies' : 'talent';
  
  // Only trigger if they clicked the button that isn't already active
  if (targetView !== currentView) {
    applyToggleView(targetView);
    resetAutoToggle(); // Pause and restart the auto-rotation
  }
});

// 4. Initialize the automatic rotation once the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Start the automated loop
  startAutoToggle();
});