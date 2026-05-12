/**
 * This page contains intentional code-quality issues for the code-reviewer
 * subagent to find. Open it in Claude Code and run
 * `/review src/app/review-bait/page.tsx` to see them flagged.
 *
 * The issues are real ones a senior reviewer would call out — not lint
 * violations, which are caught by tooling already. The fixed version lives
 * in a follow-up commit; check `git log` for this file.
 */
import Link from 'next/link'

// Issue 1: hardcoded URL that should be an env var
const API_URL = 'https://jsonplaceholder.typicode.com'

// Issue 2: magic number `100` for cents conversion + magic `0.0875` tax rate buried below
function formatPrice(cents: number) {
  return '$' + (cents / 100).toFixed(2)
}

// Issue 3: a function doing too many unrelated things — formatting, summation,
// tax calculation, and shape conversion all in one place. Should be 3-4 smaller fns.
function buildOrderSummary(
  items: { name: string; cents: number; qty: number }[],
  discount: number,
) {
  const lines = []
  let subtotal = 0
  for (const item of items) {
    subtotal += item.cents * item.qty
    lines.push(item.name + ' x' + item.qty + ' = ' + formatPrice(item.cents * item.qty))
  }
  const total = subtotal - discount * 100
  const tax = Math.round(total * 0.0875)
  return {
    lines,
    subtotal: formatPrice(subtotal),
    tax: formatPrice(tax),
    total: formatPrice(total + tax),
  }
}

// Issue 4: no caching strategy declared (defaults can change between Next versions),
// no error handling, no type for the response shape — a reviewer would flag all three.
async function fetchFeatured() {
  const res = await fetch(API_URL + '/posts?_limit=3')
  const data = await res.json()
  return data
}

export default async function ReviewBaitPage() {
  // Issue 5: `featured` is implicitly `any` because fetchFeatured doesn't declare a return type.
  const featured = await fetchFeatured()

  const summary = buildOrderSummary(
    [
      { name: 'Widget', cents: 1999, qty: 2 },
      { name: 'Gadget', cents: 4999, qty: 1 },
    ],
    5,
  )

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <nav className="mb-8">
        <Link href="/" className="text-sm text-zinc-500 underline underline-offset-2">
          ← back to home
        </Link>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">review-bait</h1>
        <p className="mt-3 text-zinc-600">
          Five intentional code-quality issues. Run <code>/review</code> on this file.
        </p>
      </header>

      <section className="mb-10">
        <h2 className="mb-3 text-lg font-semibold">Order summary</h2>
        <ul className="rounded-lg border border-zinc-200 p-4 text-sm">
          {summary.lines.map((line) => (
            <li key={line} className="font-mono">
              {line}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-zinc-600">
          Subtotal {summary.subtotal} · Tax {summary.tax} · Total {summary.total}
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Featured ({featured?.length ?? 0})</h2>
        <p className="text-sm text-zinc-500">
          See <code>fetchFeatured</code> at the top of this file for what a reviewer should flag.
        </p>
      </section>
    </main>
  )
}
