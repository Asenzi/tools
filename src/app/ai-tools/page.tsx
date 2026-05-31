import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { aiTools } from '@/config/aiTools';
import { Badge } from '@/components/ui/badge';
import * as Icons from 'lucide-react';
import { Sparkles } from 'lucide-react';

export const metadata = {
  title: 'AI Tools - DevTools Hub',
  description: 'AI-powered tools for content generation, SEO optimization, and more.',
};

export default function AiToolsPage() {
  return (
    <div className="py-12">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">AI-Powered Tools</h1>
          <p className="text-xl text-muted-foreground">
            Generate content, optimize SEO, and boost productivity with AI. Free tier includes 3 generations per day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiTools.map((tool) => {
            const Icon = (Icons as any)[tool.icon] || Sparkles;
            return (
              <Link key={tool.slug} href={`/ai-tools/${tool.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="secondary">{tool.category}</Badge>
                    </div>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
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
