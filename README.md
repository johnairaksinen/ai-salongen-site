# AI-salongen.se

Static transition page from AI-salongen to [John & Julius Salong](https://johnandjulius.com/).

Plain HTML, CSS and JavaScript; no install or build step. Vercel serves the repository root. The existing Vercel project deploys `main` from GitHub.

## Maintain

- Edit Swedish copy and destination (`#destination`) in `index.html`.
- The redirect uses that link's URL after **10 visible seconds** (`delayMs` in `transition.js`). Update the visible initial number if changing the delay.
- “Pausa” stops the timer; “Fortsätt” resumes it. Background-tab time does not count. Manual links work without JavaScript. No meta refresh is used, so pausing cannot be bypassed by another redirect mechanism.
- `transition.css` contains the new styles, including reduced-motion behavior.
- `vercel.json` serves this page at `/forelasning[.html]` and `/workshop[.html]` too. Original source files and `style.css` remain in git for reference.

Preview: `python3 -m http.server 4173 --bind 127.0.0.1`, then open `http://127.0.0.1:4173/`. Python's server does not apply Vercel rewrites; verify those after deployment. Syntax: `node --check transition.js`.

Before publishing, check desktop/mobile, keyboard links/pause, ten-second redirect, pause/resume, reduced motion and navigation without JavaScript. Check legacy routes on Vercel.

## Copy and assets

Headline and body come from John's 12 October 2026 request and attached source copy. The introduction adds the established name and Hornstull location.

Local copies from the `johnandjulius` repository:

| Local file | Source |
| --- | --- |
| `assets/salongen.jpg` | `public/images/the-salon.JPG` — actual salon photograph, unchanged |
| `assets/john-julius-wordmark.png` | `public/images/Wordmark.png` — canonical Ink wordmark, unchanged |
| `assets/fonts/Kerub-Beta02Regular.woff2` | `public/fonts/Kerub-Beta02Regular.woff2` |
| `assets/fonts/calibre-regular.woff2` | `public/fonts/calibre-regular.woff2` |

Paper (`#EBEBD6`), Ink (`#2F2F2F`), typography and wordmark treatment follow the John & Julius brand skill. The photograph settles once into its frame; there is no continuous decorative animation.
