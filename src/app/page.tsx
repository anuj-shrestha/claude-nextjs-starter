import Link from 'next/link'

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <header className="mb-12">
        <p className="mb-3 text-sm font-medium tracking-wide text-zinc-500 uppercase">
          claude-nextjs-starter
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          The{' '}
          <Link
            href="https://github.com/anuj-shrestha/claude-nextjs-config"
            className="underline decoration-zinc-400 underline-offset-4 hover:decoration-zinc-900"
          >
            claude-nextjs-config
          </Link>{' '}
          overlay, applied to a clean Next.js 16 scaffold.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-zinc-600">
          This is the demo. The product is the overlay. Read the source, run the slash commands, and
          decide whether to drop the overlay into your own repo.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">What&apos;s wired up</h2>
        <dl className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 p-4">
            <dt className="text-sm font-semibold text-zinc-900">6 subagents</dt>
            <dd className="mt-1 text-sm text-zinc-600">
              code-reviewer, test-writer, a11y-auditor, designer, next-debugger, refactorer.
              Auto-routed by prompt.
            </dd>
          </div>
          <div className="rounded-lg border border-zinc-200 p-4">
            <dt className="text-sm font-semibold text-zinc-900">6 slash commands</dt>
            <dd className="mt-1 text-sm text-zinc-600">
              /new-component, /new-route, /write-test, /review, /a11y, /design-review.
            </dd>
          </div>
          <div className="rounded-lg border border-zinc-200 p-4">
            <dt className="text-sm font-semibold text-zinc-900">1 skill</dt>
            <dd className="mt-1 text-sm text-zinc-600">
              design-discipline auto-activates on UI/component work.
            </dd>
          </div>
          <div className="rounded-lg border border-zinc-200 p-4">
            <dt className="text-sm font-semibold text-zinc-900">3 hooks</dt>
            <dd className="mt-1 text-sm text-zinc-600">
              Auto-format on edit, block .env writes, remind to typecheck.
            </dd>
          </div>
          <div className="rounded-lg border border-zinc-200 p-4">
            <dt className="text-sm font-semibold text-zinc-900">4 MCP servers</dt>
            <dd className="mt-1 text-sm text-zinc-600">
              next-devtools, playwright, shadcn-ui, context7.
            </dd>
          </div>
        </dl>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Try it</h2>
        <ul className="space-y-3">
          <li>
            <Link
              href="/components"
              className="block rounded-lg border border-zinc-200 p-4 hover:border-zinc-400"
            >
              <span className="block font-medium">/components</span>
              <span className="block text-sm text-zinc-600">
                shadcn primitives (Button, Card, Input) installed during scaffold.
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/a11y-broken"
              className="block rounded-lg border border-zinc-200 p-4 hover:border-zinc-400"
            >
              <span className="block font-medium">/a11y-broken</span>
              <span className="block text-sm text-zinc-600">
                Deliberately fails WCAG 2.1 AA. Open in Claude Code and run{' '}
                <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs">/a11y</code> on
                it.
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/review-bait"
              className="block rounded-lg border border-zinc-200 p-4 hover:border-zinc-400"
            >
              <span className="block font-medium">/review-bait</span>
              <span className="block text-sm text-zinc-600">
                Has code-quality issues for{' '}
                <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs">/review</code>{' '}
                to flag.
              </span>
            </Link>
          </li>
        </ul>
      </section>

      <footer className="border-t border-zinc-200 pt-8 text-sm text-zinc-500">
        <p>
          Source:{' '}
          <Link
            href="https://github.com/anuj-shrestha/claude-nextjs-starter"
            className="underline underline-offset-2"
          >
            github.com/anuj-shrestha/claude-nextjs-starter
          </Link>
          . Built with{' '}
          <Link
            href="https://github.com/anuj-shrestha/claude-nextjs-config"
            className="underline underline-offset-2"
          >
            claude-nextjs-config
          </Link>
          .
        </p>
      </footer>
    </main>
  )
}
