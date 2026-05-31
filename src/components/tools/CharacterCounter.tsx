'use client';

import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Type } from 'lucide-react';

export function CharacterCounter() {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    noSpaces: 0,
    letters: 0,
    digits: 0,
    spaces: 0,
    punctuation: 0,
    special: 0,
  });

  useEffect(() => {
    const total = text.length;
    const noSpaces = text.replace(/\s/g, '').length;
    const letters = (text.match(/[a-zA-Z]/g) || []).length;
    const digits = (text.match(/\d/g) || []).length;
    const spaces = (text.match(/\s/g) || []).length;
    const punctuation = (text.match(/[.,;:!?'"()-]/g) || []).length;
    const special = total - letters - digits - spaces - punctuation;

    setStats({ total, noSpaces, letters, digits, spaces, punctuation, special });
  }, [text]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Text Input</CardTitle>
          <CardDescription>Enter or paste your text to count characters</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="min-h-[300px] font-mono text-sm"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <Type className="h-5 w-5 inline mr-2" />
            Character Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-primary/5 rounded-lg">
              <div className="text-sm text-muted-foreground">Total Characters</div>
              <div className="text-3xl font-bold text-primary">{stats.total}</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Without Spaces</div>
              <div className="text-3xl font-bold">{stats.noSpaces}</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Letters</div>
              <div className="text-3xl font-bold">{stats.letters}</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Digits</div>
              <div className="text-3xl font-bold">{stats.digits}</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Spaces</div>
              <div className="text-3xl font-bold">{stats.spaces}</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Punctuation</div>
              <div className="text-3xl font-bold">{stats.punctuation}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
