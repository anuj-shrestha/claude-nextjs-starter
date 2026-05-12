import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function ComponentsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <nav className="mb-8">
        <Link href="/" className="text-sm text-zinc-500 underline underline-offset-2">
          ← back to home
        </Link>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">Components</h1>
        <p className="mt-3 text-zinc-600">
          The shadcn primitives installed during scaffold. Use{' '}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm">
            /new-component &lt;Name&gt;
          </code>{' '}
          to add more.
        </p>
      </header>

      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold">Button</h2>
        <div className="flex flex-wrap gap-3 rounded-lg border border-zinc-200 p-6">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold">Card</h2>
        <Card>
          <CardHeader>
            <CardTitle>Card title</CardTitle>
            <CardDescription>A short, supporting line of context for the card.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-600">
              Card content goes here. The Card primitive ships from shadcn with semantic header,
              title, description, and content slots.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold">Input</h2>
        <div className="rounded-lg border border-zinc-200 p-6">
          <label htmlFor="demo-email" className="mb-2 block text-sm font-medium text-zinc-700">
            Email
          </label>
          <Input id="demo-email" type="email" placeholder="you@example.com" />
          <p className="mt-2 text-xs text-zinc-500">
            Inputs ship with a label-friendly API. The overlay&apos;s a11y-auditor will flag any
            input without an associated label.
          </p>
        </div>
      </section>
    </main>
  )
}
