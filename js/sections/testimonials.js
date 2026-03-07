function initTestimonials() {
  const root = document.querySelector("[data-tst]");
  if (!root) return;

  if (root.dataset.tstInit === "1") return;
  root.dataset.tstInit = "1";

  const rail = root.querySelector(".tst__rail");
  const cards = Array.from(root.querySelectorAll(".tst__card"));
  
  // FIX: Query the whole #testimonials section instead of just 'root' 
  // because we moved the buttons to the left column!
  const btnPrev = document.querySelector("#testimonials [data-prev]");
  const btnNext = document.querySelector("#testimonials [data-next]");

  const progress = root.querySelector("[data-progress]");
  const countEl = root.querySelector("[data-count]");
  const totalEl = root.querySelector("[data-total]");

  if (!rail || cards.length < 3) return;

  const max = cards.length;
  let active = 1;

  let timer = null;
  const AUTOPLAY_MS = 4200;

  const SNAP_LEFT_PX = 22;

  function setSnap(px) {
    root.style.setProperty("--tstSnapX", `${px}px`);
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function start() {
    stop();
    timer = setInterval(() => next(false), AUTOPLAY_MS);
  }

  function updateUI() {
    if (countEl) countEl.textContent = String(active);
    if (totalEl) totalEl.textContent = String(max);

    if (progress) {
      const pct = (active / max) * 100;
      progress.style.width = `${pct}%`;
    }
  }

  function apply() {
    const prev = active === 1 ? max : active - 1;
    const nextIndex = active === max ? 1 : active + 1;

    cards.forEach((c) => {
      const i = Number(c.dataset.index);
      c.classList.remove("is-prev", "is-active", "is-next", "is-far");

      if (i === active) c.classList.add("is-active");
      else if (i === prev) c.classList.add("is-prev");
      else if (i === nextIndex) c.classList.add("is-next");
      else c.classList.add("is-far");
    });

    updateUI();
  }

  function setActive(n, fromUser = false) {
    setSnap(0);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setSnap(-SNAP_LEFT_PX));
    });

    active = n;
    if (active < 1) active = max;
    if (active > max) active = 1;

    apply();
    if (fromUser) start();
  }

  function next(fromUser = true) {
    setActive(active + 1, fromUser);
  }

  function prev(fromUser = true) {
    setActive(active - 1, fromUser);
  }

  btnNext?.addEventListener("click", () => next(true));
  btnPrev?.addEventListener("click", () => prev(true));

  // keyboard: vertical primary, horizontal fallback
  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      prev(true);
    }
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      next(true);
    }
  });

  // pause on hover/focus
  [root, rail].forEach((el) => {
    el.addEventListener("mouseenter", stop);
    el.addEventListener("mouseleave", start);
    el.addEventListener("focusin", stop);
    el.addEventListener("focusout", start);
  });

  // init
  setSnap(-SNAP_LEFT_PX);
  setActive(1, false);
  start();
}

document.addEventListener("includes:loaded", initTestimonials);
document.addEventListener("DOMContentLoaded", initTestimonials);