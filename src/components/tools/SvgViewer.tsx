'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Eye } from 'lucide-react';

export function SvgViewer() {
  const [svgCode, setSvgCode] = useState('');
  const [error, setError] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.svg')) {
      setError('Please upload an SVG file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setSvgCode(content);
      setError('');
    };
    reader.onerror = () => {
      setError('Failed to read file');
    };
    reader.readAsText(file);
  };

  const isValidSvg = svgCode.trim().toLowerCase().includes('<svg');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>SVG Input</CardTitle>
          <CardDescription>Upload an SVG file or paste SVG code</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Upload SVG File</label>
            <Input
              type="file"
              accept=".svg"
              onChange={handleFileUpload}
              className="cursor-pointer"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Paste SVG Code</label>
            <Textarea
              value={svgCode}
              onChange={(e) => {
                setSvgCode(e.target.value);
                setError('');
              }}
              placeholder="<svg>...</svg>"
              className="min-h-[200px] font-mono text-sm"
            />
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {isValidSvg && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>
                <Eye className="h-5 w-5 inline mr-2" />
                SVG Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-8 bg-muted rounded-lg min-h-[300px]">
                <div
                  dangerouslySetInnerHTML={{ __html: svgCode }}
                  className="max-w-full max-h-[500px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SVG Code</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={svgCode}
                readOnly
                className="min-h-[300px] font-mono text-sm"
              />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
