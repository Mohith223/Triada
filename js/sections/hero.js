function pad(n) {
  return String(n).padStart(2, "0");
}

function initHero() {
  const hero = document.querySelector("#hero");
  if (!hero) return;

  const slides = Array.from(hero.querySelectorAll(".hero-slide"));
  const currentEl = hero.querySelector("[data-hero-current]");
  const totalEl = hero.querySelector("[data-hero-total]");
  const prevBtn = hero.querySelector("[data-hero-prev]");
  const nextBtn = hero.querySelector("[data-hero-next]");

  let index = slides.findIndex((s) => s.classList.contains("is-active"));
  if (index < 0) index = 0;

  const total = slides.length;
  if (totalEl) totalEl.textContent = pad(total);

  let autoTimer = null;
  const INTERVAL = 5000; // 3 seconds

  function restartReveal(slide) {
    slide.classList.remove("is-animating");
    void slide.offsetWidth; // force reflow
    slide.classList.add("is-animating");
  }

  function setActive(i) {
    index = (i + total) % total;

    slides.forEach((slide, idx) => {
      const active = idx === index;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", active ? "false" : "true");

      if (active) restartReveal(slide);
    });

    if (currentEl) currentEl.textContent = pad(index + 1);
  }

  function next() {
    setActive(index + 1);
  }

  function prev() {
    setActive(index - 1);
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => {
      next();
    }, INTERVAL);
  }

  function stopAuto() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  // Manual navigation resets timer
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      next();
      startAuto();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prev();
      startAuto();
    });
  }


  // Keyboard support
  window.addEventListener("keydown", (e) => {
    const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : "";
    if (tag === "input" || tag === "textarea" || tag === "select") return;

    if (e.key === "ArrowRight") {
      next();
      startAuto();
    }

    if (e.key === "ArrowLeft") {
      prev();
      startAuto();
    }
  });

  setActive(index);
  startAuto(); // 🔥 Start automatic rotation
}

document.addEventListener("includes:loaded", initHero);
document.addEventListener("DOMContentLoaded", initHero);