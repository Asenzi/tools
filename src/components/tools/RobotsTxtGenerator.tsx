'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check, Plus, Trash2 } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

interface Rule {
  userAgent: string;
  disallow: string[];
  allow: string[];
}

export function RobotsTxtGenerator() {
  const [sitemap, setSitemap] = useState('');
  const [rules, setRules] = useState<Rule[]>([
    { userAgent: '*', disallow: [], allow: [] }
  ]);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const addRule = () => {
    setRules([...rules, { userAgent: '', disallow: [], allow: [] }]);
  };

  const removeRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const updateRule = (index: number, field: keyof Rule, value: string | string[]) => {
    const newRules = [...rules];
    newRules[index] = { ...newRules[index], [field]: value };
    setRules(newRules);
  };

  const addPath = (index: number, type: 'disallow' | 'allow', path: string) => {
    if (!path.trim()) return;
    const newRules = [...rules];
    newRules[index][type] = [...newRules[index][type], path];
    setRules(newRules);
  };

  const removePath = (ruleIndex: number, type: 'disallow' | 'allow', pathIndex: number) => {
    const newRules = [...rules];
    newRules[ruleIndex][type] = newRules[ruleIndex][type].filter((_, i) => i !== pathIndex);
    setRules(newRules);
  };

  const generateRobotsTxt = () => {
    const lines: string[] = [];

    rules.forEach((rule) => {
      if (rule.userAgent) {
        lines.push(`User-agent: ${rule.userAgent}`);

        rule.disallow.forEach((path) => {
          if (path) lines.push(`Disallow: ${path}`);
        });

        rule.allow.forEach((path) => {
          if (path) lines.push(`Allow: ${path}`);
        });

        lines.push('');
      }
    });

    if (sitemap) {
      lines.push(`Sitemap: ${sitemap}`);
    }

    setOutput(lines.join('\n').trim());
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
          <CardTitle>Robots.txt Configuration</CardTitle>
          <CardDescription>Configure rules for search engine crawlers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Sitemap URL</label>
            <Input
              value={sitemap}
              onChange={(e) => setSitemap(e.target.value)}
              placeholder="https://example.com/sitemap.xml"
              type="url"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Crawler Rules</h3>
              <Button onClick={addRule} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Rule
              </Button>
            </div>

            {rules.map((rule, ruleIndex) => (
              <Card key={ruleIndex}>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start gap-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-2">User-agent</label>
                      <Input
                        value={rule.userAgent}
                        onChange={(e) => updateRule(ruleIndex, 'userAgent', e.target.value)}
                        placeholder="* (all bots) or Googlebot"
                      />
                    </div>
                    {rules.length > 1 && (
                      <Button
                        onClick={() => removeRule(ruleIndex)}
                        size="sm"
                        variant="destructive"
                        className="mt-7"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Disallow Paths</label>
                    <div className="space-y-2">
                      {rule.disallow.map((path, pathIndex) => (
                        <div key={pathIndex} className="flex gap-2">
                          <Input value={path} readOnly />
                          <Button
                            onClick={() => removePath(ruleIndex, 'disallow', pathIndex)}
                            size="sm"
                            variant="outline"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <Input
                          placeholder="/admin/ or /private/"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addPath(ruleIndex, 'disallow', e.currentTarget.value);
                              e.currentTarget.value = '';
                            }
                          }}
                        />
                        <Button
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                            addPath(ruleIndex, 'disallow', input.value);
                            input.value = '';
                          }}
                          size="sm"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Allow Paths</label>
                    <div className="space-y-2">
                      {rule.allow.map((path, pathIndex) => (
                        <div key={pathIndex} className="flex gap-2">
                          <Input value={path} readOnly />
                          <Button
                            onClick={() => removePath(ruleIndex, 'allow', pathIndex)}
                            size="sm"
                            variant="outline"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <Input
                          placeholder="/public/ or /api/"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addPath(ruleIndex, 'allow', e.currentTarget.value);
                              e.currentTarget.value = '';
                            }
                          }}
                        />
                        <Button
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                            addPath(ruleIndex, 'allow', input.value);
                            input.value = '';
                          }}
                          size="sm"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button onClick={generateRobotsTxt} className="w-full">
            Generate Robots.txt
          </Button>
        </CardContent>
      </Card>

      {output && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated Robots.txt</CardTitle>
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
