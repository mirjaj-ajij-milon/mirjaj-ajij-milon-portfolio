# Mirjaj Ajij Milon — Developer Portfolio

A single-page, production-ready developer portfolio built with **React + Tailwind CSS + Framer Motion**.
Dark-mode-first, fully responsive, recruiter-friendly — designed to impress in 30 seconds.

## Quick start

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

## Structure & Data Files

All content lives in **plain data files** in `frontend/src/data/`:

| File | What's inside |
|---|---|
| `frontend/src/data/site.js` | **Name, role, email, phone, location, availability, resume path, hero stats, bio, image paths** |
| `frontend/src/data/socials.js` | GitHub, LinkedIn, LeetCode, GFG, Email, WhatsApp profile links |
| `frontend/src/data/projects.js` | 5 Shipped projects (BizPilot AI, Swadzo, TradeSphere, Vionex, Wonderlust) |
| `frontend/src/data/skills.js` | Backend, Frontend, Database, Languages, Tools, Core Competencies |
| `frontend/src/data/experience.js` | Gameonix Esports Internship, DIGONTOM Hackathon 1st Place win |
| `frontend/src/data/education.js` | Brainware University (B.Tech CSE) & Harishchandra Pur High School |
| `frontend/src/data/achievements.js` | Hackathon trophy, DSA milestones, coding stats, services |

## Resume PDF

The resume PDF is located at:
`frontend/public/resume/Mirjaj_Ajij_Milon_Resume.pdf` (linked directly in `site.js`).

The placeholder PDF is regenerated with `python3 /tmp/make_resume_pdf.py` (reportlab).

## Turn on the contact form (Web3Forms, free, no backend)

1. Go to <https://web3forms.com> and enter your email address.
2. Copy the access key they email you.
3. Paste it in `frontend/src/data/site.js` → `web3formsKey: "YOUR_KEY"`.

While the key is empty, the form falls back to opening the visitor's email client (mailto).
A hidden honeypot field filters obvious bots either way.

## Theming

- Dark mode is the default; the toggle remembers the visitor's choice in `localStorage`.
- Colors: primary indigo `#6366F1`, accent cyan `#22D3EE`, slate neutrals — edit the CSS
  variables in `frontend/src/index.css`.
- Fonts: Space Grotesk (headings), Inter (body), JetBrains Mono (accents), loaded in
  `frontend/public/index.html`.

## Deploying (Vercel / Netlify)

The `frontend/` folder is a standard Create React App build:

- **Vercel**: import the repo, set Root Directory to `frontend`, build command `yarn build`,
  output directory `frontend/build`.
- **Netlify**: build command `yarn build`, publish directory `frontend/build`, and add a
  redirect rule `/* → /index.html 200` (file `frontend/public/_redirects`) for client routing.

Deploy tip: press Deploy once the content in `src/data/` reflects your real details — the
first Deploy copies the preview database/content once.

## Notes

- Devicon logos are loaded from the jsDelivr CDN (`cdn.jsdelivr.net/gh/devicons/devicon`).
- Scroll animations respect `prefers-reduced-motion`, and smooth scrolling uses Lenis.
- SEO: title, description, Open Graph/Twitter cards, JSON-LD Person schema in `public/index.html`.
