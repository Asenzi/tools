'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export function Base64EncodeDecode() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const encode = () => {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      const base64 = btoa(String.fromCharCode(...data));
      setOutput(base64);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Encoding failed');
      setOutput('');
    }
  };

  const decode = () => {
    try {
      const decoded = atob(input);
      const bytes = new Uint8Array(decoded.split('').map(c => c.charCodeAt(0)));
      const decoder = new TextDecoder();
      const text = decoder.decode(bytes);
      setOutput(text);
      setError('');
    } catch (err) {
      setError('Invalid Base64 string');
      setOutput('');
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
          <CardDescription>Enter text to encode or Base64 string to decode</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your text here..."
            className="min-h-[150px] font-mono text-sm"
          />
          <div className="flex gap-2 mt-4">
            <Button onClick={encode}>Encode to Base64</Button>
            <Button onClick={decode} variant="outline">
              Decode from Base64
            </Button>
          </div>
          {error && (
            <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-md text-sm">
              {error}
            </div>
          )}
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
              className="min-h-[150px] font-mono text-sm"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
