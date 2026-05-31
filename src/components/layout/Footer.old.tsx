// @ts-nocheck
import Link from 'next/link';
import { Container } from './Container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/50 mt-auto">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="font-bold text-lg mb-4">DevTools Hub</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Professional developer tools and AI generators. Free, fast, and privacy-focused.
                All tools run in your browser.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Tools</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/tools"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Developer Tools
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ai-tools"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    AI Tools
                  </Link>
                </li>
                <li>
                  <Link
                    href="/search"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Search
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {currentYear} DevTools Hub. All rights reserved.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
