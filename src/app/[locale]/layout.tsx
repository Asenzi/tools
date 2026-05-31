import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Locale, locales } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

type LocaleParams = Promise<{ locale: Locale }>;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devtools-hub.com';

  return {
    title: {
      default: dict['home.title'],
      template: `%s | ${process.env.NEXT_PUBLIC_SITE_NAME || 'DevTools Hub'}`,
    },
    description: dict['home.description'],
    keywords: ['developer tools', 'online tools', 'json formatter', 'base64', 'uuid', 'ai tools'],
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        'en': `${siteUrl}/en`,
        'zh': `${siteUrl}/zh`,
        'x-default': `${siteUrl}/en`,
      },
    },
    openGraph: {
      locale,
      alternateLocale: locales.filter(l => l !== locale),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: LocaleParams;
}) {
  const { locale } = await params;

  return (
    <>
      <Header locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
    </>
  );
}
