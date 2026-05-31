import { MetadataRoute } from 'next';
import { tools } from '@/config/tools';
import { aiTools } from '@/config/aiTools';
import { locales } from '@/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devtools-hub.com';

  const routes: MetadataRoute.Sitemap = [];

  // Generate routes for each locale
  locales.forEach((locale) => {
    // Static pages
    routes.push(
      {
        url: `${siteUrl}/${locale}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
        alternates: {
          languages: Object.fromEntries(
            locales.map(l => [l, `${siteUrl}/${l}`])
          ),
        },
      },
      {
        url: `${siteUrl}/${locale}/tools`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
        alternates: {
          languages: Object.fromEntries(
            locales.map(l => [l, `${siteUrl}/${l}/tools`])
          ),
        },
      },
      {
        url: `${siteUrl}/${locale}/ai-tools`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
        alternates: {
          languages: Object.fromEntries(
            locales.map(l => [l, `${siteUrl}/${l}/ai-tools`])
          ),
        },
      },
      {
        url: `${siteUrl}/${locale}/search`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map(l => [l, `${siteUrl}/${l}/search`])
          ),
        },
      },
      {
        url: `${siteUrl}/${locale}/privacy`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.3,
        alternates: {
          languages: Object.fromEntries(
            locales.map(l => [l, `${siteUrl}/${l}/privacy`])
          ),
        },
      },
      {
        url: `${siteUrl}/${locale}/terms`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.3,
        alternates: {
          languages: Object.fromEntries(
            locales.map(l => [l, `${siteUrl}/${l}/terms`])
          ),
        },
      }
    );

    // Tool pages
    tools.forEach((tool) => {
      routes.push({
        url: `${siteUrl}/${locale}/tools/${tool.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map(l => [l, `${siteUrl}/${l}/tools/${tool.slug}`])
          ),
        },
      });
    });

    // AI tool pages
    aiTools.forEach((tool) => {
      routes.push({
        url: `${siteUrl}/${locale}/ai-tools/${tool.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map(l => [l, `${siteUrl}/${l}/ai-tools/${tool.slug}`])
          ),
        },
      });
    });
  });

  return routes;
}
