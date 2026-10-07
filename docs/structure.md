# Site structure

The site is a small static multi-page experience. It uses HTML fragments for the shared header and footer, loaded by `js/includes.js` after the page starts.

```text
index.html
html/
  partials/       Shared header and footer
  sections/       Home sections shared by relevant pages
  pages/          Route documents
styles/
  base/           Reset, tokens, typography, and layout
  partials/       Header and footer styles
  sections/       Home and shared section styles
  pages/          Route-specific styles
js/
  includes.js     Static HTML fragment loader
  main.js         Shared navigation and preview-form behavior
assets/images/    Local visual assets and favicon
```

Nested route pages set `<base href="../../">` so their links, styles, and fragment paths resolve from the site root. Keep fragment paths root-relative, for example `html/partials/header.html`.

## Routes

| Route | Purpose |
| --- | --- |
| `index.html` | Home and primary audience paths |
| `html/pages/services.html` | Staffing solutions and industry coverage |
| `html/pages/about.html` | Triada overview |
| `html/pages/jobs.html` | Openings and candidate path |
| `html/pages/submit-resume.html` | Candidate form preview |
| `html/pages/staffing-request.html` | Employer form preview |
| `html/pages/contact.html` | General contact and vendor partnership |
| `html/pages/privacy.html` | Local preview privacy notice |
| `404.html` | Branded not-found page |

`html/pages/careers.html` redirects to `html/pages/jobs.html` to preserve the earlier local address.
