'use client'

/**
 * This page deliberately violates WCAG 2.1 AA in five ways.
 * Open it in Claude Code and run `/a11y src/app/a11y-broken/page.tsx`
 * to see the a11y-auditor subagent find each one.
 *
 * Do NOT use this page as a reference. The fixed version lives in
 * a follow-up commit — run `git log --oneline src/app/a11y-broken/`
 * to find it, then `git show <sha>` to read the diff.
 *
 * Why `'use client'`? Because Issue #1 (div-with-onClick) requires an
 * event handler, and event handlers only work in client components.
 * That's a Next.js architectural constraint, not an a11y issue.
 */
import Link from 'next/link'

export default function A11yBrokenPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <nav className="mb-8">
        <Link href="/" className="text-sm text-zinc-500 underline underline-offset-2">
          ← back to home
        </Link>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">a11y-broken</h1>
        <p className="mt-3 text-zinc-600">
          Five intentional WCAG 2.1 AA failures. Run <code>/a11y</code> on this file.
        </p>
      </header>

      <section className="mb-10 space-y-6">
        {/* Issue 1: div-as-button — keyboard inaccessible, no role, no key handler */}
        <div
          onClick={() => alert('clicked')}
          className="inline-block cursor-pointer rounded bg-zinc-900 px-4 py-2 text-white"
        >
          Submit
        </div>

        {/* Issue 2: image with no alt attribute */}
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text -- intentional demo */}
        <img src="/next.svg" width={120} height={24} />

        {/* Issue 3: input with no associated label */}
        <input
          type="email"
          placeholder="email"
          className="w-full rounded border border-zinc-300 px-3 py-2"
        />

        {/* Issue 4: text below 4.5:1 contrast on white */}
        <p className="text-zinc-300">
          This paragraph fails contrast. zinc-300 (#d4d4d8) on white is roughly 1.6:1.
        </p>

        {/* Issue 5: required field signaled by color alone */}
        <form>
          <label className="mb-2 block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full rounded border-2 border-red-500 px-3 py-2"
            placeholder="required"
          />
        </form>
      </section>
    </main>
  )
}
