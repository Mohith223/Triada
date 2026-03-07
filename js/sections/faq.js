// Using Event Delegation to support dynamic HTML loading
document.addEventListener('click', (event) => {
  // 1. Check if the click happened on (or inside) an FAQ button
  const button = event.target.closest('.faq-question');
  if (!button) return; // If not, ignore the click

  // 2. Find the specific FAQ item container that was clicked
  const currentItem = button.closest('.faq-item');
  if (!currentItem) return;

  const isCurrentlyActive = currentItem.classList.contains('active');
  
  // 3. Find all FAQ items currently on the page and close them
  const allItems = document.querySelectorAll('.faq-item');
  allItems.forEach(item => {
    item.classList.remove('active');
    const btn = item.querySelector('.faq-question');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  });

  // 4. If the clicked item wasn't already open, open it now
  if (!isCurrentlyActive) {
    currentItem.classList.add('active');
    button.setAttribute('aria-expanded', 'true');
  }
});