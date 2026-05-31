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

export async function generateStaticParams() {
  return aiTools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tool = getAiToolBySlug(params.slug);

  if (!tool) {
    return {};
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devtools-hub.com';
  const url = `${siteUrl}/ai-tools/${tool.slug}`;

  return {
    title: `${tool.name} - AI Tool | DevTools Hub`,
    description: tool.description,
    keywords: tool.keywords.join(', '),
    openGraph: {
      title: tool.name,
      description: tool.description,
      url,
      type: 'website',
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function AiToolPage({ params }: { params: { slug: string } }) {
  const tool = getAiToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devtools-hub.com';
  const url = `${siteUrl}/ai-tools/${tool.slug}`;

  const breadcrumbItems = [
    { name: 'AI Tools', url: '/ai-tools' },
    { name: tool.name, url: `/ai-tools/${tool.slug}` },
  ];

  // Get the component dynamically - convert slug to PascalCase
  const componentName = tool.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  const AiToolComponent = (AiToolComponents as any)[componentName];
  const Icon = (Icons as any)[tool.icon] || Sparkles;

  return (
    <>
      <StructuredData data={generateToolSchema(tool, url)} />
      <StructuredData data={generateFAQSchema(tool.faqs)} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbItems.map(item => ({ name: item.name, url: `${siteUrl}${item.url}` })))} />

      <div className="py-12">
        <Container>
          <Breadcrumb items={breadcrumbItems} />

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Icon className="h-8 w-8" />
              </div>
              <h1 className="text-4xl font-bold">{tool.name}</h1>
            </div>
            <p className="text-xl text-muted-foreground">{tool.description}</p>
          </div>

          {/* AI Tool Component */}
          <div className="mb-12">
            {AiToolComponent ? <AiToolComponent /> : <div>AI tool component not found</div>}
          </div>

          {/* Use Cases */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Use Cases</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {tool.useCases.map((useCase, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground">{useCase}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {tool.faqs.map((faq, index) => (
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

          {/* Related Tools */}
          {tool.relatedTools.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {tool.relatedTools.map((relatedSlug) => {
                  const relatedTool = getAiToolBySlug(relatedSlug);
                  if (!relatedTool) return null;
                  const RelatedIcon = (Icons as any)[relatedTool.icon] || Sparkles;
                  return (
                    <Link key={relatedSlug} href={`/ai-tools/${relatedSlug}`}>
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <RelatedIcon className="h-5 w-5" />
                            <CardTitle className="text-base">{relatedTool.name}</CardTitle>
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
