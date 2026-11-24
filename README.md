# sarada_landing_page

Redesigned landing page for **সারদা পাঠশালা (The Sarada Pathshala)** — [thesaradapathshala.com](https://thesaradapathshala.com/).
Digital study notes by অরবিন্দ ঘোষ for NSOU Education M.A and Rabindra Bharati University Bengali M.A (Distance).

## Stack
React 19 · Vite 6 · TypeScript · Tailwind CSS v4 · Motion · lucide-react

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Editing content
All text, prices, links and images live in `src/data/site.ts` (copied from the live site).
Items marked `TODO` there still need real values: teacher photo, YouTube/Facebook URLs.

"Buy" buttons link to the existing WordPress/WooCommerce shop, so checkout keeps working.
