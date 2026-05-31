'use client';

import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';

interface KeywordStat {
  keyword: string;
  count: number;
  density: number;
}

export function KeywordDensityChecker() {
  const [text, setText] = useState('');
  const [keywords, setKeywords] = useState<KeywordStat[]>([]);
  const [totalWords, setTotalWords] = useState(0);

  useEffect(() => {
    if (!text.trim()) {
      setKeywords([]);
      setTotalWords(0);
      return;
    }

    // Split text into words and clean them
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2); // Filter out very short words

    const total = words.length;
    setTotalWords(total);

    // Count word frequency
    const wordCount: { [key: string]: number } = {};
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });

    // Calculate density and sort by count
    const keywordStats: KeywordStat[] = Object.entries(wordCount)
      .map(([keyword, count]) => ({
        keyword,
        count,
        density: (count / total) * 100,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20); // Top 20 keywords

    setKeywords(keywordStats);
  }, [text]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Text Input</CardTitle>
          <CardDescription>Enter or paste your text to analyze keyword density</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your content here..."
            className="min-h-[300px] font-mono text-sm"
          />
          <div className="mt-4 text-sm text-muted-foreground">
            Total words: {totalWords}
          </div>
        </CardContent>
      </Card>

      {keywords.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>
              <Search className="h-5 w-5 inline mr-2" />
              Keyword Density Analysis
            </CardTitle>
            <CardDescription>Top 20 keywords by frequency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {keywords.map((stat, index) => (
                <div
                  key={stat.keyword}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-sm font-medium text-muted-foreground w-8">
                      #{index + 1}
                    </div>
                    <div className="font-medium">{stat.keyword}</div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-sm">
                      <span className="font-medium">{stat.count}</span>
                      <span className="text-muted-foreground ml-1">times</span>
                    </div>
                    <div className="text-sm font-medium text-primary">
                      {stat.density.toFixed(2)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-primary/5 rounded-lg">
              <h4 className="font-medium mb-2">SEO Guidelines</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Target keyword density: 1-2% for primary keywords</li>
                <li>• Avoid keyword stuffing (over 3% density)</li>
                <li>• Use variations and related terms naturally</li>
                <li>• Focus on content quality over keyword density</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
