'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Check, Plus, Trash2 } from 'lucide-react';
import { copyToClipboard, downloadFile } from '@/lib/utils';

interface URL {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

export function SitemapGenerator() {
  const [domain, setDomain] = useState('');
  const [urls, setUrls] = useState<URL[]>([
    { loc: '/', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: '1.0' }
  ]);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const addUrl = () => {
    setUrls([...urls, {
      loc: '',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.5'
    }]);
  };

  const removeUrl = (index: number) => {
    setUrls(urls.filter((_, i) => i !== index));
  };

  const updateUrl = (index: number, field: keyof URL, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = { ...newUrls[index], [field]: value };
    setUrls(newUrls);
  };

  const generateSitemap = () => {
    const lines: string[] = [];
    lines.push('<?xml version="1.0" encoding="UTF-8"?>');
    lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

    urls.forEach((url) => {
      if (url.loc) {
        lines.push('  <url>');
        lines.push(`    <loc>${domain}${url.loc}</loc>`);
        if (url.lastmod) {
          lines.push(`    <lastmod>${url.lastmod}</lastmod>`);
        }
        if (url.changefreq) {
          lines.push(`    <changefreq>${url.changefreq}</changefreq>`);
        }
        if (url.priority) {
          lines.push(`    <priority>${url.priority}</priority>`);
        }
        lines.push('  </url>');
      }
    });

    lines.push('</urlset>');
    setOutput(lines.join('\n'));
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
      downloadFile(output, 'sitemap.xml', 'application/xml');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sitemap Configuration</CardTitle>
          <CardDescription>Generate an XML sitemap for search engines</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Domain *</label>
            <Input
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="https://example.com"
              type="url"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">URLs</h3>
              <Button onClick={addUrl} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add URL
              </Button>
            </div>

            {urls.map((url, index) => (
              <Card key={index}>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start gap-2">
                    <div className="flex-1 space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Path</label>
                        <Input
                          value={url.loc}
                          onChange={(e) => updateUrl(index, 'loc', e.target.value)}
                          placeholder="/about or /blog/post-1"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Last Modified</label>
                          <Input
                            type="date"
                            value={url.lastmod}
                            onChange={(e) => updateUrl(index, 'lastmod', e.target.value)}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Change Frequency</label>
                          <Select
                            value={url.changefreq}
                            onValueChange={(value) => updateUrl(index, 'changefreq', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="always">Always</SelectItem>
                              <SelectItem value="hourly">Hourly</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="yearly">Yearly</SelectItem>
                              <SelectItem value="never">Never</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Priority (0.0 - 1.0)</label>
                        <Input
                          type="number"
                          min="0"
                          max="1"
                          step="0.1"
                          value={url.priority}
                          onChange={(e) => updateUrl(index, 'priority', e.target.value)}
                        />
                      </div>
                    </div>

                    {urls.length > 1 && (
                      <Button
                        onClick={() => removeUrl(index)}
                        size="sm"
                        variant="destructive"
                        className="mt-7"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button onClick={generateSitemap} className="w-full">
            Generate Sitemap
          </Button>
        </CardContent>
      </Card>

      {output && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated Sitemap</CardTitle>
              <div className="flex gap-2">
                <Button onClick={handleCopy} variant="outline" size="sm">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
                <Button onClick={handleDownload} variant="outline" size="sm">
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={output}
              readOnly
              className="min-h-[400px] font-mono text-sm"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
