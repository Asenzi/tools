import { Tool } from '@/config/tools';
import { AiTool } from '@/config/aiTools';

interface MetaTagsProps {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
}

export function generateMetaTags({
  title,
  description,
  keywords = [],
  canonical,
  ogImage = '/og-image.png'
}: MetaTagsProps) {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'DevTools Hub';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devtools-hub.com';

  return {
    title: `${title} | ${siteName}`,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url: canonical || siteUrl,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteName}`,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: canonical || siteUrl,
    },
  };
}

export function generateToolSchema(tool: Tool | AiTool, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: 'DeveloperApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    operatingSystem: 'Any',
    url: url,
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateOrganizationSchema() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'DevTools Hub';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devtools-hub.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [],
  };
}
