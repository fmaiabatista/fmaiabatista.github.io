# Website Scaffold Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a personal GitHub Pages site using Astro, Tailwind v4, React, Motion, and Lucide Icons with TypeScript, ESLint, and Prettier configured for IDE-driven development.

**Architecture:** Astro static site (`output: 'static'`) with React islands for interactivity. Tailwind v4 loaded via the `@tailwindcss/vite` Vite plugin. Motion and Lucide are runtime dependencies consumed only inside React islands. ESLint and Prettier are dev-only tools with no package.json scripts — consumed exclusively by VS Code extensions.

**Tech Stack:** Astro (latest), React 19, Tailwind CSS v4, Motion (`motion/react`), Lucide React, TypeScript (strict), ESLint (flat config), Prettier.

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `index.html` | Delete | Replaced by Astro |
| `package.json` | Create (via scaffold) | Project manifest |
| `astro.config.mjs` | Modify | Add React integration + Tailwind v4 Vite plugin + static output |
| `tsconfig.json` | Create (via scaffold) | Astro strict TypeScript preset |
| `src/env.d.ts` | Create (via scaffold) | Astro type references |
| `src/styles/global.css` | Create | `@import "tailwindcss"` entry point |
| `src/content.config.ts` | Create | Content collection schema for `blog` |
| `src/content/blog/hello-world.md` | Create | Stub post so `[slug].astro` resolves |
| `src/layouts/BaseLayout.astro` | Create | Shared HTML shell with `<ViewTransitions />` |
| `src/components/HeroHeading.tsx` | Create | React island: Motion + Tailwind + Lucide demo |
| `src/pages/index.astro` | Modify | Home page using `HeroHeading` island |
| `src/pages/about.astro` | Create | Minimal about page |
| `src/pages/blog/index.astro` | Create | Blog listing from content collection |
| `src/pages/blog/[slug].astro` | Create | Blog post renderer |
| `eslint.config.mjs` | Create | ESLint flat config |
| `.prettierrc` | Create | Prettier with Astro + Tailwind plugins |
| `.vscode/settings.json` | Modify | formatOnSave + ESLint validation |

---

## Task 1: Initialize Astro Project

**Files:**
- Delete: `index.html`
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/env.d.ts`, `src/pages/index.astro`, `.gitignore` (all via scaffold)

- [ ] **Step 1: Run the Astro scaffold in the existing directory**

```bash
npm create astro@latest . -- --template minimal --install --typescript strict --no-git
```

If prompted about existing files, confirm overwrite. The `--no-git` flag skips `git init` since the repo already exists.

- [ ] **Step 2: Delete the stub index.html**

```bash
rm index.html
```

- [ ] **Step 3: Verify the scaffold succeeded**

```bash
npm run build
```

Expected: build succeeds, `dist/` directory created with `index.html` inside.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: scaffold Astro project"
```

---

## Task 2: Install Additional Dependencies

**Files:**
- Modify: `package.json` (via npm install)

- [ ] **Step 1: Install runtime dependencies**

```bash
npm install motion lucide-react
```

- [ ] **Step 2: Install React integration and types**

```bash
npm install @astrojs/react react react-dom
npm install -D @types/react @types/react-dom
```

- [ ] **Step 3: Install Tailwind v4 Vite plugin**

```bash
npm install -D tailwindcss @tailwindcss/vite
```

- [ ] **Step 4: Verify dependencies resolved**

```bash
npm ls motion lucide-react tailwindcss @astrojs/react
```

Expected: all four packages listed without errors.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install runtime and dev dependencies"
```

---

## Task 3: Configure Astro

**Files:**
- Modify: `astro.config.mjs`

- [ ] **Step 1: Replace astro.config.mjs with the full configuration**

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 2: Verify the config is valid**

```bash
npm run build
```

Expected: build succeeds (React and Tailwind plugins loaded, no errors).

- [ ] **Step 3: Commit**

```bash
git add astro.config.mjs
git commit -m "chore: configure Astro with React and Tailwind v4"
```

---

## Task 4: Set Up Tailwind CSS

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Create the global CSS file**

```css
/* src/styles/global.css */
@import "tailwindcss";
```

- [ ] **Step 2: Verify Tailwind is generating styles**

Add a temporary Tailwind class to `src/pages/index.astro` to test:

```astro
---
// src/pages/index.astro (temporary)
---
<h1 class="text-red-500">Hello</h1>
```

Then import the CSS and build:

```bash
npm run build
```

Open `dist/index.html` and confirm it references a CSS file. Revert the temporary change afterward — keep `index.astro` as the scaffold generated it for now (pages are replaced in later tasks).

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "chore: add Tailwind v4 global CSS entry point"
```

