# Triada Technologies website

Static HTML, CSS, and JavaScript redesign. No build step or package install is required.

## Run locally

From this folder, start a small HTTP server:

```powershell
py -3 -m http.server 4173
```

Then open `http://localhost:4173/`. The site uses HTML fragments for the shared header and footer, so opening `index.html` directly with `file://` will not load those fragments.

## Pages

- `index.html` - home
- `html/pages/services.html` - staffing solutions
- `html/pages/about.html` - about Triada
- `html/pages/jobs.html` - openings and candidate path
- `html/pages/submit-resume.html` - candidate resume preview
- `html/pages/staffing-request.html` - employer request preview
- `html/pages/contact.html` - general contact
- `html/pages/privacy.html` - local preview privacy notice
- `404.html` - branded not-found page

The previous `html/pages/careers.html` address redirects to `html/pages/jobs.html`.

## Editing

- Shared page chrome: `html/partials/` and `styles/partials/`
- Home page sections: `html/sections/` and `styles/sections/`
- Route-specific content and styles: `html/pages/` and `styles/pages/site-pages.css`
- Global tokens and layout: `styles/base/`
- Shared interactions and fragment loading: `js/main.js` and `js/includes.js`

The forms are front-end previews only. They validate in the browser but do not submit, upload, or store information. Connect a real service and replace the preview privacy notice before collecting personal information in production.
