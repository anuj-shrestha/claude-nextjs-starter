# claude-nextjs-starter

**A runnable Next.js 16 + TypeScript app with [`claude-nextjs-config`](https://github.com/anuj-shrestha/claude-nextjs-config) applied.** Browse the deployed demo, read the source, see what the overlay actually produces — then drop the overlay into your own repo.

> [**→ Live demo**](https://claude-nextjs-starter.vercel.app) &nbsp;·&nbsp; [**→ The overlay itself**](https://github.com/anuj-shrestha/claude-nextjs-config)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fanuj-shrestha%2Fclaude-nextjs-starter&project-name=claude-nextjs-starter&repository-name=claude-nextjs-starter)

---

## What this is

This repo is the **storefront**, not the product. It exists so you can see `claude-nextjs-config` working on a real Next.js app before adopting it.

The product is the overlay — a small set of `.claude/` files, `CLAUDE.md`, and `.mcp.json` that you copy into _your_ Next.js project. This starter just shows what that looks like in practice.

| Layer                                      | Source of truth                                                                                                           |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `CLAUDE.md`, `.claude/`, `.mcp.json`       | [`claude-nextjs-config`](https://github.com/anuj-shrestha/claude-nextjs-config) — copied in via `scripts/sync-overlay.sh` |
| Next.js app code (`src/`, `public/`, etc.) | This repo                                                                                                                 |

If you fork this starter, you'll always want to pull overlay updates from the source repo — don't edit `.claude/` files here.

---

## What's in the demo

A small, intentional set of pages that exercise every piece of the overlay:

- **Landing page (`/`)** — explains the project and links to the config repo.
- **`/components` page** — shows the shadcn primitives (Button, Card, Input) installed during scaffold. Use `/new-component <Name>` to add more.
- **`/a11y-broken` page** — five intentional WCAG 2.1 AA failures: `<div onClick>` button, image without `alt`, input without label, low-contrast text, color-only "required" indicator. Run `/a11y src/app/a11y-broken/page.tsx` in Claude Code to see the auditor find them. The fix lives in a follow-up commit — `git log src/app/a11y-broken/` to find it.
- **`/review-bait` page** — five intentional code-quality issues: hardcoded URL, magic numbers, an overgrown function, unhandled `fetch`, implicit `any` data shape. Run `/review src/app/review-bait/page.tsx` to see them flagged. Same follow-up-commit pattern.
- **`src/components/ui/button.test.tsx`** — a Vitest unit test demonstrating the test setup. Add tests for new components with `/write-test`.

---

## Smart install (recommended)

Don't want to copy everything? Open your project in **Claude Code** and paste this prompt. Claude will read your repo, fetch the starter's files from GitHub, and tell you which pieces fit your stack — then apply only what you approve.

```
Audit this project to decide which parts of the claude-nextjs-starter setup
fit. First, read my package.json, tsconfig.json, the contents of src/ or
app/, and any existing CLAUDE.md / .claude/ / .mcp.json / tooling configs.
Then fetch the relevant files from
https://github.com/anuj-shrestha/claude-nextjs-starter (use
raw.githubusercontent.com for individual files).

For each piece below, give me one of:
- "Apply as-is" — fits this project unchanged.
- "Apply with tweak: <what>" — fits but needs an adjustment (different
  package manager, alternate path alias, missing dep, etc.).
- "Skip: <why>" — doesn't fit this project.

Pieces to evaluate, grouped:

**Overlay (Claude Code config)** — also shippable standalone from
https://github.com/anuj-shrestha/claude-nextjs-config:
- CLAUDE.md
- Each of the 5 subagents in .claude/agents/
- Each of the 5 slash commands in .claude/commands/
- Each of the 3 hooks in .claude/hooks/
- .claude/settings.json
- Each of the 4 MCP servers in .mcp.json

**Tooling configs:**
- .prettierrc + .prettierignore + the prettier-plugin-tailwindcss dep
- vitest.config.ts + vitest.setup.ts + Vitest/RTL/jsdom deps
- playwright.config.ts + @playwright/test dep
- package.json scripts (format, format:check, typecheck, test, test:watch, test:e2e)
- eslint.config.mjs adjustments (the `.claude/**` ignore)

**shadcn/ui setup:**
- components.json
- src/lib/utils.ts (cn helper)
- src/components/ui/button.tsx, card.tsx, input.tsx
- If I don't have shadcn yet: recommend running
  `pnpm dlx shadcn@latest init -d -y` followed by
  `pnpm dlx shadcn@latest add button card input -y` instead of copying —
  fresh init pulls current versions and wires Tailwind correctly.

**Demo references** — almost always skip; flag only if I appear new to
Claude Code and want a working reference on disk:
- src/app/page.tsx (landing)
- src/app/components/page.tsx
- src/app/a11y-broken/page.tsx (intentional WCAG fails for /a11y)
- src/app/review-bait/page.tsx (intentional code smells for /review)
- src/app/opengraph-image.tsx
- src/components/ui/button.test.tsx (reference unit test)
- tests/e2e/home.spec.ts (reference e2e test)

Factor in: framework version (this repo assumes Next.js 16 App Router),
package manager, existing tooling I already have (don't reinstall
prettier/vitest/playwright if they're there — recommend config merges
instead), router type, whether I use Tailwind/shadcn, and what existing
CLAUDE.md/agents would conflict.

Output a single recommendation table grouped by section. Don't copy or
modify any files yet. After I confirm the table, apply only the rows I
approve, adapting tweaks where I specified them.
```

**What Claude will do:**

1. Read your project to understand the stack and existing tooling.
2. Fetch the starter's files from GitHub.
3. Show a per-piece table: apply / tweak / skip, grouped by overlay /
   tooling / shadcn / demos.
4. Wait for your go-ahead, then apply only what you confirmed — including
   running `shadcn init` or `pnpm add` where that's cleaner than copying.

If you'd rather grab the whole starter and trim later, the manual path
below is faster.

---

## Try it locally (manual)

If you already know you want the starter, the manual path is:

```bash
git clone https://github.com/anuj-shrestha/claude-nextjs-starter.git
cd claude-nextjs-starter
pnpm install
pnpm dev
```

Then open the repo in **Claude Code** and try:

```
/agents              # five agents should be listed
/                    # five custom commands appear in the menu
/mcp                 # MCP servers should connect
/a11y src/app/a11y-broken/page.tsx
/review src/app/review-bait/page.tsx
/new-component Card
```

If any of those don't work, that's a bug — please open an issue.

---

## Stack

- Next.js 16 (App Router)
- TypeScript, strict mode
- Tailwind CSS
- shadcn/ui (Button, Card, Input pre-installed)
- Vitest (unit) + Playwright (E2E)
- Prettier + ESLint
- pnpm
- Deployed on Vercel

---

## Project structure

```
.
├── .claude/              # overlay — DO NOT edit here, edit in claude-nextjs-config
│   ├── agents/
│   ├── commands/
│   └── settings.json
├── .mcp.json             # overlay — same rule
├── CLAUDE.md             # overlay (Project Context section is the only local edit)
├── scripts/
│   └── sync-overlay.sh   # pulls latest overlay from claude-nextjs-config
├── src/
│   ├── app/              # App Router pages
│   ├── components/       # shadcn + custom components
│   └── lib/
├── tests/
│   ├── unit/             # Vitest
│   └── e2e/              # Playwright
└── package.json
```

---

## Adopting the overlay yourself

**You don't need to fork this repo.** This is a demo. To use the overlay in your own Next.js project:

```bash
cd path/to/your/nextjs/app
npx degit anuj-shrestha/claude-nextjs-config .
```

See the [overlay README](https://github.com/anuj-shrestha/claude-nextjs-config) for the full reference.

---

## Syncing overlay updates (maintainers)

When `claude-nextjs-config` ships changes, pull them in:

```bash
./scripts/sync-overlay.sh ../claude-nextjs-config
pnpm dev   # verify locally
git commit -am "sync overlay @ <commit-sha>"
```

The script copies `CLAUDE.md`, `.claude/`, and `.mcp.json` from a local checkout of the config repo, preserves the **Project Context** section of `CLAUDE.md`, and refuses to run if there are uncommitted changes in those paths (so you don't lose local edits by accident).

---

## License

MIT
