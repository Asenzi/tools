'use client';

import { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { Input } from '@/components/ui/input';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { searchAll } from '@/lib/search';
import Link from 'next/link';
import * as Icons from 'lucide-react';
import { Code2, Sparkles, Search } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ReturnType<typeof searchAll>>([]);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.trim()) {
      const searchResults = searchAll(value, 'en');
      setResults(searchResults);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="py-12">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Search Tools</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Find the perfect tool for your needs
          </p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((result) => {
                const tool = result.item;
                const content = tool.content.en;
                const Icon = (Icons as any)[tool.icon] || (result.type === 'ai-tool' ? Sparkles : Code2);
                const href = result.type === 'ai-tool' ? `/ai-tools/${tool.slug}` : `/tools/${tool.slug}`;

                return (
                  <Link key={`${result.type}-${tool.slug}`} href={href}>
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
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
