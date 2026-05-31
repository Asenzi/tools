'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface TreeNodeProps {
  data: any;
  name?: string;
  level?: number;
}

function TreeNode({ data, name, level = 0 }: TreeNodeProps) {
  const [expanded, setExpanded] = useState(level < 2);

  const isObject = typeof data === 'object' && data !== null && !Array.isArray(data);
  const isArray = Array.isArray(data);
  const isExpandable = isObject || isArray;

  const getValueColor = (value: any) => {
    if (value === null) return 'text-gray-500';
    if (typeof value === 'string') return 'text-green-600 dark:text-green-400';
    if (typeof value === 'number') return 'text-blue-600 dark:text-blue-400';
    if (typeof value === 'boolean') return 'text-purple-600 dark:text-purple-400';
    return 'text-foreground';
  };

  const renderValue = (value: any) => {
    if (value === null) return 'null';
    if (typeof value === 'string') return `"${value}"`;
    return String(value);
  };

  return (
    <div style={{ marginLeft: `${level * 20}px` }}>
      <div className="flex items-start gap-1 py-1 hover:bg-muted/50 rounded px-2">
        {isExpandable ? (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-0.5 hover:bg-muted rounded p-0.5"
          >
            {expanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        ) : (
          <span className="w-6" />
        )}

        <div className="flex-1 font-mono text-sm">
          {name && (
            <span className="text-blue-700 dark:text-blue-300 font-medium">
              {name}:{' '}
            </span>
          )}

          {isExpandable ? (
            <span className="text-muted-foreground">
              {isArray ? `Array[${data.length}]` : `Object{${Object.keys(data).length}}`}
            </span>
          ) : (
            <span className={getValueColor(data)}>{renderValue(data)}</span>
          )}
        </div>
      </div>

      {expanded && isExpandable && (
        <div>
          {isArray
            ? data.map((item: any, index: number) => (
                <TreeNode key={index} data={item} name={`[${index}]`} level={level + 1} />
              ))
            : Object.entries(data).map(([key, value]) => (
                <TreeNode key={key} data={value} name={key} level={level + 1} />
              ))}
        </div>
      )}
    </div>
  );
}

export function JsonViewer() {
  const [input, setInput] = useState('');
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');

  const visualize = () => {
    try {
      const parsed = JSON.parse(input);
      setData(parsed);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setData(null);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Input JSON</CardTitle>
          <CardDescription>Paste JSON data to visualize</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"name":"John","age":30,"address":{"city":"NYC","zip":"10001"}}'
            className="min-h-[150px] font-mono text-sm"
          />
          <Button onClick={visualize} className="mt-4">
            Visualize JSON
          </Button>
          {error && (
            <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-md text-sm">
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {data && (
        <Card>
          <CardHeader>
            <CardTitle>Tree View</CardTitle>
            <CardDescription>Click to expand/collapse nodes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md p-4 bg-muted/30 max-h-[600px] overflow-auto">
              <TreeNode data={data} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
