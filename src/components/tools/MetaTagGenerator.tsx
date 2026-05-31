'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export function MetaTagGenerator() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [author, setAuthor] = useState('');
  const [viewport, setViewport] = useState('width=device-width, initial-scale=1.0');
  const [robots, setRobots] = useState('index, follow');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const generateMetaTags = () => {
    const tags = [];

    if (title) {
      tags.push(`<title>${title}</title>`);
      tags.push(`<meta name="title" content="${title}">`);
    }

    if (description) {
      tags.push(`<meta name="description" content="${description}">`);
    }

    if (keywords) {
      tags.push(`<meta name="keywords" content="${keywords}">`);
    }

    if (author) {
      tags.push(`<meta name="author" content="${author}">`);
    }

    if (viewport) {
      tags.push(`<meta name="viewport" content="${viewport}">`);
    }

    if (robots) {
      tags.push(`<meta name="robots" content="${robots}">`);
    }

    tags.push(`<meta charset="UTF-8">`);
    tags.push(`<meta http-equiv="X-UA-Compatible" content="IE=edge">`);

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
          <CardTitle>Meta Tag Information</CardTitle>
          <CardDescription>Enter your page information to generate meta tags</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Page Title *</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Awesome Website"
              maxLength={60}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {title.length}/60 characters (recommended: 50-60)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief description of your page..."
              className="min-h-[100px]"
              maxLength={160}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {description.length}/160 characters (recommended: 150-160)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Keywords</label>
            <Input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="keyword1, keyword2, keyword3"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Separate keywords with commas
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Author</label>
            <Input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your Name or Company"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Viewport</label>
            <Input
              value={viewport}
              onChange={(e) => setViewport(e.target.value)}
              placeholder="width=device-width, initial-scale=1.0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Robots</label>
            <Input
              value={robots}
              onChange={(e) => setRobots(e.target.value)}
              placeholder="index, follow"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Common values: index, follow / noindex, nofollow
            </p>
          </div>

          <Button onClick={generateMetaTags} className="w-full">
            Generate Meta Tags
          </Button>
        </CardContent>
      </Card>

      {output && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated Meta Tags</CardTitle>
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
