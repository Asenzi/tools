'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function TimestampConverter() {
  const [timestamp, setTimestamp] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timestampToDate = () => {
    try {
      const ts = parseInt(timestamp);
      if (isNaN(ts)) {
        return;
      }
      // Auto-detect seconds vs milliseconds
      const date = ts.toString().length === 10 ? new Date(ts * 1000) : new Date(ts);
      setDateTime(date.toISOString());
    } catch (err) {
      console.error(err);
    }
  };

  const dateToTimestamp = () => {
    try {
      const date = new Date(dateTime);
      if (isNaN(date.getTime())) {
        return;
      }
      setTimestamp(Math.floor(date.getTime() / 1000).toString());
    } catch (err) {
      console.error(err);
    }
  };

  const useCurrentTime = () => {
    setTimestamp(Math.floor(currentTime / 1000).toString());
    setDateTime(new Date(currentTime).toISOString());
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Time</CardTitle>
          <CardDescription>Current Unix timestamp</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-muted rounded-md">
              <span className="text-sm text-muted-foreground">Seconds:</span>
              <span className="font-mono font-bold">{Math.floor(currentTime / 1000)}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-md">
              <span className="text-sm text-muted-foreground">Milliseconds:</span>
              <span className="font-mono font-bold">{currentTime}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-md">
              <span className="text-sm text-muted-foreground">Date:</span>
              <span className="font-mono text-sm">{new Date(currentTime).toLocaleString()}</span>
            </div>
            <Button onClick={useCurrentTime} variant="outline" className="w-full">
              Use Current Time
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="to-date" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="to-date">Timestamp → Date</TabsTrigger>
          <TabsTrigger value="to-timestamp">Date → Timestamp</TabsTrigger>
        </TabsList>

        <TabsContent value="to-date">
          <Card>
            <CardHeader>
              <CardTitle>Convert Timestamp to Date</CardTitle>
              <CardDescription>Enter Unix timestamp (seconds or milliseconds)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Timestamp</label>
                <Input
                  type="text"
                  value={timestamp}
                  onChange={(e) => setTimestamp(e.target.value)}
                  placeholder="1609459200 or 1609459200000"
                  className="font-mono"
                />
              </div>
              <Button onClick={timestampToDate} className="w-full">
                Convert to Date
              </Button>
              {dateTime && (
                <div className="p-4 bg-muted rounded-md">
                  <div className="text-sm text-muted-foreground mb-1">Result:</div>
                  <div className="font-mono">{dateTime}</div>
                  <div className="text-sm mt-2">{new Date(dateTime).toLocaleString()}</div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="to-timestamp">
          <Card>
            <CardHeader>
              <CardTitle>Convert Date to Timestamp</CardTitle>
              <CardDescription>Enter date in ISO format or use date picker</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Date & Time</label>
                <Input
                  type="datetime-local"
                  value={dateTime.slice(0, 16)}
                  onChange={(e) => setDateTime(new Date(e.target.value).toISOString())}
                />
              </div>
              <Button onClick={dateToTimestamp} className="w-full">
                Convert to Timestamp
              </Button>
              {timestamp && (
                <div className="p-4 bg-muted rounded-md">
                  <div className="text-sm text-muted-foreground mb-1">Result (seconds):</div>
                  <div className="font-mono font-bold">{timestamp}</div>
                  <div className="text-sm text-muted-foreground mt-2 mb-1">Milliseconds:</div>
                  <div className="font-mono">{parseInt(timestamp) * 1000}</div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
