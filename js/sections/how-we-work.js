/**
 * How We Work — dial-style navigation
 * - Clicking a left step dials through intermediate steps (like iPhone clock wheel)
 * - Prev/Next move by 1
 * - Autoplay loops
 */

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function initHowWeWork() {
  const root = document.querySelector("[data-hwt]");
  if (!root) return;

  const steps = Array.from(root.querySelectorAll(".hwt-step"));
  const cardsWrap = root.querySelector(".hwt-cards");
  const cards = Array.from(root.querySelectorAll(".hwt-card"));
  const btnPrev = root.querySelector("[data-prev]");
  const btnNext = root.querySelector("[data-next]");

  if (!cardsWrap || cards.length === 0 || steps.length === 0) return;

  const maxIndex = cards.length;
  let active = 1;

  // autoplay
  let autoplayTimer = null;
  const AUTOPLAY_MS = 5600;

  // dialing
  let isDialing = false;
  let dialTimer = null;
  const DIAL_TICK_MS = 130;

  function stopAutoplay() {
    if (autoplayTimer) {
      window.clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = window.setInterval(() => next(false), AUTOPLAY_MS);
  }

  function restartAutoplay() {
    stopAutoplay();
    autoplayTimer = window.setInterval(() => next(false), AUTOPLAY_MS);
  }

  function applyState() {
    steps.forEach((el) => {
      const s = Number(el.dataset.step);
      const isActive = s === active;
      el.classList.toggle("is-active", isActive);
      el.setAttribute("aria-selected", String(isActive));
      el.tabIndex = isActive ? 0 : -1;
    });

    cardsWrap.setAttribute("data-step", String(active));

    cards.forEach((card) => {
      const i = Number(card.dataset.index);
      card.classList.remove("is-active", "is-prev", "is-next", "is-far");

      const prevIndex = active === 1 ? maxIndex : active - 1;
      const nextIndex = active === maxIndex ? 1 : active + 1;

      if (i === active) card.classList.add("is-active");
      else if (i === prevIndex) card.classList.add("is-prev");
      else if (i === nextIndex) card.classList.add("is-next");
      else card.classList.add("is-far");
    });
  }

  function setActive(index, { fromUser = false } = {}) {
    active = clamp(index, 1, maxIndex);
    applyState();
    if (fromUser) restartAutoplay();
  }

  function next(fromUser = false) {
    if (isDialing) return;
    const n = active === maxIndex ? 1 : active + 1;
    setActive(n, { fromUser });
  }

  function prev(fromUser = false) {
    if (isDialing) return;
    const p = active === 1 ? maxIndex : active - 1;
    setActive(p, { fromUser });
  }

  function stopDial() {
    if (dialTimer) {
      window.clearInterval(dialTimer);
      dialTimer = null;
    }
    isDialing = false;
  }

  function dialTo(target) {
    target = clamp(Number(target), 1, maxIndex);
    if (!target || target === active) return;

    stopAutoplay();
    stopDial();
    isDialing = true;

    const dir = target > active ? 1 : -1;

    dialTimer = window.setInterval(() => {
      active += dir;

      if (active < 1) active = maxIndex;
      if (active > maxIndex) active = 1;

      applyState();

      if (active === target) {
        stopDial();
        restartAutoplay();
      }
    }, DIAL_TICK_MS);
  }

  steps.forEach((el) => {
    el.addEventListener("click", () => dialTo(el.dataset.step));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        dialTo(el.dataset.step);
      }
    });
  });

  btnNext?.addEventListener("click", () => next(true));
  btnPrev?.addEventListener("click", () => prev(true));

  [root, cardsWrap].forEach((t) => {
    t.addEventListener("mouseenter", stopAutoplay);
    t.addEventListener("mouseleave", startAutoplay);
    t.addEventListener("focusin", stopAutoplay);
    t.addEventListener("focusout", startAutoplay);
  });

  setActive(1, { fromUser: false });
  startAutoplay();
}

document.addEventListener("includes:loaded", initHowWeWork);
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector("[data-hwt]")) initHowWeWork();
});