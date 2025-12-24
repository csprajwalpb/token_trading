import { TokenTable } from '@/components/features/TokenTable/TokenTable';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-4 md:p-8 bg-background text-foreground gap-6">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Token Discovery
          </h1>
          <p className="text-muted-foreground">
            Live real-time feed of new token pairs and migrations.
          </p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tokens..."
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-8"
            />
          </div>
          <Button>Connect Wallet</Button>
        </div>
      </header>

      <section className="flex-1">
        <TokenTable />
      </section>

      <footer className="text-center text-xs text-muted-foreground py-4">
        Axiom Trade Replica - Built with Next.js 14 & Tailwind
      </footer>
    </main>
  );
}
