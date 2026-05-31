'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export function OpenGraphGenerator() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [image, setImage] = useState('');
  const [type, setType] = useState('website');
  const [siteName, setSiteName] = useState('');
  const [locale, setLocale] = useState('en_US');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const generateOGTags = () => {
    const tags = [];

    if (title) {
      tags.push(`<meta property="og:title" content="${title}">`);
    }

    if (description) {
      tags.push(`<meta property="og:description" content="${description}">`);
    }

    if (url) {
      tags.push(`<meta property="og:url" content="${url}">`);
    }

    if (image) {
      tags.push(`<meta property="og:image" content="${image}">`);
    }

    if (type) {
      tags.push(`<meta property="og:type" content="${type}">`);
    }

    if (siteName) {
      tags.push(`<meta property="og:site_name" content="${siteName}">`);
    }

    if (locale) {
      tags.push(`<meta property="og:locale" content="${locale}">`);
    }

    // Twitter Card tags
    tags.push(`<meta name="twitter:card" content="summary_large_image">`);
    if (title) {
      tags.push(`<meta name="twitter:title" content="${title}">`);
    }
    if (description) {
      tags.push(`<meta name="twitter:description" content="${description}">`);
    }
    if (image) {
      tags.push(`<meta name="twitter:image" content="${image}">`);
    }

    setOutput(tags.join('\n'));
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
          <CardTitle>Open Graph Information</CardTitle>
          <CardDescription>Enter your page information to generate Open Graph and Twitter Card tags</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your Page Title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief description of your page..."
              className="min-h-[100px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">URL *</label>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/page"
              type="url"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image URL *</label>
            <Input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              type="url"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Recommended size: 1200x630 pixels
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="article">Article</SelectItem>
                <SelectItem value="product">Product</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="music">Music</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Site Name</label>
            <Input
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              placeholder="Your Site Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Locale</label>
            <Select value={locale} onValueChange={setLocale}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en_US">English (US)</SelectItem>
                <SelectItem value="en_GB">English (UK)</SelectItem>
                <SelectItem value="zh_CN">Chinese (Simplified)</SelectItem>
                <SelectItem value="zh_TW">Chinese (Traditional)</SelectItem>
                <SelectItem value="ja_JP">Japanese</SelectItem>
                <SelectItem value="ko_KR">Korean</SelectItem>
                <SelectItem value="es_ES">Spanish</SelectItem>
                <SelectItem value="fr_FR">French</SelectItem>
                <SelectItem value="de_DE">German</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={generateOGTags} className="w-full">
            Generate Open Graph Tags
          </Button>
        </CardContent>
      </Card>

      {output && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated Tags</CardTitle>
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
              className="min-h-[300px] font-mono text-sm"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
