# Wichita EPE Membership — Prototype

A single-page prototype landing site for **Every Person Empowered (EPE)** — a
free, community-powered membership that helps Wichita residents take the next
step toward stability, progress, and contribution.

> Prototype only. Forms are intentionally non-functional and partner names are
> placeholders.

## Stack

- [Next.js 15](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm start        # serve the production build
```

## Where to edit

| What | File |
| --- | --- |
| Colors & fonts (design tokens) | `app/globals.css` (`@theme` block) |
| Page assembly / section order | `app/page.jsx` |
| Membership levels, benefits, partners, steps | `lib/data.js` |
| Mock membership card | `components/MembershipCard.jsx` |
| Individual sections | `components/*.jsx` |

The palette — deep navy, warm gold, off-white, and a subtle green (sage)
accent — is defined once in `app/globals.css` and reused everywhere via Tailwind
utility classes (`bg-navy`, `text-gold`, `bg-cream`, `text-sage`, …).
