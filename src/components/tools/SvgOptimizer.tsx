'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check, Download } from 'lucide-react';
import { copyToClipboard, downloadFile } from '@/lib/utils';

export function SvgOptimizer() {
  const [svgCode, setSvgCode] = useState('');
  const [optimized, setOptimized] = useState('');
  const [stats, setStats] = useState({ original: 0, optimized: 0, saved: 0 });
  const [copied, setCopied] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setSvgCode(content);
    };
    reader.readAsText(file);
  };

  const optimizeSvg = () => {
    if (!svgCode.trim()) return;

    let optimizedSvg = svgCode;

    // Remove comments
    optimizedSvg = optimizedSvg.replace(/<!--[\s\S]*?-->/g, '');

    // Remove unnecessary whitespace
    optimizedSvg = optimizedSvg.replace(/\s+/g, ' ');
    optimizedSvg = optimizedSvg.replace(/>\s+</g, '><');

    // Remove empty attributes
    optimizedSvg = optimizedSvg.replace(/\s+[a-zA-Z-]+=""/g, '');

    // Remove default attribute values
    optimizedSvg = optimizedSvg.replace(/\s+fill="black"/g, '');
    optimizedSvg = optimizedSvg.replace(/\s+stroke="none"/g, '');

    // Remove metadata and editor-specific tags
    optimizedSvg = optimizedSvg.replace(/<metadata[\s\S]*?<\/metadata>/gi, '');
    optimizedSvg = optimizedSvg.replace(/<title[\s\S]*?<\/title>/gi, '');
    optimizedSvg = optimizedSvg.replace(/<desc[\s\S]*?<\/desc>/gi, '');

    // Trim
    optimizedSvg = optimizedSvg.trim();

    setOptimized(optimizedSvg);

    const originalSize = new Blob([svgCode]).size;
    const optimizedSize = new Blob([optimizedSvg]).size;
    const saved = ((originalSize - optimizedSize) / originalSize) * 100;

    setStats({
      original: originalSize,
      optimized: optimizedSize,
      saved: Math.max(0, saved),
    });
  };

  const handleCopy = async () => {
    if (optimized) {
      await copyToClipboard(optimized);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (optimized) {
      downloadFile(optimized, 'optimized.svg', 'image/svg+xml');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>SVG Input</CardTitle>
          <CardDescription>Upload an SVG file or paste SVG code to optimize</CardDescription>
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
              onChange={(e) => setSvgCode(e.target.value)}
              placeholder="<svg>...</svg>"
              className="min-h-[200px] font-mono text-sm"
            />
          </div>

          <Button onClick={optimizeSvg} className="w-full">
            Optimize SVG
          </Button>
        </CardContent>
      </Card>

      {optimized && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Optimization Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground">Original Size</div>
                  <div className="text-2xl font-bold">{(stats.original / 1024).toFixed(2)} KB</div>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="text-sm text-muted-foreground">Optimized Size</div>
                  <div className="text-2xl font-bold text-primary">
                    {(stats.optimized / 1024).toFixed(2)} KB
                  </div>
                </div>
                <div className="p-4 bg-green-500/10 rounded-lg">
                  <div className="text-sm text-muted-foreground">Saved</div>
                  <div className="text-2xl font-bold text-green-600">
                    {stats.saved.toFixed(1)}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Optimized SVG</CardTitle>
                <div className="flex gap-2">
                  <Button onClick={handleCopy} variant="outline" size="sm">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button onClick={handleDownload} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={optimized}
                readOnly
                className="min-h-[300px] font-mono text-sm"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-8 bg-muted rounded-lg min-h-[200px]">
                <div
                  dangerouslySetInnerHTML={{ __html: optimized }}
                  className="max-w-full max-h-[400px]"
                />
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
