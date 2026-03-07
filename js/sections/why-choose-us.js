document.addEventListener('click', (event) => {
  const toggleBtn = event.target.closest('#wcu-toggle-btn');
  if (!toggleBtn) return; 

  const wrapper = document.getElementById('wcu-wrapper');
  if (!wrapper) return;

  const updateLayout = () => {
    wrapper.classList.toggle('is-expanded');
    
    const isExpanded = wrapper.classList.contains('is-expanded');
    toggleBtn.setAttribute('aria-expanded', isExpanded);
  };

  if (document.startViewTransition) {
    document.startViewTransition(updateLayout);
  } else {
    updateLayout();
  }
});