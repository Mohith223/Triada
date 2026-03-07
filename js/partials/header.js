(() => {
  function initHeader() {
    const header = document.querySelector("[data-hero-header]");
    const hero = document.querySelector("#hero");
    if (!header || !hero) return;

    const onScroll = () => {
      const heroBottom = hero.getBoundingClientRect().bottom;
      header.classList.toggle("is-sticky", heroBottom < 80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  document.addEventListener("includes:loaded", initHeader);
  document.addEventListener("DOMContentLoaded", initHeader);
})();