'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function JwtDecoder() {
  const [input, setInput] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [error, setError] = useState('');

  const decode = () => {
    try {
      const parts = input.trim().split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format. JWT should have 3 parts separated by dots.');
      }

      // Decode header
      const headerDecoded = JSON.parse(atob(parts[0]));
      setHeader(JSON.stringify(headerDecoded, null, 2));

      // Decode payload
      const payloadDecoded = JSON.parse(atob(parts[1]));
      setPayload(JSON.stringify(payloadDecoded, null, 2));

      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to decode JWT');
      setHeader('');
      setPayload('');
    }
  };

  const getExpirationInfo = () => {
    try {
      const payloadObj = JSON.parse(payload);
      if (payloadObj.exp) {
        const expDate = new Date(payloadObj.exp * 1000);
        const now = new Date();
        const isExpired = expDate < now;
        return {
          date: expDate.toLocaleString(),
          expired: isExpired,
        };
      }
    } catch {
      return null;
    }
    return null;
  };

  const expInfo = payload ? getExpirationInfo() : null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Input JWT Token</CardTitle>
          <CardDescription>Paste your JWT token to decode (Note: This tool does not verify signatures)</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
            className="min-h-[120px] font-mono text-sm"
          />
          <Button onClick={decode} className="mt-4">
            Decode JWT
          </Button>
          {error && (
            <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-md text-sm">
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {(header || payload) && (
        <>
          {expInfo && (
            <Card>
              <CardHeader>
                <CardTitle>Token Expiration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`p-4 rounded-md ${expInfo.expired ? 'bg-destructive/10' : 'bg-green-50 dark:bg-green-950'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Expires:</span>
                    <span className="text-sm">{expInfo.date}</span>
                  </div>
                  <div className="mt-2">
                    <span className={`text-sm font-medium ${expInfo.expired ? 'text-destructive' : 'text-green-600 dark:text-green-400'}`}>
                      {expInfo.expired ? '✗ Token Expired' : '✓ Token Valid'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue="payload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="payload">Payload</TabsTrigger>
              <TabsTrigger value="header">Header</TabsTrigger>
            </TabsList>

            <TabsContent value="payload">
              <Card>
                <CardHeader>
                  <CardTitle>Payload</CardTitle>
                  <CardDescription>Decoded JWT payload (claims)</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="p-4 bg-muted rounded-md overflow-x-auto">
                    <code className="text-sm">{payload}</code>
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="header">
              <Card>
                <CardHeader>
                  <CardTitle>Header</CardTitle>
                  <CardDescription>Decoded JWT header</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="p-4 bg-muted rounded-md overflow-x-auto">
                    <code className="text-sm">{header}</code>
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
