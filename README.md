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

## Try it locally

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
