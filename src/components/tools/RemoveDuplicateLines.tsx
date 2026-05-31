'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export function RemoveDuplicateLines() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [stats, setStats] = useState({ original: 0, unique: 0, removed: 0 });
  const [copied, setCopied] = useState(false);

  const removeDuplicates = () => {
    const lines = input.split('\n');
    const uniqueLines = Array.from(new Set(lines));

    setOutput(uniqueLines.join('\n'));
    setStats({
      original: lines.length,
      unique: uniqueLines.length,
      removed: lines.length - uniqueLines.length,
    });
  };

  const handleCopy = async () => {
    if (output) {
      await copyToClipboard(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Input</CardTitle>
          <CardDescription>Enter text with duplicate lines</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your text here (one item per line)..."
            className="min-h-[200px] font-mono text-sm"
          />
          <Button onClick={removeDuplicates} className="mt-4">
            Remove Duplicates
          </Button>
        </CardContent>
      </Card>

      {output && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground">Original Lines</div>
                  <div className="text-2xl font-bold">{stats.original}</div>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="text-sm text-muted-foreground">Unique Lines</div>
                  <div className="text-2xl font-bold text-primary">{stats.unique}</div>
                </div>
                <div className="p-4 bg-destructive/10 rounded-lg">
                  <div className="text-sm text-muted-foreground">Removed</div>
                  <div className="text-2xl font-bold text-destructive">{stats.removed}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Output</CardTitle>
                <Button onClick={handleCopy} variant="outline" size="sm">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={output}
                readOnly
                className="min-h-[200px] font-mono text-sm"
              />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
