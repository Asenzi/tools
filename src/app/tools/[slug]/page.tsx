import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { AdSlot } from '@/components/ads/AdSlot';
import { tools, getToolBySlug } from '@/config/tools';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { StructuredData } from '@/components/seo/StructuredData';
import { generateToolSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import * as ToolComponents from '@/components/tools';
import * as Icons from 'lucide-react';
import { Code2 } from 'lucide-react';

type SlugParams = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: { params: SlugParams }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {};
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devtools-hub.com';
  const url = `${siteUrl}/tools/${tool.slug}`;

  return {
    title: `${tool.name} - Free Online Tool | DevTools Hub`,
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

export default async function ToolPage({ params }: { params: SlugParams }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devtools-hub.com';
  const url = `${siteUrl}/tools/${tool.slug}`;

  const breadcrumbItems = [
    { name: 'Tools', url: '/tools' },
    { name: tool.name, url: `/tools/${tool.slug}` },
  ];

  // Get the component dynamically
  const ToolComponent = (ToolComponents as any)[tool.component];
  const Icon = (Icons as any)[tool.icon] || Code2;

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

          <div className="mb-12">
            <AdSlot
              slot="5144410849"
              className="overflow-hidden rounded-xl border bg-card p-4"
            />
          </div>

          {/* Tool Component */}
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

          {/* How to Use */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">How to Use</h2>
            <Card>
              <CardContent className="pt-6">
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li>Enter or paste your data in the input field</li>
                  <li>Click the action button (Format, Generate, Convert, etc.)</li>
                  <li>View the result and copy it if needed</li>
                  <li>All processing happens in your browser - your data stays private</li>
                </ol>
              </CardContent>
            </Card>
          </section>

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

          <div className="mb-12">
            <AdSlot
              slot="1431715324"
              className="overflow-hidden rounded-xl border bg-card p-4"
            />
          </div>

          {/* Related Tools */}
          {tool.relatedTools.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {tool.relatedTools.map((relatedSlug) => {
                  const relatedTool = getToolBySlug(relatedSlug);
                  if (!relatedTool) return null;
                  const RelatedIcon = (Icons as any)[relatedTool.icon] || Code2;
                  return (
                    <Link key={relatedSlug} href={`/tools/${relatedSlug}`}>
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <RelatedIcon className="h-5 w-5" />
                            <CardTitle className="text-base">{relatedTool.name}</CardTitle>
                          </div>
                          <CardDescription className="text-sm">{relatedTool.description}</CardDescription>
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
