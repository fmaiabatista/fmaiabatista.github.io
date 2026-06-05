# Website Scaffold Design

**Date:** 2026-06-05
**Status:** Approved

## Overview

Scaffold a personal GitHub Pages website using Astro, Tailwind v4, React, Motion, and Lucide Icons, with TypeScript, ESLint, and Prettier configured for IDE-driven authoring. The goal is a working skeleton with no real content — just enough to prove every integration works.

## Tech Stack

| Tool | Version / Notes |
|---|---|
| Astro | Latest (`create astro`) |
| React | Via `@astrojs/react` |
| Tailwind CSS | v4 via `@tailwindcss/vite` Vite plugin |
| Motion | `motion` package (`motion/react` import) |
| Lucide Icons | `lucide-react` |
| TypeScript | Astro strict preset (`tsconfig.json`) |
| ESLint | Flat config (`eslint.config.mjs`) |
| Prettier | `.prettierrc` with Astro + Tailwind plugins |

## Project Structure

```
src/
  components/
    HeroHeading.tsx       ← React island: Motion animation + Lucide icon + Tailwind classes
  content/
    blog/
      hello-world.md      ← Stub post so [slug].astro resolves without errors
  layouts/
    BaseLayout.astro      ← Shared wrapper: <ViewTransitions />, global CSS, <slot />
  pages/
    index.astro           ← Home: imports HeroHeading (client:load), link to /about
    about.astro           ← About: plain "Hello from About" heading
    blog/
      index.astro         ← Blog index: lists posts from content collection
      [slug].astro        ← Blog post: renders individual post from content collection
  styles/
    global.css            ← @import "tailwindcss"
astro.config.mjs
tsconfig.json
eslint.config.mjs
.prettierrc
.vscode/
  settings.json           ← formatOnSave, defaultFormatter, ESLint file associations
```

## Astro Configuration

`astro.config.mjs`:
- `output: 'static'` for GitHub Pages
- `integrations: [react()]`
- `vite.plugins: [tailwindcss()]`
- No base path needed — repo is `fmaiabatista.github.io` (user page, deploys at root)

## Pages

### `/` — Home (`index.astro`)
Wraps in `BaseLayout`. Renders `<HeroHeading client:load />`. Includes a plain `<a href="/about">` anchor — Astro's `<ViewTransitions />` in the layout handles the animated transition automatically.

### `/about` — About (`about.astro`)
Wraps in `BaseLayout`. Plain `<h1>About</h1>` — no interactivity.

### `/blog` — Blog index (`blog/index.astro`)
Wraps in `BaseLayout`. Uses `getCollection('blog')` to list posts with title and slug links.

### `/blog/:slug` — Blog post (`blog/[slug].astro`)
Uses `getStaticPaths` + `getCollection('blog')` to generate routes. Renders the post body via Astro's `<Content />` component.

## React Island: `HeroHeading.tsx`

A single React component that demonstrates all three interactive integrations working together:

- **Motion**: `motion.h1` with `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}` transition
- **Tailwind**: classes on the heading (e.g. `text-5xl font-bold text-gray-900`)
- **Lucide**: a small icon rendered inline next to the heading text (e.g. `<Sparkles />`)

No props needed — it's purely a proof-of-concept island.

## Content Collection

`src/content/blog/hello-world.md` with frontmatter:
```md
---
title: Hello World
date: 2026-06-05
---
This is a stub post.
```

A content collection config at `src/content/config.ts` defines the `blog` collection schema with `title` (string) and `date` (date).

## TypeScript

`tsconfig.json` extends Astro's `strict` preset. All new files use `.ts`, `.tsx`, or `.astro`. No custom path aliases needed at this stage.

## Linting & Formatting

**ESLint (`eslint.config.mjs`)** — flat config covering:
- `@eslint/js` recommended rules
- `@typescript-eslint` rules for `.ts`/`.tsx`
- `eslint-plugin-astro` for `.astro` files
- `eslint-plugin-react` with JSX runtime mode

**Prettier (`.prettierrc`)** — plugins:
- `prettier-plugin-astro` for `.astro` formatting
- `prettier-plugin-tailwindcss` for class sorting

No `package.json` scripts. Both tools are consumed exclusively via VS Code extensions.

**`.vscode/settings.json`**:
- `editor.formatOnSave: true`
- `editor.defaultFormatter: "esbenp.prettier-vscode"`
- `eslint.validate` includes `["astro", "typescript", "typescriptreact"]`

## Out of Scope

- Actual content, copy, or design
- Navigation component
- SEO / meta tags
- Deployment configuration (GitHub Actions)
- Page transition customisation beyond Astro defaults
