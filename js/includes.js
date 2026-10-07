export async function loadIncludes() {
  const elements = [...document.querySelectorAll("[data-include]")];

  await Promise.all(elements.map(async (element) => {
    const path = element.getAttribute("data-include");
    if (!path) return;

    try {
      const url = new URL(path, document.baseURI);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Include request returned ${response.status}`);
      element.innerHTML = await response.text();
      element.removeAttribute("data-include");
    } catch (error) {
      console.error(`Unable to load shared site fragment: ${path}`, error);
      element.innerHTML = '<p class="include-error">Shared page content could not load. Run the site through a local web server and refresh.</p>';
    }
  }));

  document.dispatchEvent(new CustomEvent("includes:loaded"));
}
