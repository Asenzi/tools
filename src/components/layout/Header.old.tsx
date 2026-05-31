import Link from 'next/link';
import { Container } from './Container';
import { Code2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Code2 className="h-6 w-6" />
              <span className="font-bold text-lg">DevTools Hub</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/tools"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Developer Tools
              </Link>
              <Link
                href="/ai-tools"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                AI Tools
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/search">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
