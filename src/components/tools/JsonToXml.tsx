'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export function JsonToXml() {
  const [input, setInput] = useState('');
  const [rootElement, setRootElement] = useState('root');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const jsonToXml = (obj: any, indent: number = 0): string => {
    const spaces = '  '.repeat(indent);
    let xml = '';

    if (Array.isArray(obj)) {
      obj.forEach(item => {
        xml += `${spaces}<item>\n`;
        xml += jsonToXml(item, indent + 1);
        xml += `${spaces}</item>\n`;
      });
    } else if (typeof obj === 'object' && obj !== null) {
      Object.entries(obj).forEach(([key, value]) => {
        const tagName = key.replace(/[^a-zA-Z0-9_-]/g, '_');
        if (typeof value === 'object' && value !== null) {
          xml += `${spaces}<${tagName}>\n`;
          xml += jsonToXml(value, indent + 1);
          xml += `${spaces}</${tagName}>\n`;
        } else {
          const escapedValue = String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
          xml += `${spaces}<${tagName}>${escapedValue}</${tagName}>\n`;
        }
      });
    } else {
      xml += `${spaces}${String(obj)}\n`;
    }

    return xml;
  };

  const convert = () => {
    try {
      const data = JSON.parse(input);
      const tagName = rootElement.replace(/[^a-zA-Z0-9_-]/g, '_') || 'root';
      const xmlContent = jsonToXml(data, 1);
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<${tagName}>\n${xmlContent}</${tagName}>`;
      setOutput(xml);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
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
          <CardTitle>Input JSON</CardTitle>
          <CardDescription>Paste JSON data to convert</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Root Element Name</label>
            <Input
              value={rootElement}
              onChange={(e) => setRootElement(e.target.value)}
              placeholder="root"
            />
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"name":"John","age":30}'
            className="min-h-[200px] font-mono text-sm"
          />
          <Button onClick={convert}>
            Convert to XML
          </Button>
          {error && (
            <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {output && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>XML Output</CardTitle>
              <Button onClick={handleCopy} variant="outline" size="sm">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="p-4 bg-muted rounded-md overflow-x-auto">
              <code className="text-sm">{output}</code>
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
