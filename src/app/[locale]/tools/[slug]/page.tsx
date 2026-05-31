import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { AdSlot } from '@/components/ads/AdSlot';
import { tools, getToolBySlug } from '@/config/tools';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { StructuredData } from '@/components/seo/StructuredData';
import { generateToolSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import * as ToolComponents from '@/components/tools';
import * as Icons from 'lucide-react';
import { Code2 } from 'lucide-react';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

type ToolPageParams = Promise<{ locale: Locale; slug: string }>;

export async function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];
  const locales: Locale[] = ['en', 'zh'];

  locales.forEach((locale) => {
    tools.forEach((tool) => {
      params.push({ locale, slug: tool.slug });
    });
  });

  return params;
}

export async function generateMetadata({ params }: { params: ToolPageParams }) {
  const { locale, slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  const content = tool.content[locale];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devtools-hub.com';

  return {
    title: `${content.name} - Free Online Tool`,
    description: content.description,
    alternates: {
      canonical: `${siteUrl}/${locale}/tools/${tool.slug}`,
      languages: {
        'en': `${siteUrl}/en/tools/${tool.slug}`,
        'zh': `${siteUrl}/zh/tools/${tool.slug}`,
      },
    },
  };
}

export default async function ToolPage({ params }: { params: ToolPageParams }) {
  const { locale, slug } = await params;
  const dict = getDictionary(locale);
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const content = tool.content[locale];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devtools-hub.com';
  const url = `${siteUrl}/${locale}/tools/${tool.slug}`;

  const breadcrumbItems = [
    { name: dict['nav.tools'], url: `/${locale}/tools` },
    { name: content.name, url: `/${locale}/tools/${tool.slug}` },
  ];

  const ToolComponent = (ToolComponents as any)[tool.component];
  const Icon = (Icons as any)[tool.icon] || Code2;

  return (
    <>
      <StructuredData data={generateToolSchema({ ...tool, ...content } as any, url)} />
      <StructuredData data={generateFAQSchema(content.faqs)} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbItems.map(item => ({
        name: item.name,
        url: `${siteUrl}${item.url}`
      })))} />

      <div className="py-12">
        <Container>
          <Breadcrumb items={breadcrumbItems} />

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Icon className="h-8 w-8" />
              </div>
              <h1 className="text-4xl font-bold">{content.name}</h1>
            </div>
            <p className="text-xl text-muted-foreground">{content.description}</p>
          </div>

          <div className="mb-12">
            <AdSlot
              slot="5144410849"
              className="overflow-hidden rounded-xl border bg-card p-4"
            />
          </div>

          <div className="mb-12">
            {ToolComponent ? <ToolComponent /> : <div>Tool component not found</div>}
          </div>

          <div className="mb-12">
            <AdSlot
              slot="3073615426"
              format="fluid"
              responsive={false}
              layoutKey="-gw-3+1f-3d+2z"
              className="overflow-hidden rounded-xl border bg-card p-4"
            />
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{dict['tool.howToUse']}</h2>
            <Card>
              <CardContent className="pt-6">
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li>{dict['tool.howToUse.step1']}</li>
                  <li>{dict['tool.howToUse.step2']}</li>
                  <li>{dict['tool.howToUse.step3']}</li>
                  <li>{dict['tool.howToUse.step4']}</li>
                </ol>
              </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{dict['tool.useCases']}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {content.useCases.map((useCase, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground">{useCase}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{dict['tool.faq']}</h2>
            <div className="space-y-4">
              {content.faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <div className="mb-12">
            <AdSlot
              slot="1431715324"
              className="overflow-hidden rounded-xl border bg-card p-4"
            />
          </div>

          {tool.relatedTools.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">{dict['tool.relatedTools']}</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {tool.relatedTools.map((relatedSlug) => {
                  const relatedTool = getToolBySlug(relatedSlug);
                  if (!relatedTool) return null;
                  const relatedContent = relatedTool.content[locale];
                  const RelatedIcon = (Icons as any)[relatedTool.icon] || Code2;
                  return (
                    <Link key={relatedSlug} href={`/${locale}/tools/${relatedSlug}`}>
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <RelatedIcon className="h-5 w-5" />
                            <CardTitle className="text-base">{relatedContent.name}</CardTitle>
                          </div>
                        </CardHeader>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </Container>
      </div>
    </>
  );
}
