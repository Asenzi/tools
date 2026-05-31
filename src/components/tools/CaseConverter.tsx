'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export function CaseConverter() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const conversions = {
    uppercase: input.toUpperCase(),
    lowercase: input.toLowerCase(),
    titleCase: input.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()),
    sentenceCase: input.charAt(0).toUpperCase() + input.slice(1).toLowerCase(),
    camelCase: input
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, ''),
    pascalCase: input
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
      .replace(/\s+/g, ''),
    snakeCase: input.toLowerCase().replace(/\s+/g, '_'),
    kebabCase: input.toLowerCase().replace(/\s+/g, '-'),
  };

  const handleCopy = async (text: string, type: string) => {
    await copyToClipboard(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Input Text</CardTitle>
          <CardDescription>Enter text to convert to different cases</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your text here..."
            className="min-h-[150px] font-mono text-sm"
          />
        </CardContent>
      </Card>

      {input && (
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(conversions).map(([type, text]) => (
            <Card key={type}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base capitalize">
                    {type.replace(/([A-Z])/g, ' $1').trim()}
                  </CardTitle>
                  <Button
                    onClick={() => handleCopy(text, type)}
                    variant="outline"
                    size="sm"
                  >
                    {copied === type ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-3 bg-muted rounded-md font-mono text-sm break-all">
                  {text}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
