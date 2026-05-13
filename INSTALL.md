# Install Manifest — `claude-nextjs-starter`

> **For Claude Code, not humans.** This file is the canonical install plan. A human reading the repo wants [README.md](README.md). Claude Code is invoked via the "Smart install" prompt in the README and pointed here to follow the steps below.

The starter is the overlay + Next.js scaffold + tooling + shadcn primitives + demo pages. This manifest installs whichever subset fits the user's situation.

Walk the steps in order. Do not skip STEP 1.

---

## STEP 1 — Pre-flight: ccusage statusline (per-user)

Turn on per-turn token visibility BEFORE the install, so the user can see the install's cost in their statusline as you work.

1. Read `~/.claude/settings.json` (create the file as `{}` if missing — don't touch existing keys).
2. If `"_ccusageDeclined": true` exists at the top level, skip the rest of STEP 1 silently and go to STEP 2.
3. If a `statusLine` block already exists, print it to the user and ask whether to swap it for the ccusage version below. Wait for an answer.
4. If no `statusLine` exists, tell the user about ccusage in two sentences (MIT, local-only, no telemetry; reads `~/.claude/projects/*.jsonl` for per-turn cost, burn rate, context %). Propose adding exactly this block (merging — never overwriting other keys):

   ```json
   "statusLine": {
     "type": "command",
     "command": "npx -y ccusage statusline"
   }
   ```

5. Wait for yes/no.
   - **YES:** edit `~/.claude/settings.json` to add the `statusLine` block (preserve all other keys with strict JSON formatting). Tell the user to refresh Claude Code's statusline once.
   - **NO:** edit `~/.claude/settings.json` to add `"_ccusageDeclined": true` so this step skips silently in future installs. Proceed without ccusage.
6. Mention that swapping `npx -y` for `bunx` is faster if the user has Bun.

This step is the only way the user finds out ccusage exists. Don't skip it because the install feels like the real work — for the user, seeing the cost land in real time IS the install.

---

## STEP 2 — Detect directory state

Run `ls -la`. Classify:

- **EMPTY OR NEARLY EMPTY** — no `package.json`, or only `README.md` / `LICENSE` / `.git` present. → STEP 3A.
- **EXISTING PROJECT** — `package.json` present (any framework). → STEP 3B.

---

## STEP 3A — Empty directory: clone & trim

1. Ask the user: "What are you building? (1 sentence is fine.)"
2. Clone the starter into a temp dir, copy contents over, discard the temp clone's `.git`:
   ```sh
   git clone --depth=1 https://github.com/anuj-shrestha/claude-nextjs-starter.git /tmp/cnst-tmp
   ```
   If a local `README.md`/`LICENSE` exists, ask before overwriting.
3. Based on the user's one-sentence description, propose a **trim table** to remove dead weight. Defaults:

   | Path | Default action | Skip the deletion only when |
   |---|---|---|
   | `src/app/a11y-broken/` | Delete | User said "learning" or "sandbox" |
   | `src/app/review-bait/` | Delete | User said "learning" or "sandbox" |
   | `src/app/components/` | Delete | User said "learning" or "sandbox" |
   | `src/app/opengraph-image.tsx` | Delete | User said they want OG previews |
   | `src/components/ui/button.test.tsx` | Delete | User said they want a reference test |
   | `tests/e2e/home.spec.ts` | Delete | User said they want a reference e2e test |
   | `scripts/sync-overlay.sh` | Delete (it's for the starter's maintainers) | Never keep — always delete |
   | `src/app/page.tsx` | Reset to a minimal `<h1>` placeholder | Never keep the demo landing |
   | `src/app/layout.tsx` metadata | Reset title/description to the user's project name | Never keep the demo metadata |
   | `src/components/ui/input.tsx` | Delete (user can re-add via `shadcn add input`) | User said the project has forms |

4. Show the trim table. **Wait for user approval before deleting anything.**
5. After trim: rename the package in `package.json` to the user's project name, run `pnpm install`, then `pnpm typecheck && pnpm build` to verify clean.

---

## STEP 3B — Existing project: audit & merge

Read the project state:
- `package.json` (framework, scripts, deps)
- `tsconfig.json` (TS config, path aliases)
- `src/` or `app/` contents (router type, sample of conventions)
- Any existing `CLAUDE.md`, `.claude/`, `.mcp.json`, tooling configs

Fetch starter files from `https://raw.githubusercontent.com/anuj-shrestha/claude-nextjs-starter/main/<path>` as needed.

For each piece below, recommend one of:
- **Apply as-is** — fits unchanged.
- **Apply with tweak: \<what\>** — fits but needs an adjustment.
- **Skip: \<why\>** — doesn't fit.

Output **one** recommendation table grouped by category. Wait for user confirmation. Apply only approved rows.

### Overlay pieces (also shippable standalone from claude-nextjs-config)

| ID | Source path | Default fit |
|---|---|---|
| `CLAUDE.md` | `CLAUDE.md` | Apply if no existing CLAUDE.md; otherwise offer merge |
| 6 subagents | `.claude/agents/*.md` | One row per agent. `designer` only if Tailwind. |
| 6 slash commands | `.claude/commands/*.md` | One row per command, paired with its agent |
| `design-discipline` skill | `.claude/skills/design-discipline/SKILL.md` | Apply if project uses Tailwind |
| 3 hooks | `.claude/hooks/*.js` | Apply per hook (env-block universal, format-on-edit requires prettier/eslint, typecheck requires TS) |
| Settings + permissions | `.claude/settings.json` | Apply (merge with existing if any) |
| 4 MCP servers | `.mcp.json` server entries | Per server: next-devtools (Next.js), playwright (if installed), shadcn-ui (if shadcn), context7 (universal) |

### Tooling pieces

| ID | Source path / target | Default fit |
|---|---|---|
| Prettier config | `.prettierrc`, `.prettierignore` | Skip if user has prettier configured; otherwise apply |
| Prettier Tailwind plugin | `prettier-plugin-tailwindcss` dep | Apply if user uses Tailwind and has Prettier |
| Vitest setup | `vitest.config.ts`, `vitest.setup.ts`, Vitest/RTL/jsdom deps | Skip if user has another unit test runner; otherwise apply |
| Playwright setup | `playwright.config.ts`, `@playwright/test` dep | Skip if user has another e2e runner; otherwise apply |
| `package.json` scripts | `format`, `format:check`, `typecheck`, `test`, `test:watch`, `test:e2e` | Add missing scripts; skip ones already present |
| ESLint `.claude/**` ignore | `eslint.config.mjs` | Apply if project has ESLint and uses Node-CJS hooks |

### shadcn/ui pieces

| ID | Source path | Default fit |
|---|---|---|
| `components.json` | `components.json` | If user doesn't have shadcn yet, recommend running `pnpm dlx shadcn@latest init -d -y` instead of copying — fresh init pulls current versions and wires Tailwind correctly. |
| `cn` helper | `src/lib/utils.ts` | Created by shadcn init; only copy if user opts out of init |
| Button, Card, Input primitives | `src/components/ui/*.tsx` | Recommend `pnpm dlx shadcn@latest add button card input -y` instead of copying. Drop `input` if the user's project has no forms. |

### Demo pieces

Almost always **skip**. Flag only if the user is new to Claude Code and wants on-disk references.

| ID | Source path | Default fit |
|---|---|---|
| Landing | `src/app/page.tsx` | Skip — every project wants its own landing |
| Components showcase | `src/app/components/page.tsx` | Skip unless "learning" |
| a11y demo | `src/app/a11y-broken/page.tsx` | Skip unless "learning" |
| Review demo | `src/app/review-bait/page.tsx` | Skip unless "learning" |
| OG image | `src/app/opengraph-image.tsx` | Skip unless user wants Next.js dynamic OG |
| Reference unit test | `src/components/ui/button.test.tsx` | Skip unless "learning" |
| Reference e2e test | `tests/e2e/home.spec.ts` | Skip unless "learning" |

**Tweak factors to consider on every row:** package manager, App vs Pages Router, existing tooling (don't reinstall — recommend config merges), Tailwind version, whether path alias is `@/`, whether user already has CLAUDE.md/agents that would conflict.

**After approval:** copy/merge approved files. For shadcn primitives, prefer running `shadcn init` + `shadcn add` over copying. End with `pnpm typecheck` to confirm clean.
