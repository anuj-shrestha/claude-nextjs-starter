#!/usr/bin/env bash
#
# Sync overlay files (CLAUDE.md, .claude/, .mcp.json) from a local checkout
# of claude-nextjs-config into this starter repo.
#
# The starter's "## Project Context" section is preserved across sync —
# everything else in CLAUDE.md is overwritten by the overlay's version.
#
# Usage:
#   scripts/sync-overlay.sh [path/to/claude-nextjs-config]
#
# Default config repo path: ../claude-nextjs-config (sibling directory).

set -euo pipefail

CONFIG_REPO="${1:-../claude-nextjs-config}"

# Resolve to an absolute path (portable across macOS/Linux).
CONFIG_REPO="$(cd "$CONFIG_REPO" 2>/dev/null && pwd || true)"

if [ -z "$CONFIG_REPO" ] || [ ! -d "$CONFIG_REPO" ]; then
  echo "Error: config repo path does not exist or is not a directory: $1" >&2
  exit 1
fi

if [ ! -f "$CONFIG_REPO/CLAUDE.md" ] || [ ! -d "$CONFIG_REPO/.claude" ] || [ ! -f "$CONFIG_REPO/.mcp.json" ]; then
  echo "Error: $CONFIG_REPO doesn't look like claude-nextjs-config." >&2
  echo "Expected files: CLAUDE.md, .claude/, .mcp.json" >&2
  exit 1
fi

# Refuse to clobber uncommitted local edits to the synced paths.
DIRTY=$(git status --porcelain CLAUDE.md .claude .mcp.json 2>/dev/null || true)
if [ -n "$DIRTY" ]; then
  echo "Error: you have uncommitted changes in CLAUDE.md, .claude/, or .mcp.json:" >&2
  echo "$DIRTY" >&2
  echo "" >&2
  echo "Commit or stash them first, then rerun." >&2
  exit 1
fi

echo "Syncing from: $CONFIG_REPO"
echo ""

# Sync .claude/ verbatim. --delete removes files that were removed upstream.
echo "→ .claude/"
rsync -a --delete "$CONFIG_REPO/.claude/" .claude/

# Sync .mcp.json verbatim.
echo "→ .mcp.json"
cp "$CONFIG_REPO/.mcp.json" .mcp.json

# Sync CLAUDE.md, preserving the local Project Context section.
echo "→ CLAUDE.md (preserving Project Context)"
node - "$CONFIG_REPO/CLAUDE.md" CLAUDE.md <<'NODE'
const fs = require('node:fs')
const [overlayPath, starterPath] = process.argv.slice(2)

const overlay = fs.readFileSync(overlayPath, 'utf8')
const starter = fs.readFileSync(starterPath, 'utf8')

const sectionRe = /(## Project Context\n)([\s\S]*?)(\n## )/

const starterMatch = starter.match(sectionRe)
if (!starterMatch) {
  console.error('Error: could not find "## Project Context" section in current CLAUDE.md.')
  console.error('Either restore that heading, or sync manually this once.')
  process.exit(1)
}
const starterContext = starterMatch[2]

const merged = overlay.replace(sectionRe, `$1${starterContext}$3`)
if (merged === overlay) {
  console.error('Error: overlay CLAUDE.md has no "## Project Context" section to replace.')
  process.exit(1)
}

fs.writeFileSync(starterPath, merged)
NODE

echo ""
echo "Sync complete. Review changes:"
echo "  git diff CLAUDE.md .claude .mcp.json"
echo ""
echo "Then run a quick smoke check before committing:"
echo "  pnpm typecheck && pnpm lint && pnpm test"
