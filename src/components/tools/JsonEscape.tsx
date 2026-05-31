'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export function JsonEscape() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const escape = () => {
    const escaped = JSON.stringify(input);
    setOutput(escaped);
  };

  const unescape = () => {
    try {
      const unescaped = JSON.parse(input);
      setOutput(typeof unescaped === 'string' ? unescaped : JSON.stringify(unescaped, null, 2));
    } catch (err) {
      setOutput('Invalid escaped JSON string');
    }
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
          <CardDescription>Enter JSON or escaped string</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"name": "John"} or \"{\\"name\\":\\"John\\"}\\"'
            className="min-h-[200px] font-mono text-sm"
          />
          <div className="flex gap-2 mt-4">
            <Button onClick={escape}>Escape</Button>
            <Button onClick={unescape} variant="outline">
              Unescape
            </Button>
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
