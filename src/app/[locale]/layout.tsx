import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Locale, locales } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const dict = getDictionary(params.locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devtools-hub.com';

  return {
    title: {
      default: dict['home.title'],
      template: `%s | ${process.env.NEXT_PUBLIC_SITE_NAME || 'DevTools Hub'}`,
    },
    description: dict['home.description'],
    keywords: ['developer tools', 'online tools', 'json formatter', 'base64', 'uuid', 'ai tools'],
    alternates: {
      canonical: `${siteUrl}/${params.locale}`,
      languages: {
        'en': `${siteUrl}/en`,
        'zh': `${siteUrl}/zh`,
        'x-default': `${siteUrl}/en`,
      },
    },
    openGraph: {
      locale: params.locale,
      alternateLocale: locales.filter(l => l !== params.locale),
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  return (
    <>
      <Header locale={params.locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={params.locale} />
    </>
  );
}
