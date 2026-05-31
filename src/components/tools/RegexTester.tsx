'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState('');

  const test = () => {
    try {
      const regex = new RegExp(pattern, flags);
      const found = testString.match(regex);
      setMatches(found || []);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid regex');
      setMatches([]);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Regular Expression</CardTitle>
          <CardDescription>Enter your regex pattern and flags</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Pattern</label>
            <Input
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="\d+"
              className="font-mono"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Flags</label>
            <Input
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              placeholder="g, i, m, s, u, y"
              className="font-mono"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Test String</CardTitle>
          <CardDescription>Enter text to test against your regex</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter text to test..."
            className="min-h-[150px] font-mono text-sm"
          />
          <Button onClick={test} className="mt-4">
            Test Regex
          </Button>
          {error && (
            <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-md text-sm">
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {matches.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Matches ({matches.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {matches.map((match, index) => (
                <div key={index} className="p-3 bg-muted rounded-md font-mono text-sm">
                  {match}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
