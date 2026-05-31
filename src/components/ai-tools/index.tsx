'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check, Loader2 } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';
import { AiGenerateResponse } from '@/lib/ai';

interface AiToolProps {
  toolSlug: string;
  systemPrompt: string;
  placeholder: string;
  title: string;
  description: string;
}

export function AiToolBase({ toolSlug, systemPrompt, placeholder, title, description }: AiToolProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!input.trim()) {
      setError('Please enter some input');
      return;
    }

    setLoading(true);
    setError('');
    setOutput('');

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toolSlug,
          prompt: input,
          systemPrompt,
        }),
      });

      const data: AiGenerateResponse = await response.json();

      if (!data.success) {
        setError(data.error || 'Failed to generate');
        if (data.remaining !== undefined) {
          setRemaining(data.remaining);
        }
      } else {
        setOutput(data.result || '');
        if (data.remaining !== undefined) {
          setRemaining(data.remaining);
        }
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
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
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="min-h-[150px]"
            disabled={loading}
          />
          <div className="flex items-center justify-between mt-4">
            <Button onClick={handleGenerate} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? 'Generating...' : 'Generate'}
            </Button>
            {remaining !== null && (
              <span className="text-sm text-muted-foreground">
                {remaining} generations remaining today
              </span>
            )}
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
              <CardTitle>Generated Result</CardTitle>
              <Button onClick={handleCopy} variant="outline" size="sm">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted rounded-md whitespace-pre-wrap">
              {output}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Individual AI tool components
export function PromptGenerator() {
  return (
    <AiToolBase
      toolSlug="prompt-generator"
      systemPrompt="You are an expert prompt engineer. Generate a detailed, well-structured prompt based on the user's brief description."
      placeholder="Describe what you want the AI to do..."
      title="AI Prompt Generator"
      description="Generate optimized prompts for AI models"
    />
  );
}

export function SeoTitleGenerator() {
  return (
    <AiToolBase
      toolSlug="seo-title-generator"
      systemPrompt="You are an SEO expert. Generate 5 SEO-optimized title variations."
      placeholder="Enter your topic or main keyword..."
      title="SEO Title Generator"
      description="Generate SEO-optimized titles"
    />
  );
}

export function MetaDescriptionGenerator() {
  return (
    <AiToolBase
      toolSlug="meta-description-generator"
      systemPrompt="You are an SEO copywriter. Generate 3 meta description variations."
      placeholder="Describe your page content..."
      title="Meta Description Generator"
      description="Create compelling meta descriptions"
    />
  );
}

export function XiaohongshuTitleGenerator() {
  return (
    <AiToolBase
      toolSlug="xiaohongshu-title-generator"
      systemPrompt="你是小红书爆款标题专家。根据用户的主题生成5个小红书风格的标题。"
      placeholder="输入你的内容主题..."
      title="Xiaohongshu Title Generator"
      description="Generate engaging Xiaohongshu titles"
    />
  );
}

export function ProductDescriptionGenerator() {
  return (
    <AiToolBase
      toolSlug="product-description-generator"
      systemPrompt="You are an e-commerce copywriter. Generate a compelling product description."
      placeholder="Describe your product..."
      title="Product Description Generator"
      description="Generate compelling product descriptions"
    />
  );
}
