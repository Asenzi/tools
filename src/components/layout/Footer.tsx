import Link from 'next/link';
import { Container } from './Container';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/50 mt-auto">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="font-bold text-lg mb-4">DevTools Hub</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                {dict['footer.description']}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{dict['footer.tools']}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href={`/${locale}/tools`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {dict['nav.tools']}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/ai-tools`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {dict['nav.aiTools']}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/search`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {dict['nav.search']}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{dict['footer.legal']}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href={`/${locale}/privacy`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {dict['footer.privacy']}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/terms`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {dict['footer.terms']}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {currentYear} DevTools Hub. {dict['footer.rights']}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
