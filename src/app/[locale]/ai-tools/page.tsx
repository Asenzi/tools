import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { aiTools } from '@/config/aiTools';
import { Badge } from '@/components/ui/badge';
import * as Icons from 'lucide-react';
import { Sparkles } from 'lucide-react';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  return {
    title: dict['aiTools.title'],
    description: dict['aiTools.description'],
  };
}

export default function AiToolsPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);

  return (
    <div className="py-12">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{dict['aiTools.title']}</h1>
          <p className="text-xl text-muted-foreground">
            {dict['aiTools.description']}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiTools.map((tool) => {
            const Icon = (Icons as any)[tool.icon] || Sparkles;
            const content = tool.content[params.locale];
            return (
              <Link key={tool.slug} href={`/${params.locale}/ai-tools/${tool.slug}`}>
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
      </Container>
    </div>
  );
}
