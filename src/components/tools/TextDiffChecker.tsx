'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GitCompare } from 'lucide-react';

export function TextDiffChecker() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diff, setDiff] = useState<Array<{ type: 'added' | 'removed' | 'unchanged'; line: string }>>([]);

  const comparTexts = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const result: Array<{ type: 'added' | 'removed' | 'unchanged'; line: string }> = [];

    const maxLength = Math.max(lines1.length, lines2.length);

    for (let i = 0; i < maxLength; i++) {
      const line1 = lines1[i];
      const line2 = lines2[i];

      if (line1 === line2) {
        if (line1 !== undefined) {
          result.push({ type: 'unchanged', line: line1 });
        }
      } else {
        if (line1 !== undefined && !lines2.includes(line1)) {
          result.push({ type: 'removed', line: line1 });
        }
        if (line2 !== undefined && !lines1.includes(line2)) {
          result.push({ type: 'added', line: line2 });
        }
        if (line1 !== undefined && lines2.includes(line1)) {
          result.push({ type: 'unchanged', line: line1 });
        }
      }
    }

    setDiff(result);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Original Text</CardTitle>
            <CardDescription>Enter the first text</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder="Enter original text..."
              className="min-h-[300px] font-mono text-sm"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Modified Text</CardTitle>
            <CardDescription>Enter the second text</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder="Enter modified text..."
              className="min-h-[300px] font-mono text-sm"
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button onClick={comparTexts} size="lg">
          <GitCompare className="h-4 w-4 mr-2" />
          Compare Texts
        </Button>
      </div>

      {diff.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Differences</CardTitle>
            <CardDescription>
              <span className="inline-block w-4 h-4 bg-green-500/20 border border-green-500 mr-2"></span>
              Added
              <span className="inline-block w-4 h-4 bg-red-500/20 border border-red-500 mx-2"></span>
              Removed
              <span className="inline-block w-4 h-4 bg-muted border border-border mx-2"></span>
              Unchanged
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 font-mono text-sm">
              {diff.map((item, index) => (
                <div
                  key={index}
                  className={`p-2 rounded ${
                    item.type === 'added'
                      ? 'bg-green-500/10 border-l-4 border-green-500'
                      : item.type === 'removed'
                      ? 'bg-red-500/10 border-l-4 border-red-500'
                      : 'bg-muted/50'
                  }`}
                >
                  <span className="text-muted-foreground mr-2">
                    {item.type === 'added' ? '+' : item.type === 'removed' ? '-' : ' '}
                  </span>
                  {item.line}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
