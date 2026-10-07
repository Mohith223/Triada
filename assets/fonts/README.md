# Self-hosted fonts

Triada uses the unmodified Latin WOFF2 subsets served by Google Fonts. The font
files are stored locally so page typography does not depend on a third-party
request. `styles/base/fonts.css` declares the original family names and uses
`font-display: swap`.

Source stylesheet:
https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Manrope:wght@400..800&display=swap

The stylesheet was requested with a current Chromium user agent to obtain WOFF2
files. The Latin Unicode ranges are preserved in the local CSS; other scripts
use the site's system-font fallbacks.

| File | Family / style / weight | Original download |
| --- | --- | --- |
| `manrope-latin-variable.woff2` | Manrope / normal / 400–800 variable | https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggexSg.woff2 |
| `dm-serif-display-latin-regular.woff2` | DM Serif Display / normal / 400 | https://fonts.gstatic.com/s/dmserifdisplay/v17/-nFnOHM81r4j6k0gjAW3mujVU2B2G_Bx0g.woff2 |
| `dm-serif-display-latin-italic.woff2` | DM Serif Display / italic / 400 | https://fonts.gstatic.com/s/dmserifdisplay/v17/-nFhOHM81r4j6k0gjAW3mujVU2B2G_VB0PD2.woff2 |

## Licenses

Both families are distributed under the SIL Open Font License, version 1.1.
The accompanying files are copied from the Google Fonts repository:

- `Manrope-OFL.txt`: https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt
- `DM-Serif-Display-OFL.txt`: https://raw.githubusercontent.com/google/fonts/main/ofl/dmserifdisplay/OFL.txt

Keep these license files with redistributed font assets. Font files were not
modified or renamed internally.
