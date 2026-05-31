import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { aiTools, getAiToolBySlug } from '@/config/aiTools';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { StructuredData } from '@/components/seo/StructuredData';
import { generateToolSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import * as AiToolComponents from '@/components/ai-tools';
import * as Icons from 'lucide-react';
import { Sparkles } from 'lucide-react';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

export async function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];
  const locales: Locale[] = ['en', 'zh'];

  locales.forEach((locale) => {
    aiTools.forEach((tool) => {
      params.push({ locale, slug: tool.slug });
    });
  });

  return params;
}

export async function generateMetadata({ params }: { params: { locale: Locale; slug: string } }) {
  const tool = getAiToolBySlug(params.slug);
  if (!tool) return {};

  const content = tool.content[params.locale];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devtools-hub.com';

  return {
    title: `${content.name} - AI Tool`,
    description: content.description,
    alternates: {
      canonical: `${siteUrl}/${params.locale}/ai-tools/${tool.slug}`,
      languages: {
        'en': `${siteUrl}/en/ai-tools/${tool.slug}`,
        'zh': `${siteUrl}/zh/ai-tools/${tool.slug}`,
      },
    },
  };
}

export default function AiToolPage({ params }: { params: { locale: Locale; slug: string } }) {
  const dict = getDictionary(params.locale);
  const tool = getAiToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  const content = tool.content[params.locale];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devtools-hub.com';
  const url = `${siteUrl}/${params.locale}/ai-tools/${tool.slug}`;

  const breadcrumbItems = [
    { name: dict['nav.aiTools'], url: `/${params.locale}/ai-tools` },
    { name: content.name, url: `/${params.locale}/ai-tools/${tool.slug}` },
  ];

  const componentName = tool.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  const AiToolComponent = (AiToolComponents as any)[componentName];
  const Icon = (Icons as any)[tool.icon] || Sparkles;

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
            {AiToolComponent ? <AiToolComponent /> : <div>AI tool component not found</div>}
          </div>

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

          {tool.relatedTools.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">{dict['tool.relatedTools']}</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {tool.relatedTools.map((relatedSlug) => {
                  const relatedTool = getAiToolBySlug(relatedSlug);
                  if (!relatedTool) return null;
                  const relatedContent = relatedTool.content[params.locale];
                  const RelatedIcon = (Icons as any)[relatedTool.icon] || Sparkles;
                  return (
                    <Link key={relatedSlug} href={`/${params.locale}/ai-tools/${relatedSlug}`}>
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
