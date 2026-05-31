'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';

export function JsonValidator() {
  const [input, setInput] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState('');

  const validate = () => {
    try {
      JSON.parse(input);
      setIsValid(true);
      setError('');
    } catch (err) {
      setIsValid(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Invalid JSON');
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Input JSON</CardTitle>
          <CardDescription>Paste your JSON data to validate</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"name": "John", "age": 30}'
            className="min-h-[200px] font-mono text-sm"
          />
          <Button onClick={validate} className="mt-4">
            Validate JSON
          </Button>
        </CardContent>
      </Card>

      {isValid !== null && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              {isValid ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <CardTitle className="text-green-500">Valid JSON</CardTitle>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-destructive" />
                  <CardTitle className="text-destructive">Invalid JSON</CardTitle>
                </>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {isValid ? (
              <div className="p-4 bg-green-50 dark:bg-green-950 rounded-md">
                <p className="text-sm text-green-700 dark:text-green-300">
                  ✓ Your JSON is valid and well-formed
                </p>
              </div>
            ) : (
              <div className="p-4 bg-destructive/10 rounded-md">
                <p className="text-sm text-destructive font-medium mb-2">Error:</p>
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
