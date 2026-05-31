'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

type SortOrder = 'asc' | 'desc' | 'length-asc' | 'length-desc' | 'random';

export function SortLines() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [copied, setCopied] = useState(false);

  const sortLines = () => {
    const lines = input.split('\n').filter(line => line.trim() !== '');
    let sorted: string[];

    switch (sortOrder) {
      case 'asc':
        sorted = lines.sort((a, b) => a.localeCompare(b));
        break;
      case 'desc':
        sorted = lines.sort((a, b) => b.localeCompare(a));
        break;
      case 'length-asc':
        sorted = lines.sort((a, b) => a.length - b.length);
        break;
      case 'length-desc':
        sorted = lines.sort((a, b) => b.length - a.length);
        break;
      case 'random':
        sorted = lines.sort(() => Math.random() - 0.5);
        break;
      default:
        sorted = lines;
    }

    setOutput(sorted.join('\n'));
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
          <CardDescription>Enter text to sort lines</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your text here (one item per line)..."
            className="min-h-[200px] font-mono text-sm"
          />
          <div className="flex gap-2 items-center">
            <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as SortOrder)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">A to Z</SelectItem>
                <SelectItem value="desc">Z to A</SelectItem>
                <SelectItem value="length-asc">Shortest to Longest</SelectItem>
                <SelectItem value="length-desc">Longest to Shortest</SelectItem>
                <SelectItem value="random">Random</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={sortLines}>Sort Lines</Button>
          </div>
        </CardContent>
      </Card>

      {output && (
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
      )}
    </div>
  );
}
