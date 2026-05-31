'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import * as Icons from 'lucide-react';
import { Code2, Search, Sparkles } from 'lucide-react';
import { Locale } from '@/i18n/config';
import { Container } from '@/components/layout/Container';
import { Input } from '@/components/ui/input';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { searchAll } from '@/lib/search';

type LocaleParams = Promise<{ locale: Locale }>;

export default function LocaleSearchPage({ params }: { params: LocaleParams }) {
  const { locale } = use(params);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ReturnType<typeof searchAll>>([]);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.trim()) {
      setResults(searchAll(value, locale));
    } else {
      setResults([]);
    }
  };

  return (
    <div className="py-12">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Search Tools</h1>
          <p className="text-xl text-muted-foreground mb-8">Find the perfect tool for your needs</p>
          <div className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search by name, keyword, or description..."
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>
        </div>

        {query && results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tools found for "{query}"</p>
          </div>
        )}

        {results.length > 0 && (
          <div>
            <p className="text-muted-foreground mb-6">
              Found {results.length} {results.length === 1 ? 'tool' : 'tools'}
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {results.map((result) => {
                const tool = result.item;
                const content = tool.content[locale];
                const Icon = (Icons as any)[tool.icon] || (result.type === 'ai-tool' ? Sparkles : Code2);
                const href =
                  result.type === 'ai-tool'
                    ? `/${locale}/ai-tools/${tool.slug}`
                    : `/${locale}/tools/${tool.slug}`;

                return (
                  <Link key={`${result.type}-${tool.slug}`} href={href}>
                    <Card className="h-full transition-shadow hover:shadow-lg">
                      <CardHeader>
                        <div className="mb-3 flex items-center gap-3">
                          <div className="rounded-lg bg-primary/10 p-2">
                            <Icon className="h-5 w-5" />
                          </div>
                          <Badge variant={result.type === 'ai-tool' ? 'default' : 'secondary'}>
                            {result.type === 'ai-tool' ? 'AI Tool' : 'Developer Tool'}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{content.name}</CardTitle>
                        <CardDescription>{content.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
