import { loadIncludes } from "./includes.js";

function initializeNavigation() {
  const header = document.querySelector("[data-site-header]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-site-nav]");
  if (!header || !toggle || !nav) return;

  const closeMenu = ({ restoreFocus = false } = {}) => {
    header.classList.remove("is-menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
    if (restoreFocus) toggle.focus({ preventScroll: true });
  };

  toggle.addEventListener("click", (event) => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
      return;
    }
    header.classList.add("is-menu-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close navigation menu");
    if (event.detail === 0) nav.querySelector("a")?.focus();
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.classList.contains("is-menu-open")) {
      event.preventDefault();
      closeMenu({ restoreFocus: true });
    }
  });

  header.addEventListener("focusout", (event) => {
    if (event.relatedTarget && !header.contains(event.relatedTarget)) closeMenu();
  });

  const desktop = window.matchMedia("(min-width: 961px)");
  desktop.addEventListener("change", () => {
    if (desktop.matches) closeMenu();
  });

  const normalizePath = (path) => path.replace(/\/$/, "/index.html").toLowerCase();
  const currentPath = normalizePath(window.location.pathname);
  const updateCurrentLinks = () => {
    header.querySelectorAll("a[href]").forEach((link) => {
      const destination = new URL(link.href);
      const isSamePage = destination.origin === window.location.origin && normalizePath(destination.pathname) === currentPath;
      const isCareerPage = /\/(?:careers|submit-resume)\.html$/.test(currentPath) && link.dataset.route === "jobs";
      link.removeAttribute("aria-current");
      if (isSamePage && !destination.hash) link.setAttribute("aria-current", "page");
      else if (isSamePage && destination.hash === window.location.hash) link.setAttribute("aria-current", "location");
      else if (isCareerPage) link.setAttribute("aria-current", "location");
    });
  };
  updateCurrentLinks();
  window.addEventListener("hashchange", updateCurrentLinks);
}

function initializeForms() {
  const queryType = new URLSearchParams(window.location.search).get("type");
  const requestType = document.querySelector("[name='requestType']");
  if (requestType && ["staffing", "vendor", "candidate", "other"].includes(queryType)) {
    requestType.value = queryType;
  }

  document.querySelectorAll("form[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        form.querySelector(":invalid")?.focus();
        return;
      }

      const status = form.querySelector("[data-form-status]");
      if (!status) return;
      status.hidden = false;
      status.textContent = "This local preview does not send or store form submissions. Email hr@triadatechnologies.com to contact Triada.";
      status.focus();
    });
  });
}

function initializeFooter() {
  const year = document.querySelector("[data-current-year]");
  if (year) year.textContent = String(new Date().getFullYear());
}

function initializeReveals() {
  const elements = [...document.querySelectorAll("[data-reveal]")];
  if (!elements.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const showAll = () => elements.forEach((element) => element.classList.add("is-visible"));
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    showAll();
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.06, rootMargin: "0px 0px -32px 0px" });

  elements.forEach((element) => {
    const bounds = element.getBoundingClientRect();
    // The initial viewport stays readable; only later content enters on scroll.
    if (bounds.top < window.innerHeight && bounds.bottom > 0) element.classList.add("is-visible");
    else observer.observe(element);
  });
  document.documentElement.classList.add("reveal-ready");

  document.addEventListener("focusin", (event) => {
    // A keyboard user should never land on a still-hidden link or control.
    let element = event.target.closest("[data-reveal]");
    while (element) {
      element.classList.add("is-visible");
      observer.unobserve(element);
      element = element.parentElement?.closest("[data-reveal]");
    }
  });

  reducedMotion.addEventListener("change", (event) => {
    if (!event.matches) return;
    showAll();
    observer.disconnect();
    document.documentElement.classList.remove("reveal-ready");
  });
}

async function restoreInitialAnchor() {
  const hash = window.location.hash;
  if (!hash) return;
  if (document.fonts) await document.fonts.ready;
  await new Promise((resolve) => requestAnimationFrame(resolve));
  if (window.location.hash !== hash) return;

  let id;
  try {
    id = decodeURIComponent(hash.slice(1));
  } catch {
    return;
  }
  // Shared sections are fetched after the browser's first anchor lookup.
  document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" });
}

async function boot() {
  await loadIncludes();
  initializeNavigation();
  initializeForms();
  initializeFooter();
  initializeReveals();
  await restoreInitialAnchor();
  document.documentElement.classList.add("is-ready");
}

boot();
