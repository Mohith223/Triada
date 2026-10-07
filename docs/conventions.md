# Editing conventions

- Keep business claims grounded in the current Triada site. Do not create testimonials, client names, job openings, response-time promises, or performance numbers.
- Treat the current homepage figures as the approved set for this redesign. Do not reintroduce the conflicting figures previously shown on About.
- Keep shared navigation and footer content in `html/partials/`. Keep standalone page content in `html/pages/` and reusable home content in `html/sections/`.
- Put colors, type, spacing, and radii in `styles/base/variables.css`. Use semantic class names and keep route styling in `styles/pages/site-pages.css`.
- Use real anchors for navigation and buttons for actions. Give form controls visible labels and preserve native validation and keyboard behavior.
- Forms remain preview-only until an approved endpoint and privacy policy are available. They must not store personal data in browser storage or send it to a local development port.
- Use subtle transform and opacity transitions. Honor `prefers-reduced-motion` and keep all content readable if JavaScript fails.