---

## Task 5: Configure ESLint

**Files:**
- Create: `eslint.config.mjs`

- [ ] **Step 1: Install ESLint packages**

```bash
npm install -D eslint @eslint/js typescript-eslint eslint-plugin-astro eslint-plugin-react
```

- [ ] **Step 2: Create eslint.config.mjs**

```js
// eslint.config.mjs
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astroPlugin from 'eslint-plugin-astro';
import reactPlugin from 'eslint-plugin-react';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astroPlugin.configs.recommended,
  {
    files: ['**/*.tsx'],
    plugins: { react: reactPlugin },
    settings: { react: { version: 'detect' } },
    rules: {
      ...reactPlugin.configs['jsx-runtime'].rules,
    },
  },
);
```

- [ ] **Step 3: Verify ESLint parses the project without errors**

```bash
npx eslint src/
```

Expected: exits 0 (no lint errors on the scaffold files).

- [ ] **Step 4: Commit**

```bash
git add eslint.config.mjs package.json package-lock.json
git commit -m "chore: add ESLint flat config"
```

---

## Task 6: Configure Prettier and VS Code

**Files:**
- Create: `.prettierrc`
- Modify: `.vscode/settings.json`

- [ ] **Step 1: Install Prettier packages**

```bash
npm install -D prettier prettier-plugin-astro prettier-plugin-tailwindcss
```

- [ ] **Step 2: Create .prettierrc**

```json
{
  "plugins": ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  "overrides": [
    {
      "files": "*.astro",
      "options": {
        "parser": "astro"
      }
    }
  ]
}
```

- [ ] **Step 3: Update .vscode/settings.json**

Read the existing `.vscode/settings.json` first to see its current contents, then replace with:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": ["astro", "typescript", "typescriptreact"]
}
```

- [ ] **Step 4: Verify Prettier formats an Astro file without errors**

```bash
npx prettier --check src/pages/index.astro
```

Expected: exits 0 or reports formatting differences (either is fine — confirms the parser loaded correctly).

- [ ] **Step 5: Commit**

```bash
git add .prettierrc .vscode/settings.json package.json package-lock.json
git commit -m "chore: add Prettier and VS Code editor settings"
```

---

## Task 7: Create BaseLayout

**Files:**
- Create: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Create the layout file**

```astro
---
// src/layouts/BaseLayout.astro
import { ViewTransitions } from 'astro:transitions';
import '../styles/global.css';

interface Props {
  title: string;
}

const { title } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
    <ViewTransitions />
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 2: Verify the layout type-checks**

```bash
npx astro check
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat: add BaseLayout with ViewTransitions"
```

---

## Task 8: Set Up Content Collections

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/blog/hello-world.md`

- [ ] **Step 1: Create the content collection config**

```ts
// src/content.config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
  }),
});

export const collections = { blog };
```

- [ ] **Step 2: Create the stub blog post**

```md
---
title: Hello World
date: 2026-06-05
---

This is a stub post.
```

Save to: `src/content/blog/hello-world.md`

- [ ] **Step 3: Verify the collection is recognised**

```bash
npx astro check
```

Expected: 0 errors (Astro picks up `src/content.config.ts` automatically).

- [ ] **Step 4: Commit**

```bash
git add src/content.config.ts src/content/blog/hello-world.md
git commit -m "feat: add blog content collection with stub post"
```

---

## Task 9: Create HeroHeading React Island

**Files:**
- Create: `src/components/HeroHeading.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/HeroHeading.tsx
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function HeroHeading() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-3 text-5xl font-bold text-gray-900"
    >
      <Sparkles className="size-10 text-yellow-400" />
      Hello, world!
    </motion.h1>
  );
}
```

- [ ] **Step 2: Verify it type-checks**

```bash
npx astro check
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/HeroHeading.tsx
git commit -m "feat: add HeroHeading React island with Motion and Lucide"
```

---

## Task 10: Create Home Page

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Replace the scaffold index.astro**

```astro
---
// src/pages/index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import HeroHeading from '../components/HeroHeading';
---

<BaseLayout title="Home">
  <main class="flex min-h-screen flex-col items-center justify-center gap-8">
    <HeroHeading client:load />
    <a href="/about" class="text-blue-600 underline hover:text-blue-800">
      About →
    </a>
  </main>
