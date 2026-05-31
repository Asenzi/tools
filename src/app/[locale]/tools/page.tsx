import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { tools } from '@/config/tools';
import { Badge } from '@/components/ui/badge';
import * as Icons from 'lucide-react';
import { Code2 } from 'lucide-react';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  return {
    title: dict['tools.title'],
    description: dict['tools.description'],
  };
}

export default function ToolsPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);

  const toolsByCategory = tools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, typeof tools>);

  return (
    <div className="py-12">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{dict['tools.title']}</h1>
          <p className="text-xl text-muted-foreground">
            {dict['tools.description']}
          </p>
        </div>

        <div className="space-y-12">
          {Object.entries(toolsByCategory).map(([category, categoryTools]) => (
            <section key={category}>
              <h2 className="text-2xl font-bold mb-6 capitalize">
                {dict[`tools.category.${category}s` as keyof typeof dict] || category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryTools.map((tool) => {
                  const Icon = (Icons as any)[tool.icon] || Code2;
                  const content = tool.content[params.locale];
                  return (
                    <Link key={tool.slug} href={`/${params.locale}/tools/${tool.slug}`}>
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <Icon className="h-5 w-5" />
                            </div>
                            <Badge variant="secondary">{tool.category}</Badge>
                          </div>
                          <CardTitle className="text-lg">{content.name}</CardTitle>
                          <CardDescription>{content.description}</CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}
