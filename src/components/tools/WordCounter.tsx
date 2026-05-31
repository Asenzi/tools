'use client';

import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export function WordCounter() {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    lines: 0,
  });

  useEffect(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0).length;
    const lines = text.split(/\n/).length;

    setStats({ words, characters, charactersNoSpaces, sentences, paragraphs, lines });
  }, [text]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Text Input</CardTitle>
          <CardDescription>Enter or paste your text to count words and characters</CardDescription>
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
            <FileText className="h-5 w-5 inline mr-2" />
            Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-primary/5 rounded-lg">
              <div className="text-sm text-muted-foreground">Words</div>
              <div className="text-3xl font-bold text-primary">{stats.words}</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Characters</div>
              <div className="text-3xl font-bold">{stats.characters}</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Characters (no spaces)</div>
              <div className="text-3xl font-bold">{stats.charactersNoSpaces}</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Sentences</div>
              <div className="text-3xl font-bold">{stats.sentences}</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Paragraphs</div>
              <div className="text-3xl font-bold">{stats.paragraphs}</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Lines</div>
              <div className="text-3xl font-bold">{stats.lines}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
