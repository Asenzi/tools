'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function JsonCompare() {
  const [json1, setJson1] = useState('');
  const [json2, setJson2] = useState('');
  const [differences, setDifferences] = useState<string[]>([]);
  const [error, setError] = useState('');

  const compare = () => {
    try {
      const obj1 = JSON.parse(json1);
      const obj2 = JSON.parse(json2);

      const diffs: string[] = [];
      findDifferences(obj1, obj2, '', diffs);

      if (diffs.length === 0) {
        diffs.push('✓ Objects are identical');
      }

      setDifferences(diffs);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setDifferences([]);
    }
  };

  const findDifferences = (obj1: any, obj2: any, path: string, diffs: string[]) => {
    const keys1 = Object.keys(obj1 || {});
    const keys2 = Object.keys(obj2 || {});
    const allKeys = new Set([...keys1, ...keys2]);

    allKeys.forEach(key => {
      const newPath = path ? `${path}.${key}` : key;
      const val1 = obj1?.[key];
      const val2 = obj2?.[key];

      if (!(key in obj1)) {
        diffs.push(`+ Added: ${newPath} = ${JSON.stringify(val2)}`);
      } else if (!(key in obj2)) {
        diffs.push(`- Removed: ${newPath} = ${JSON.stringify(val1)}`);
      } else if (typeof val1 === 'object' && typeof val2 === 'object' && val1 !== null && val2 !== null) {
        findDifferences(val1, val2, newPath, diffs);
      } else if (val1 !== val2) {
        diffs.push(`~ Modified: ${newPath}\n  Old: ${JSON.stringify(val1)}\n  New: ${JSON.stringify(val2)}`);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>JSON 1 (Original)</CardTitle>
            <CardDescription>Paste first JSON object</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={json1}
              onChange={(e) => setJson1(e.target.value)}
              placeholder='{"name": "John", "age": 30}'
              className="min-h-[300px] font-mono text-sm"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>JSON 2 (Comparison)</CardTitle>
            <CardDescription>Paste second JSON object</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={json2}
              onChange={(e) => setJson2(e.target.value)}
              placeholder='{"name": "Jane", "age": 30, "city": "NYC"}'
              className="min-h-[300px] font-mono text-sm"
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button onClick={compare} size="lg">
          Compare JSON
        </Button>
      </div>

      {error && (
        <Card>
          <CardContent className="pt-6">
            <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
              {error}
            </div>
          </CardContent>
        </Card>
      )}

      {differences.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Differences ({differences.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {differences.map((diff, index) => {
                const isAdded = diff.startsWith('+');
                const isRemoved = diff.startsWith('-');
                const isModified = diff.startsWith('~');
                const isIdentical = diff.startsWith('✓');

                return (
                  <div
                    key={index}
                    className={`p-3 rounded-md font-mono text-sm whitespace-pre-wrap ${
                      isAdded
                        ? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300'
                        : isRemoved
                        ? 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300'
                        : isModified
                        ? 'bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300'
                        : 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                    }`}
                  >
                    {diff}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
