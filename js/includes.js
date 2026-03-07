/**
 * includes.js (ESM)
 * Loads HTML fragments into elements that have data-include="path".
 * Dispatches: "includes:loaded" when done.
 */

export async function loadIncludes() {
  const nodes = Array.from(document.querySelectorAll("[data-include]"));

  await Promise.all(
    nodes.map(async (el) => {
      const path = el.getAttribute("data-include");
      if (!path) return;

      try {
        const res = await fetch(path, { cache: "no-cache" });
        if (!res.ok) throw new Error(`Include failed: ${path} (${res.status})`);

        const html = await res.text();
        el.innerHTML = html;
        el.removeAttribute("data-include");
      } catch (err) {
        console.error(err);
        el.innerHTML = `<!-- include failed: ${path} -->`;
      }
    })
  );

  document.dispatchEvent(new CustomEvent("includes:loaded"));
}