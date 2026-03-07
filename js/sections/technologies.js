// js/sections/technologies.js
// Fix: initAll was out of scope due to IIFE + external listener.
// This version registers everything inside the module scope and
// runs only after includes are injected.

(() => {
  const SELECTOR = ".tech-lane";
  const laneState = new WeakMap(); // lane -> { sig: string }
  let started = false;

  function getLanes() {
    return Array.from(document.querySelectorAll(SELECTOR));
  }

  function clearJsClones(track) {
    track.querySelectorAll(".tech-set.js-clone").forEach((n) => n.remove());
  }

  function dprSnap(px) {
    const dpr = window.devicePixelRatio || 1;
    return Math.round(px * dpr) / dpr;
  }

  function signatureForLane(lane) {
    const track = lane.querySelector(".tech-track");
    const set = lane.querySelector(".tech-set");
    if (!track || !set) return "missing";
    const style = getComputedStyle(lane);
    const gap = parseFloat(style.getPropertyValue("--tech-gap")) || 0;
    return [
      lane.clientWidth,
      set.scrollWidth,
      gap,
      window.devicePixelRatio || 1,
      style.fontFamily,
      style.fontSize,
    ].join("|");
  }

  function rebuildLane(lane) {
    const track = lane.querySelector(".tech-track");
    const set = lane.querySelector(".tech-set");
    if (!track || !set) return;

    const sig = signatureForLane(lane);
    const prev = laneState.get(lane)?.sig;
    if (prev === sig) return;
    laneState.set(lane, { sig });

    clearJsClones(track);

    // Clone until the track has enough width for seamless looping
    const gap =
      parseFloat(getComputedStyle(lane).getPropertyValue("--tech-gap")) || 0;

    const setWidth = set.scrollWidth;
    if (setWidth <= 0) return;

    const needed = Math.max(2, Math.ceil((lane.clientWidth * 2) / setWidth));
    for (let i = 1; i < needed; i++) {
      const clone = set.cloneNode(true);
      clone.classList.add("js-clone");
      track.appendChild(clone);
    }

    // Snap track translate to avoid sub-pixel jitter
    track.style.setProperty("--tech-snap", `${dprSnap(gap)}px`);
  }

  function initAll() {
    getLanes().forEach(rebuildLane);
  }

  function start() {
    if (started) return;
    started = true;

    // First build
    initAll();

    // Re-run after fonts settle (one-time)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(initAll).catch(() => {});
    }

    // Small delayed passes to catch late layout shifts
    setTimeout(initAll, 150);
    setTimeout(initAll, 500);

    // Rebuild on resize/zoom (throttled)
    let raf = 0;
    window.addEventListener("resize", () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(initAll);
    });

    // When tab becomes visible again
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) initAll();
    });
  }

  // ✅ Correct: run after includes are injected
  document.addEventListener("includes:loaded", () => {
    // only start if the section exists on the page
    if (document.querySelector(SELECTOR)) start();
  });

  // Safety: if includes already loaded before this module attaches listener
  // (rare), start if the DOM already contains the section.
  if (document.querySelector(SELECTOR)) {
    // Wait a tick to allow layout to settle
    requestAnimationFrame(() => start());
  }
})();