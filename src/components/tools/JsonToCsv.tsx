'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check, Download } from 'lucide-react';
import { copyToClipboard, downloadFile } from '@/lib/utils';

export function JsonToCsv() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const convert = () => {
    try {
      const data = JSON.parse(input);

      if (!Array.isArray(data)) {
        setError('JSON must be an array of objects');
        setOutput('');
        return;
      }

      if (data.length === 0) {
        setError('Array is empty');
        setOutput('');
        return;
      }

      // Get all unique keys
      const keys = Array.from(
        new Set(data.flatMap(obj => Object.keys(obj)))
      );

      // Create CSV header
      const header = keys.join(',');

      // Create CSV rows
      const rows = data.map(obj => {
        return keys
          .map(key => {
            const value = obj[key];
            if (value === null || value === undefined) return '';
            const str = String(value);
            // Escape quotes and wrap in quotes if contains comma or quote
            if (str.includes(',') || str.includes('"') || str.includes('\n')) {
              return `"${str.replace(/"/g, '""')}"`;
            }
            return str;
          })
          .join(',');
      });

      const csv = [header, ...rows].join('\n');
      setOutput(csv);
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

  const handleDownload = () => {
    if (output) {
      downloadFile(output, 'data.csv', 'text/csv');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Input JSON</CardTitle>
          <CardDescription>Paste JSON array of objects</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='[{"name":"John","age":30},{"name":"Jane","age":25}]'
            className="min-h-[200px] font-mono text-sm"
          />
          <Button onClick={convert} className="mt-4">
            Convert to CSV
          </Button>
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
              <CardTitle>CSV Output</CardTitle>
              <div className="flex gap-2">
                <Button onClick={handleCopy} variant="outline" size="sm">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
                <Button onClick={handleDownload} variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
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