</BaseLayout>
```

- [ ] **Step 2: Build and verify the page renders**

```bash
npm run build
```

Expected: `dist/index.html` generated without errors. Confirm `dist/` contains JS for the React island (file named like `HeroHeading.*.js`).

- [ ] **Step 3: Smoke-test in the browser**

```bash
npm run preview
```

Open `http://localhost:4321` in a browser. Confirm:
- Animated heading fades in on load (Motion working)
- `<Sparkles />` icon renders next to the text (Lucide working)
- Text is large and dark (Tailwind classes applied)
- Clicking "About →" navigates with a view transition (no full reload flash)

Stop the preview server.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add home page with HeroHeading island and view transition link"
```

---

## Task 11: Create About Page

**Files:**
- Create: `src/pages/about.astro`

- [ ] **Step 1: Create the about page**

```astro
---
// src/pages/about.astro
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="About">
  <main class="flex min-h-screen flex-col items-center justify-center gap-8">
    <h1 class="text-5xl font-bold text-gray-900">About</h1>
    <a href="/" class="text-blue-600 underline hover:text-blue-800">
      ← Home
    </a>
  </main>
</BaseLayout>
```

- [ ] **Step 2: Verify it builds**

```bash
npm run build
```

Expected: `dist/about/index.html` exists.

- [ ] **Step 3: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: add about page"
```

---

## Task 12: Create Blog Index Page

**Files:**
- Create: `src/pages/blog/index.astro`

- [ ] **Step 1: Create the blog index page**

```astro
---
// src/pages/blog/index.astro
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

const posts = await getCollection('blog');
---

<BaseLayout title="Blog">
  <main class="mx-auto max-w-2xl px-4 py-16">
    <h1 class="mb-8 text-4xl font-bold text-gray-900">Blog</h1>
    <ul class="space-y-4">
      {posts.map((post) => (
        <li>
          <a href={`/blog/${post.id}`} class="text-blue-600 underline hover:text-blue-800">
            {post.data.title}
          </a>
        </li>
      ))}
    </ul>
    <a href="/" class="mt-12 inline-block text-blue-600 underline hover:text-blue-800">
      ← Home
    </a>
  </main>
</BaseLayout>
```

- [ ] **Step 2: Verify it builds**

```bash
npm run build
```

Expected: `dist/blog/index.html` exists and lists the stub post.

- [ ] **Step 3: Commit**

```bash
git add src/pages/blog/index.astro
git commit -m "feat: add blog index page"
```

---

## Task 13: Create Blog Post Page

**Files:**
- Create: `src/pages/blog/[slug].astro`

- [ ] **Step 1: Create the dynamic blog post route**

```astro
---
// src/pages/blog/[slug].astro
import { getCollection, render } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---

<BaseLayout title={post.data.title}>
  <main class="mx-auto max-w-2xl px-4 py-16">
    <h1 class="mb-4 text-4xl font-bold text-gray-900">{post.data.title}</h1>
    <article class="mt-4 text-gray-700">
      <Content />
    </article>
    <a href="/blog" class="mt-12 inline-block text-blue-600 underline hover:text-blue-800">
      ← Blog
    </a>
  </main>
</BaseLayout>
```

- [ ] **Step 2: Verify the route resolves**

```bash
npm run build
```

Expected: `dist/blog/hello-world/index.html` exists and contains "This is a stub post."

- [ ] **Step 3: Verify full type-check passes**

```bash
npx astro check
```

Expected: 0 errors across all files.

- [ ] **Step 4: Commit**

```bash
git add src/pages/blog/[slug].astro
git commit -m "feat: add blog post page with dynamic routing"
```

---

## Task 14: Final Verification

- [ ] **Step 1: Full build**

```bash
npm run build
```

Expected: exits 0. `dist/` contains:
- `index.html`
- `about/index.html`
- `blog/index.html`
- `blog/hello-world/index.html`

- [ ] **Step 2: Full type-check**

```bash
npx astro check
```

Expected: 0 errors.

- [ ] **Step 3: ESLint clean**

```bash
npx eslint src/
```

Expected: exits 0.

- [ ] **Step 4: Preview all routes manually**

```bash
npm run preview
```

Check each route in the browser:
- `http://localhost:4321` — animated heading, Lucide icon, "About →" link
- `http://localhost:4321/about` — "About" heading, "← Home" link
- `http://localhost:4321/blog` — "Hello World" post listed
- `http://localhost:4321/blog/hello-world` — stub post content

Confirm view transition is visible when navigating between home and about (no flash/white-out, elements animate between pages).

Stop the preview server.

- [ ] **Step 5: Tag the scaffold complete**

```bash
git tag scaffold-complete
```
