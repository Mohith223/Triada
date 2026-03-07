/**
 * js/main.js (ESM)
 * One entry point. Loads includes, then section scripts initialize on "includes:loaded".
 */

import { loadIncludes } from "./includes.js";

// section behavior modules
import "./sections/hero.js";
import "./sections/proof.js";
import "./sections/contact.js";
import "./sections/technologies.js";
import "./sections/industries.js";
import "./sections/how-we-work.js";
import "./sections/testimonials.js";
import "./sections/why-choose-us.js";
import "./sections/faq.js";
import "./sections/services.js";
  
// partial behavior modules
import "./partials/header.js";

async function boot() {
  await loadIncludes();
  // After this, "includes:loaded" fires and section scripts run.
}

boot();